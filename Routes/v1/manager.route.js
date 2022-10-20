const { Router } = require('express');
const { getHrJobs, getJobById, getHrJobById } = require('../../Controller/manager.controller');
const AuthRoute = require('../../middleware/AuthRoute');

const verifyToken = require('../../utils/verifyToken');

const router = Router();

router.get('/', verifyToken, AuthRoute("hr", "admin"), getHrJobs);

router.get('/:id', verifyToken, AuthRoute("hr", "admin"), getHrJobById)

module.exports = router;
