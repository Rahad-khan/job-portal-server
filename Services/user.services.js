const User = require("../Models/user.model")

exports.signUpService = async (data) => {
    return await User.create(data);
};
exports.loginService = async (email) => {
    return await User.findOne({ email });
};
