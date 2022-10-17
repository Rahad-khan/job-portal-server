const { Router } = require('express');
const { getHrJobs } = require('../../Controller/manager.controller');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.route('/')
    .get(verifyToken, getHrJobs);

module.exports = router;
