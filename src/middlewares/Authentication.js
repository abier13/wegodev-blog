/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { env } = process;

const AuthenticationSuperAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak' });
  }

  jwt.verify(token.split(' ')[1], env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }

    if (decoded.role === 'Super Admin') {
      next();
    } else {
      res.status(401).json({ message: 'Akses ditolak' });
    }
  });
};

const AuthenticationCreator = (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({});
  }

  jwt.verify(token.split(' ')[1], env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }

    if (decoded.role === 'Creator' && decoded.id === id) {
      next();
    } else {
      res.status(401).json({ message: 'Akses ditolak' });
    }
  });
};

module.exports = { AuthenticationCreator, AuthenticationSuperAdmin };
