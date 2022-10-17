const Job = require("../Models/Job");
const User = require("../Models/User");

exports.createJobService = async (data) => {
    const result = await Job.create(data);
    const { name, hrManager, _id: jobId } = result;
    const postJobInUserData = { name, jobId }
    await User.updateOne({ _id: hrManager.id }, { $push: { postedJob: postJobInUserData } })
    return result;
};
exports.updateJobByIdService = async (id, doc) => {
    return await Job.findByIdAndUpdate({ _id: id }, { $set: doc }, { new: true, rawResult: true })
};
exports.getJobsService = async () => {
    return await Job.find({});
};



