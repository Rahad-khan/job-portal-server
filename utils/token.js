const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.generateToken = (payload) => {

    const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: '2h'
    })
    return token;
}
