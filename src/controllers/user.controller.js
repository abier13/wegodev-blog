const yup = require('yup');
const bcrypt = require('bcrypt');
const BuildResponse = require('../modules/buildResponse');
const { User, File } = require('../../models');

const userSchema = yup.object().shape({
  fullName: yup.string().required('Nama lengkap harus diisi'),
  email: yup.string().email('Format email tidak sesuai').required('Email harus diisi'),
  newPassword: yup.string().required('Password harus diisi').min(6, 'Pasword minimal 6'),
  confirmNewPassword: yup.string().required('Konfirmasi password harus diisi')
    .oneOf([yup.ref('newPassword'), null], 'Konfirmasi password tidak sesuai'),
});

const updatedUserSchema = yup.object().shape({
  fullName: yup.string().required('Nama lengkap harus diisi'),
  email: yup.string().email('Format email tidak sesuai').required('Email harus diisi'),
  newPassword: yup.string().min(6, 'Pasword minimal 6'),
  confirmNewPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Konfirmasi password tidak sesuai'),
});

const getAllUsers = async (req, res) => {
  try {
    let { page, pageSize, fullName } = req.query;

    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    let where = {};
    if (fullName) {
      where = { fullName };
    }

    const getAllData = await User.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where,
      include: [
        {
          model: File,
          as: 'Avatar',
        },
      ],
    });

    const totalData = await User.count();

    const hidePassword = JSON.stringify(getAllData, (key, value) => {
      if (key === 'password') {
        return undefined;
      }
      return value;
    });

    const data = JSON.parse(hidePassword);
    const resp = {
      code: res.statusCode,
      message: `${data.length} data sudah diterima`,
      count: totalData,
      data,
    };

    res.status(200).json(resp);
  } catch (error) {
    console.log('Get AllUser :', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const getData = await User.findByPk(id);

    if (!getData) {
      res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const hidePassword = JSON.stringify(getData, (key, value) => {
      if (key === 'password') {
        return undefined;
      }
      return value;
    });

    const data = JSON.parse(hidePassword);
    const buildResponse = BuildResponse.get({ data });

    res.status(200).json(buildResponse);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    userSchema.validate(body)
      .then(async (valid) => {
        const {
          fullName, email, newPassword, role, status,
        } = valid;

        const saltRound = 10;
        const hashPassword = bcrypt.hashSync(newPassword, saltRound);

        const data = await User.create({
          fullName, email, password: hashPassword, role, status,
        });

        const buildResponse = BuildResponse.created({ data });

        return res.status(201).json(buildResponse);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    updatedUserSchema.validate(body)
      .then(async (valid) => {
        const {
          fullName, email, newPassword, status, avatar, role,
        } = valid;

        if (newPassword === '' || newPassword === undefined) {
          await User.update({
            fullName, email, status, avatar, role,
          }, { where: { id } });
        } else {
          const saltRound = 10;
          const hashPassword = bcrypt.hashSync(newPassword, saltRound);

          await User.update({
            fullName, email, password: hashPassword, status, avatar, role,
          }, { where: { id } });
        }

        const getData = await User.findByPk(id);
        const hidePassword = JSON.stringify(getData, (key, value) => {
          if (key === 'password') {
            return undefined;
          }
          return value;
        });

        const data = JSON.parse(hidePassword);
        const buildResponse = BuildResponse.updated({ data });
        return res.status(201).json(buildResponse);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });

    const buildResponse = BuildResponse.deleted();
    return res.status(201).json(buildResponse);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
