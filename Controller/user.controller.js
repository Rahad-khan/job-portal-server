const User = require("../Models/user.model");
const userService = require("../Services/user.services");
const { generateToken } = require("../utils/token");

exports.userSignUp = async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.signUpService(userData);

        const token = generateToken(result)

        res.status(200).json({
            status: "success",
            message: "SignUp Done Successfully",
            token
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({
                status: "fail",
                message: "Please send proper user credentials"
            })
        }

        const user = await userService.loginService(email);

        if (!user) {
            return res.status(401).send({
                status: "fail",
                message: "Please send proper user credentials"
            })
        }

        // check password
        const checkPassword = user.matchPassword(password, user?.password);

        if (!checkPassword) {
            return res.status(403).send({
                status: "fail",
                message: "Please send proper email and pass"
            })
        };

        if (user?.status !== 'active') {
            return res.status(403).send({
                status: "fail",
                message: "Please verify your account"
            })
        }

        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            message: "Login Successfully",
            data: user,
            token
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
};
