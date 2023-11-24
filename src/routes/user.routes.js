const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/users', Authentication.AuthorizationSuperAdmin, UserController.createUser);
router.get('/users', Authentication.AuthorizationSuperAdmin, UserController.getAllUsers);
router.get('/users/:id', Authentication.AuthorizationCreator, UserController.getUserById);
router.put('/users/:id', Authentication.AuthorizationCreator, UserController.updateUser);
router.post('/users/:id', Authentication.AuthorizationSuperAdmin, UserController.deleteUser);

module.exports = router;
