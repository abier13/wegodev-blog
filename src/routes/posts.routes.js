const express = require('express');

const router = express.Router();

const PostsController = require('../controllers/posts.controller');

router.get('/posts', PostsController.getAllPosts);
router.get('/posts/:id', PostsController.getPostById);
router.get('/posts/:slug', PostsController.getPostBySlug);
router.post('/posts', PostsController.createPost);
router.put('/posts/:id', PostsController.createPost);
router.post('/posts/:id', PostsController.deletePost);

module.exports = router;
