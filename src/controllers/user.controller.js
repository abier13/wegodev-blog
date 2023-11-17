const { User } = require('../../models');
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
    try {
        let { page, pageSize, fullName } = req.query;
        page = parseInt(page) || 1;
        pageSize = parseInt(pageSize) || 10;

        let where = {}
        if (fullName) {
            where = { fullName }
        }

        const user = await User.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            where
        });

        const total = await User.count();

        // Perubahan dari branch feature post

        res.status(200).json({ data: user, total: total });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    try {
        const body = req.body;
        const { fullName, email, password, status } = body

        const saltRound = 10;
        const hashPassword = bcrypt.hashSync(password, saltRound);

        await User.create({ fullName, email, password: hashPassword, status: 'Active' });

        res.status(201).json({ message: "Berhasil tambah data" });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const { fullName, email, status } = body;
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('User not found');
        }

        await User.update({ fullName, email, status }, { where: { id } });

        res.status(201).json({ message: "Berhasil ubah data" });
    } catch {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser
}

// .then(result => {
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