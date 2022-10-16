const User = require("../Models/user.model")

exports.signUpService = async (data) => {
    return await User.create(data);
}
