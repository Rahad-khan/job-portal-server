const jobService = require("../Services/jobs.services");


exports.getHrJobs = async (req, res) => {
    try {
        const { id } = req.user;
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
        const populateQuery = {};
        populateQuery.path = 'applierDoc';
        populateQuery.id = 'applierId'
        const result = await jobService.findJobById(id, selection = '-hrManager', populateQuery);

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
