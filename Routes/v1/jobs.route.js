const { Router } = require('express');
const jobsController = require('../../Controller/jobs.controller');
const AuthRoute = require('../../middleware/AuthRoute');
const upload = require('../../middleware/Uploader');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.post('/:id/apply', verifyToken, upload.single("doc"), jobsController.applyJobById)

router.route('/')
    .get(jobsController.getJobs)
    .post(verifyToken, AuthRoute("hr", "admin"), jobsController.postJob);

router.route('/:id')
    .patch(verifyToken, AuthRoute("hr", "admin"), jobsController.updateJob)
    .get(jobsController.getJobById)

module.exports = router;
