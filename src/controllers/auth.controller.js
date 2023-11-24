/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const BuildResponse = require('../modules/buildResponse');
require('dotenv').config();

const { env } = process;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ambil data user bersangkutan
    const getUser = await User.findOne({ where: { email }, raw: true });
    const hidePassword = JSON.stringify(getUser, (key, value) => {
      if (key === 'password') {
        return undefined;
      }
      return value;
    });

    const user = JSON.parse(hidePassword);
    if (!getUser) {
      throw new Error('User not found');
    }

    // check password
    bcrypt.compare(password, getUser.password, (err, result) => {
      if (!err && result === true) {
        // Generate token
        const payload = {
          role: getUser.role,
          id: getUser.id,
        };

        const options = { expiresIn: '3600000ms' };
        const secretKey = env.SECRET_KEY;
        const accessToken = jwt.sign(payload, secretKey, options);
        const expireIn = options.expiresIn;
        // const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '15m' });
        // const response = { accessToken, user };

        const buildResponse = BuildResponse.respLogin({
          accessToken, expireIn, tokenType: 'Bearer', user,
        });

        return res.status(201).json(buildResponse);
      }
      return res.status(400).json({ message: 'email atau password salah' });
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
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

const refreshToken = (req, res) => {
  try {
    const { token } = req.body;
    jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new Error(err.message);
      }

      const payload = { id: decoded.id, role: decoded.role };
      const options = { expiresIn: '5m' };

      const accessToken = jwt.sign(payload, env.SECRET_KEY, options);

      const newRefreshToken = jwt.sign(payload, env.SECRET_KEY, { expiresIn: '15m' });

      const response = { accessToken, refreshToken: newRefreshToken };
      const buildResponse = BuildResponse.respLogin({ response });

      return res.status(201).json(buildResponse);
    });
  } catch (error) {
    res.json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
  refreshToken,
  getProfile,
};
