const jobService = require("../Services/jobs.services");

exports.postJob = async (req, res) => {
    try {
        const data = req.body;
        const job = await jobService.createJobService(data);
        res.status(200).json({
            status: "success",
            message: "Your Job posted successfully",
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
