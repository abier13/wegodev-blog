const express = require('express');
const { upload } = require('../middlewares/multer');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const uploadController = require('../controllers/upload.controller');

router.post('/upload', Authentication.Authorization, upload.single('file'), uploadController.uploadFile);

module.exports = router;
