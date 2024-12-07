const postControllers = require('../controllers/post.controllers');
const router = require('express').Router();
const { verifyToken } = require('../middlewares/auth.middlewares');

router.get('/', postControllers.getAllPosts);
router.get('/get-by-id', postControllers.getPostById);
router.post('/create', verifyToken, postControllers.createPost);

module.exports = router;