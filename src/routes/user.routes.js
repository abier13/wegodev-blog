const express = require('express');
<<<<<<< HEAD
=======
const Authentication = require('../middlewares/Authentication');
>>>>>>> post

const router = express.Router();

const UserController = require('../controllers/user.controller');

<<<<<<< HEAD
router.post('/users', UserController.createUser);

/**
 * @swagger
 * /api/users:
 *  get:
 *      description: Get all user
 *      responses:
 *          200:
 *              description: Succes mendapat data
 *          500:
 *              description: Internal server error
 */
router.get('/users', UserController.getAllUsers);

router.get('/users/:id', UserController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      description: Update user
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID User
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                              description: Nama lengkap
 *                          email:
 *                              type: string
 *                              description: Email
 *                          newPassword:
 *                              type: string
 *                              description: Email
 *      responses:
 *          200:
 *              description: Succes ubah data
 *          500:
 *              description: Internal server error
 */
router.put('/users/:id', UserController.updateUser);
router.post('/users/:id', UserController.deleteUser);
=======
router.post('/users', Authentication.AuthorizationSuperAdmin, UserController.createUser);
router.get('/users', Authentication.AuthorizationSuperAdmin, UserController.getAllUsers);
router.get('/users/:id', Authentication.AuthorizationCreator, UserController.getUserById);
router.put('/users/:id', Authentication.AuthorizationCreator, UserController.updateUser);
router.post('/users/:id', Authentication.AuthorizationSuperAdmin, UserController.deleteUser);
>>>>>>> post

module.exports = router;
