const SECRET_KEY = 'jianqianyan'
const jwt = require('jsonwebtoken')

// token加密
var token = function (message) {
    let tokenM = jwt.sign(message , SECRET_KEY , { expiresIn: '3h' });
    return tokenM;
}

module.exports = token;