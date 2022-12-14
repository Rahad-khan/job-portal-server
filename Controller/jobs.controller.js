const jobService = require("../Services/jobs.services");


exports.getJobs = async (req, res) => {
    try {
        let filter = { ...req.query };
        const { page = 1, limit = 5 } = req.query;

        const excludeFields = ['sort', 'page', 'limit', 'fields'];

        excludeFields.forEach(field => delete filter[field]);

        const queries = {};

        if (req.query.sort) {
            const sortField = req.query.sort.split(',').join(' ');
            queries.sort = sortField;
        };
        if (req.query.fields) {
            const selectFields = req.query.fields.split(',').join(' ');
            queries.fields = selectFields;
        };
        /**
         * limit -> 5
         * page 1 -> skip -> 0       skip = page - 1 * limit
         * page 2 -> skip -> 5
         */
        if (page || limit) {
            const skipLimit = (page - 1) * +limit;
            queries.skip = skipLimit,
                queries.limit = +limit
        };

        /**
         * gt/lt/gte/lte  {salary: {$gt: 50}}
         */

        let filterString = JSON.stringify(filter);
        filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)

        filter = JSON.parse(filterString);
        const result = await jobService.getJobsService(filter, queries);

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
exports.getJobById = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const job = await jobService.findJobById(id, selection = '-applierDoc');
        res.status(200).json({
            status: "success",
            message: "Job Find successfully",
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

exports.applyJobById = async (req, res) => {
    try {
        const { id: jobId } = req.params;

        const { id: userId } = req.user;
        const result = await jobService.applierService(jobId, userId, req?.file?.path);

        if (result?.modifiedCount) {
            if (req?.file) {
                return res.status(200).json({
                    status: "success",
                    message: "Job applied successfully with pdf"
                })
            }
            res.status(200).json({
                status: "success",
                message: "Job applied successfully"
            })
        } else {
            res.status(401).json({
                status: "fail",
                message: result?.message || "Something went wrong"
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
