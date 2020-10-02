const crypto = require('crypto');
const db = require('../models');

function encryptPW(pw, callback){
    var salt = Math.round((new Date().valueOf()*Math.random())) + "";
    var hashPassword = crypto.createHash('sha512').update(pw + salt).digest("hex");
    
    return callback(null, hashPassword, salt);
}

function findUserByID(id, callback){
    db.users.findOne({
        where:{
            ID: id
        }
    })
    .then(result => {
        if(!result){
            return callback(err);
        }
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(err);
    })
}

module.exports = {
    encryptPW: encryptPW,
    findUserByID: findUserByID
}