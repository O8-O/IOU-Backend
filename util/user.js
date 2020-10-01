const crypto = require('crypto');
const db = require('../models');

function encryptPW(pw, callback){
    var salt = Math.round((new Date().valueOf()*Math.random())) + "";
    var hashPassword = crypto.createHash('sha512').update(pw + salt).digest("hex");
    
    return callback(null, hashPassword, salt);
}

function findUserByID(id){
    db.users.findOne({
        where:{
            ID: id
        }
    })
    .then(result => {
        console.log(result.dataValues);
        if(!result){
            return false;
        }
        return true;
    })
    .catch(err => {
        return false;
    })
}

module.exports = {
    encryptPW: encryptPW,
    findUserByID: findUserByID
}