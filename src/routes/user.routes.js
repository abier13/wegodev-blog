const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.post('/users/:id', UserController.deleteUser);

module.exports = router;
