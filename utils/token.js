const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.generateToken = (data) => {
    const payload = {
        email: data?.email,
        role: data?.role
    }
    const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '2h'
    })
    return token;
}
