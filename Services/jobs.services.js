const Job = require("../Models/Job");
const { findOne } = require("../Models/User");
const User = require("../Models/User");
const validator = require('validator');

exports.createJobService = async (data) => {
    const result = await Job.create(data);
    const { hrManager, _id: jobId } = result;
    await User.updateOne({ _id: hrManager.id }, { $push: { postedJob: jobId } })
    return result;
};
exports.updateJobByIdService = async (id, doc) => {
    return await Job.findByIdAndUpdate({ _id: id }, { $set: doc }, { new: true, rawResult: true })
};
exports.getJobsService = async (filter, queries) => {
    return await Job.find(filter)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sort);
};
exports.getHrJobsById = async (id) => {
    return await User.findOne({ _id: id }).select('postedJob').populate('postedJob');
};
exports.findJobById = async (id, selection) => {
    return await Job.findById({ _id: id }).select(selection);
};
exports.applierService = async (jobId, userId, pdfPath) => {
    const job = await Job.findOne({ _id: jobId }).select('applierList expireDate');
    const isExist = job?.applierList?.includes(userId);

    const date = new Date();
    const isDateBackdated = validator.isAfter(date.toDateString(), job?.expireDate.toDateString());
    if (isDateBackdated) {
        return {
            message: "Job date is expired"
        }
    };
    if (isExist) {
        return {
            message: "already applied"
        }
    };
    await User.updateOne({ _id: userId }, { $push: { appliedJob: jobId, pdf: pdfPath } })
    const result = await Job.updateOne({ _id: jobId }, { $push: { applierList: userId } },
        { rawResult: true });
    return result;
};



