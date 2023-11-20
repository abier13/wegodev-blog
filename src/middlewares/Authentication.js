/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const env = process.env;

const AuthenticationSuperAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({});
  }

  jwt.verify(token.split(' ')[1], env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }

    req.decoded = decoded;
    next();
  });
};

const Authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({});
  }

  jwt.verify(token.split(' ')[1], env.SECRET_KEY, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = { Authentication, AuthenticationSuperAdmin };
