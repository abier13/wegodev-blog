const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/users', UserController.createUser);
router.get('/users', Authentication.AuthenticationSuperAdmin, UserController.getAllUsers);
router.get('/users/:id', Authentication.AuthenticationCreator, UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.post('/users/:id', UserController.deleteUser);

module.exports = router;
