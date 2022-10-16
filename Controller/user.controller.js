const userService = require("../Services/user.services");

exports.userSignUp = async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.signUpService(userData);

        res.status(200).json({
            status: "success",
            message: "SignUp Done Successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}
