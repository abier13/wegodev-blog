const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user.controller');

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
router.get('/users', UserController.getAllUser);
router.post('/users', UserController.createUser);

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
 *      responses:
 *          200:
 *              description: Succes ubah data
 *          500:
 *              description: Internal server error
 */
router.put('/users/:id', UserController.updateUser);

module.exports = router;
