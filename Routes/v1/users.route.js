const { Router } = require('express');
const userController = require('../../Controller/user.controller');
const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.post('/signup', userController.userSignUp);
router.post('/login', userController.userLogin);

router.get('/me', verifyToken, userController.getMe)

module.exports = router;
