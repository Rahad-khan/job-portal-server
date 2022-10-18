const { Router } = require('express');
const { getHrJobs, getJobById, getHrJobById } = require('../../Controller/manager.controller');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.get('/', verifyToken, getHrJobs);

router.get('/:id', getHrJobById)

module.exports = router;
