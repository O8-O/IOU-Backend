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

function doLogin(id, pw, callback){
    findUserByID(id, (err, result) => {
        if(err){
            return callback(err);
        }
        var hashPassword = crypto.createHash('sha512').update(pw + result.salt).digest("hex");
        if(hashPassword == result.pw){
            return callback(null, result);
        }
        return callback(err);
    })
}

function loginCheck(session, callback){
    if(!session.login){
        err = new Error;
        return callback(err);
    }    
    return callback(null);
}

module.exports = {
    encryptPW: encryptPW,
    findUserByID: findUserByID,
    doLogin: doLogin,
    loginCheck: loginCheck
}