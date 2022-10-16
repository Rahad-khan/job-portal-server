const { Router } = require('express');
const userController = require('../../Controller/user.controller');

const router = Router();

router.route('/signup')
    .post(userController.userSignUp)

module.exports = router;
