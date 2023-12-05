const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/auth/login', authController.login);
router.post('/auth/refresh-token', authController.refreshToken);
router.get('/profile', Authentication.AuthorizationCreator, authController.getProfile);

module.exports = router;
