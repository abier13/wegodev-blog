/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { env } = process;

const AuthorizationSuperAdmin = (req, res, next) => {
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
      res.status(401).json({ message: 'Akses ditolak, anda bukan Admin' });
    }
  });
};

const AuthorizationCreator = (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak' });
  }

  jwt.verify(token.split(' ')[1], env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }

    if ((decoded.role === 'Creator' || decoded.role === 'Super Admin') && decoded.id === id) {
      next();
    } else {
      res.status(401).json({ message: 'Id tidak sama dengan Akun Anda' });
    }
  });
};

const Authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: ' Akses ditolak' });
  }

  jwt.verify(token.split(' ')[1], env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }
    next(null, decoded);
  });
};

module.exports = { AuthorizationCreator, AuthorizationSuperAdmin, Authorization };
