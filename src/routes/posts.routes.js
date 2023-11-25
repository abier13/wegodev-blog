const express = require('express');
const Authentication = require('../middlewares/Authentication');

const router = express.Router();

const PostsController = require('../controllers/posts.controller');

router.get('/posts', PostsController.getAllPosts);
router.get('/posts/:id', PostsController.getPostById);
router.get('/posts/get-by-slug/:slug', PostsController.getPostBySlug);
router.post('/posts', Authentication.Authorization, PostsController.createPost);
router.put('/posts/:id', Authentication.Authorization, PostsController.updatePost);
router.post('/posts/:id', Authentication.Authorization, PostsController.deletePost);

module.exports = router;
