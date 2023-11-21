const yup = require('yup');
const bcrypt = require('bcrypt');
const BuildResponse = require('../modules/buildResponse');
const { User } = require('../../models');

const createUserSchema = yup.object().shape({
  fullName: yup.string().required('Nama lengkap harus diisi'),
  // email: yup.string().email('Format email tidak sesuai').required('Email harus diisi'),
  newPassword: yup.string().required('Password harus diisi'),
  confirmNewPassword: yup.string().required('Konfirmasi password harus diisi')
    .oneOf([yup.ref('newPassword'), null], 'Konfirmasi password tidak sesuai'),
});

const getAllUsers = async (req, res) => {
  let { page, pageSize, fullName } = req.query;
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  let where = {};
  if (fullName) {
    where = { fullName };
  }

  const data = await User.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where,
  });

  const totalUser = await User.count();

  // const total = await User.count();

  // const buildResponse = BuildResponse.get();
  const resp = {
    code: res.statusCode,
    message: `${totalUser} data sudah diterima`,
    count: totalUser,
    data,
  };

  res.status(200).json(resp);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const getData = await User.findByPk(id);

  if (!getData) {
    throw new Error('User tidak ditemukan');
  }

  const removePassword = JSON.stringify(getData, (key, value) => {
    if (key === 'password') {
      return undefined;
    }
    return value;
  });

  const data = JSON.parse(removePassword);
  const buildResponse = BuildResponse.get({ data });

  res.status(200).json(buildResponse);
};

const createUser = async (req, res) => {
  try {
    const { body } = req;

    createUserSchema.validate(body)
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

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
};
