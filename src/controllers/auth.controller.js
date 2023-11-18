const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const BuildResponse = require('../modules/buildResponse');

const login = async (req, res) => {
  try {
    const { email } = req.body;

    // Ambil data user bersangkutan
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate token
    const payload = {
      role: user.role,
      id: user.id,
    };
    const options = { expiresIn: '5m' };
    const secretKey = 'jsdaflkjh57ythjwAJhfaA84LMnwg85wjkAhf4';

    const accessToken = jwt.sign(payload, secretKey, options);

    const response = { accessToken, user };
    const buildResponse = BuildResponse.created({ response });

    return res.status(201).json(buildResponse);
  } catch (error) {
    res.json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};
