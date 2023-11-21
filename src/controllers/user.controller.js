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
  createUser,
};
