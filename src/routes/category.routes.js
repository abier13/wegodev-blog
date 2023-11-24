const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const CategoryController = require('../controllers/category.controller');

router.get('/categories', CategoryController.getAllCategory);
router.get('/categories/:id', CategoryController.getCategoryById);
router.post('/categories', Authentication.Authorization, CategoryController.createCategory);
router.put('/categories/:id', Authentication.Authorization, CategoryController.updateCategory);
router.post('/categories/:id', Authentication.Authorization, CategoryController.deleteCategory);

module.exports = router;
