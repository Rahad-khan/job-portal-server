const { Router } = require('express');
const jobsController = require('../../Controller/jobs.controller');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.route('/')
    .post(jobsController.postJob)

module.exports = router;
