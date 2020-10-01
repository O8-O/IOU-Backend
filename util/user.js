const crypto = require('crypto')

function encryptPW(pw, callback){
    var salt = Math.round((new Date().valueOf()*Math.random())) + "";
    var hashPassword = crypto.createHash('sha512').update(pw + salt).digest("hex");
    
    return callback(null, hashPassword, salt);
}

module.exports = {
    encryptPW: encryptPW
}