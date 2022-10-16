const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({
                status: "fail",
                message: "Forbidden access"
            })
        };

        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN)

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            status: "fail",
            message: "Authorization failed"
        })
    }
}
