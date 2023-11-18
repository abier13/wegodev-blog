/* eslint-disable radix */
/* eslint-disable prefer-const */
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const BuildResponse = require('../modules/buildResponse');

const getAllUser = async (req, res) => {
  try {
    let { page, pageSize, fullName } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;

    let where = {};
    if (fullName) {
      where = { fullName };
    }

    const user = await User.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where,
    });

    const total = await User.count();

    // ada perubahan
    const buildResponse = BuildResponse.get({ data: user, total });

    res.status(200).json(buildResponse);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const {
      fullName, email, password,
    } = body;

    const saltRound = 10;
    const hashPassword = bcrypt.hashSync(password, saltRound);

    await User.create({
      fullName, email, password: hashPassword, status: 'Active',
    });

    res.status(201).json({ message: 'Berhasil tambah data' });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const { fullName, email, status } = body;
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await User.update({ fullName, email, status }, { where: { id } });

    const buildResponse = BuildResponse.updated({});

    res.status(200).json(buildResponse);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
};

// .then(result => { 4a7b170f-9dcd-4667-9f55-ab54b3e81846
//     res.status(201).json({ message: 'Berhasil tambah data' })
// })
// .catch(err => {
//     res.status(500).json({ message: 'Internal server error' })
// });
// .then(result => {
//     res.json(result)
// })
// .catch(err => {
//     res.status(500).json({ message: 'Internal server error' })
// });
