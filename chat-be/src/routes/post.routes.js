const postControllers = require('../controllers/post.controllers');
const router = require('express').Router();

router.get('/', postControllers.getAllPosts);
router.get('/get-by-id', postControllers.getPostById);
router.post('/create', postControllers.createPost);
router.put('/', postControllers.updatePost);
router.delete('/', postControllers.deletePost);

module.exports = router;