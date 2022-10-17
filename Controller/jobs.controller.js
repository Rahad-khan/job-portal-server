const jobService = require("../Services/jobs.services");


exports.getJobs = async (req, res) => {
    try {
        const result = await jobService.getJobsService();
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
exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDoc = req.body;
        const result = await jobService.updateJobByIdService(id, updateDoc);
        if (result?.lastErrorObject?.updatedExisting) {
            res.status(200).json({
                status: "success",
                message: "Your Job updated successfully",
                data: result
            })
        } else {
            res.status(401).json({
                status: "fail",
                message: "Job Can't be updated, Provide valid info"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
