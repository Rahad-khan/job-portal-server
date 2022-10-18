const { Router } = require('express');
const jobsController = require('../../Controller/jobs.controller');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.post('/:id/apply', verifyToken, jobsController.applyJobById)

router.route('/')
    .get(jobsController.getJobs)
    .post(jobsController.postJob);

router.route('/:id')
    .patch(jobsController.updateJob)
    .get(jobsController.getJobById)

module.exports = router;
