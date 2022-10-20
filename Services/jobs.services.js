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
exports.findJobById = async (id, selection, populateData) => {
    console.log(`file: jobs.services.js ~ line 26 ~ exports.findJobById= ~ populateData`, populateData)
    if (populateData) {
        return await Job.findById({ _id: id })
            .select(selection)
            .populate({
                path: populateData.path,
                populate: {
                    path: populateData.id
                }
            })
    } else {
        return await Job.findById({ _id: id })
            .select(selection)
    }

};
exports.applierService = async (jobId, userId, pdfPath) => {
    const job = await Job.findOne({ _id: jobId }).select('applierDoc expireDate');

    const isExist = job?.applierDoc.map(app => app?.applierId?.inspect(userId));
    console.log(`file: jobs.services.js ~ line 32 ~ exports.applierService= ~ isExist`, isExist)


    const date = new Date();
    const isDateBackdated = validator.isAfter(date.toDateString(), job?.expireDate.toDateString());
    if (isDateBackdated) {
        return {
            message: "Job date is expired"
        }
    };
    if (isExist.length) {
        return {
            message: "already applied"
        }
    };
    const updateJobDoc = { applierId: userId, pdfPath: pdfPath };
    await User.updateOne({ _id: userId }, { $push: { appliedDoc: { jobId, pdfPath } } });
    const result = await Job.updateOne({ _id: jobId }, { $push: { applierDoc: updateJobDoc } },
        { rawResult: true });
    return result;
};



