const { Router } = require('express');
const { getHrJobs, getJobById } = require('../../Controller/manager.controller');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.get('/', verifyToken, getHrJobs);

router.get('/:id', getJobById)

module.exports = router;
