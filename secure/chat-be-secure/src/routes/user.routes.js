const userControllers = require('../controllers/user.controllers');
const router = require('express').Router();
const { verifyToken } = require('../middlewares/auth.middlewares');

router.post('/login', userControllers.login);
router.post('/register', userControllers.createUser);
router.put('/', verifyToken, userControllers.updateUser); 
router.delete('/', verifyToken, userControllers.deleteUser);
router.post('/get-one-time-link', userControllers.getOneTimeLink);

module.exports = router;

