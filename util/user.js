const crypto = require('crypto');
const db = require('../models');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

function errorWrapper(errorType, err){
    if(err){
        err.type = 0;
        err.message = "Unexpected error";
        return err;
    }
    err = new Error();

    switch(errorType){
        case 101:
            err.message = "No ID Exists";
            break;
        case 102:
            err.message = "Incorrect Password";
            break;
        case 103:
            err.message = "Not valid session";
            break;
        case 104:
            err.message = "Fail to upload image";
            break;
        case 105:
            err.message = "Fail to show image";
            break;
        case 106:
            err.message = "Fail to delete image";
            break;
        // case 107 is set in routes/user.js
        case 108:
            err.message = "Fail to save preference";
            break;
        case 109:
            err.message = "Fail to add preference";
            break;
        case 110:
            err.message = "Fail to update password";
            break;
    }
    err.type = errorType;
    return err;
}

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
        if(result){
            return callback(errorWrapper(101), result);
        }
        return callback(null, result);
    })
    .catch(err => {
        return callback(errorWrapper(0, err));
    })
}

function doLogin(id, pw, callback){
    findUserByID(id, (err, result) => {
        if(result != null){
            var hashPassword = crypto.createHash('sha512').update(pw + result.salt).digest("hex");
            if(hashPassword == result.PW){
                return callback(null, result);
            }
            return callback(errorWrapper(102));
        }   
        return callback(errorWrapper(101)); 
    })
}

function loginCheck(session, callback){
    if(!session.login){
        return callback(errorWrapper(103));
    }    
    return callback(null);
}

function saveImage(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.images.create({
                user: req.body.id,
                image: req.file.path
            })
            .then(result => {       
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(104));
            })
        }, 100);
    });
}

function showAllImage(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.images.findAll({
                where: {
                    user: id
                },
                attributes: ['imageNum', 'image']
            })
            .then(result => {       
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(105));
            })
        }, 100);
    });
}

function showOneImage(imageNum){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.images.findOne({
                where: {
                    imageNum: imageNum
                }
            })
            .then(result => {     
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(105));
            })
        }, 100);
    });
}

function showChangedImage(imageNum){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.changed_images.findAll({
                where: {
                    parentImage: imageNum
                },
                attributes: ['imageNum', 'image']
            })
            .then(result => {       
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(105));
            })
        }, 100);
    });
}

function deleteImage(link){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.unlink(link, (err) => {
                if(err){
                    reject(errorWrapper(106));
                }
                link.replace(/\\/g, '\\');
                db.images.destroy({
                    where: {
                        image: link
                    }
                })
                .then(result => {        
                    resolve(result.dataValues);
                })
                .catch(err => {
                    reject(errorWrapper(106));
                })
            })
        }, 100);
    });
}

function savePreference(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {         
            list = JSON.stringify(req.body.list);

            db.preferences.create({
                ID: req.body.id,
                image: list
            })
            .then(result => {       
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(108));
            })
        }, 100);
    });
}

function showUserPreference(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.preferences.findOne({
                where: {                    
                    ID: id
                }
            })
            .then(result => { 
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(101));
            })
        }, 100);
    });
}

function showPreference(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.images.findAll({
                where: {
                    user: "admin"
                },
                attributes: ['imageNum', 'image']
            })
            .then(result => {       
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(105));
            })
        }, 100);
    });
}

function addPreference(id, newData){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            list = JSON.stringify(newData);
            db.preferences.update(
                {
                    image: list
                },
                {                
                where: {                    
                    ID: id
                }  
            })
            .then(result => { 
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(109));
            })
        }, 100);
    });
}

function findUserByEmail(email){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.users.findOne({
                where: {                    
                    email: email
                },
                attributes: ['ID']
            })
            .then(result => { 
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(101));
            })
        }, 100);
    });
}

function setPassword(id, password){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var salt = Math.round((new Date().valueOf()*Math.random())) + "";
            var hashPassword = crypto.createHash('sha512').update(password + salt).digest("hex");

            db.users.update(
                {
                    PW: hashPassword,
                    salt: salt
                },
                {                
                where: {                    
                    ID: id
                } 
            })
            .then(result => { 
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(110));
            })
        }, 100);
    });
}

module.exports = {
    encryptPW: encryptPW,
    findUserByID: findUserByID,
    doLogin: doLogin,
    loginCheck: loginCheck,
    saveImage: saveImage,
    showAllImage: showAllImage,
    showOneImage: showOneImage,
    showChangedImage: showChangedImage,
    deleteImage: deleteImage,
    savePreference: savePreference,
    showUserPreference: showUserPreference,
    showPreference: showPreference,
    addPreference: addPreference,
    findUserByEmail: findUserByEmail,
    setPassword: setPassword
}