const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const PostsController = require('../controllers/posts.controller');

router.get('/post', PostsController.getAllPosts);
router.get('/post/:id', PostsController.getPostById);
router.get('/post/get-by-slug/:slug', PostsController.getPostBySlug);
router.post('/post', Authentication.Authorization, PostsController.createPost);
router.put('/post/:id', Authentication.Authorization, PostsController.updatePost);
router.delete('/post/:id', Authentication.Authorization, PostsController.deletePost);

module.exports = router;
