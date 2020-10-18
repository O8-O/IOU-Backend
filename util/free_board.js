const db = require('../models');

function showAll(callback){
    db.free_boards.findAll({
        where:{}
    })
    .then(result => {0
        if(!result){
            return callback(err);
        }
        return callback(null, result);
    })
    .catch(err => {
        return callback(err);
    })
}

function showAllPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.free_boards.findAll({
                where:{}
            })
            .then(result => {                
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
        }, 100);
    });
}

function showAllUserBoard(id, callback){
    db.free_boards.findAll({
        where:{
            writer: id
        }
    })
    .then(result => {
        if(!result){
            return callback(err);
        }
        return callback(null, result);
    })
    .catch(err => {
        return callback(err);
    })
}

function showOneBoard(req, callback){
    db.free_boards.findOne({
        where:{
            postNum: req.body.postNum
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

function showOnePromise(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.free_boards.findOne({
                where:{
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                if(!result){
                    reject(new Error());
                }
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(err);
            })
        }, 100);
    });
}

// function deleteBoard(req, callback){
//     db.free_boards.destroy({
//         where: {
//             postNum: req.body.postNum
//         }
//     })
//     .then(result => {
//         if(!result){
//             return callback(err);
//         }
//         return callback(null, result.dataValues);
//     })
//     .catch(err => {
//         return callback(err); 
//     })
// }

function deleteBoard(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.free_boards.destroy({
                where: {
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                if(!result){
                    reject(new Error());
                }
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(err);
            })
        }, 100);
    });
}

module.exports = {
    showAll: showAll,
    showAllPromise: showAllPromise,
    showAllUserBoard: showAllUserBoard,
    showOneBoard: showOneBoard,
    showOnePromise: showOnePromise,
    deleteBoard: deleteBoard    
}