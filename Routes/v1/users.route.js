const { Router } = require('express');
const userController = require('../../Controller/user.controller');

const router = Router();

router.route('/signup')
    .post(userController.userSignUp)
router.route('/login')
    .post(userController.userLogin)

module.exports = router;
