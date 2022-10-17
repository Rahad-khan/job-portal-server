const { Router } = require('express');
const jobsController = require('../../Controller/jobs.controller');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.route('/')
    .get(jobsController.getJobs)
    .post(jobsController.postJob);

router.patch('/:id', jobsController.updateJob)

module.exports = router;
