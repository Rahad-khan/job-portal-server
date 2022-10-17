const Job = require("../Models/Job");
const User = require("../Models/User");

exports.createJobService = async (data) => {
    const result = await Job.create(data);
    const { hrManager, _id: jobId } = result;
    await User.updateOne({ _id: hrManager.id }, { $push: { postedJob: jobId } })
    return result;
};
exports.updateJobByIdService = async (id, doc) => {
    return await Job.findByIdAndUpdate({ _id: id }, { $set: doc }, { new: true, rawResult: true })
};
exports.getJobsService = async () => {
    return await Job.find({});
};
exports.getHrJobsById = async (id) => {
    return await User.findOne({ _id: id }).select('postedJob').populate('postedJob');
};



