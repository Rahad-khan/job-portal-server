const jobService = require("../Services/jobs.services");


exports.getHrJobs = async (req, res) => {
    try {
        const { role, id } = req.user;

        if (role !== 'hr' && role !== 'admin') {
            return res.status(403).json({
                status: "fail",
                message: "Unauthorized access"
            })
        }
        const result = await jobService.getHrJobsById(id);

        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.getHrJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await jobService.findJobById(id, selection = '-hrManager');

        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
