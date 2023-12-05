const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const CategoryController = require('../controllers/category.controller');

router.get('/category', CategoryController.getAllCategory);
router.get('/category/:id', CategoryController.getCategoryById);
router.post('/category', Authentication.Authorization, CategoryController.createCategory);
router.put('/category/:id', Authentication.Authorization, CategoryController.updateCategory);
router.delete('/category/:id', Authentication.Authorization, CategoryController.deleteCategory);

module.exports = router;
