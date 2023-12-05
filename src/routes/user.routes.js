const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/user', Authentication.AuthorizationSuperAdmin, UserController.createUser);
router.get('/user', Authentication.AuthorizationSuperAdmin, UserController.getAllUsers);
router.get('/user/:id', Authentication.AuthorizationCreator, UserController.getUserById);
router.put('/user/:id', Authentication.AuthorizationCreator, UserController.updateUser);
router.delete('/user/:id', Authentication.AuthorizationSuperAdmin, UserController.deleteUser);

module.exports = router;
