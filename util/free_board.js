const db = require('../models');

function errorWrapper(errorType, err){
    if(err){
        err.type = 0;
        err.message = "Unexpected error";
        return err;
    }
    err = new Error();

    switch(errorType){
        case 201:
            err.message = "No Free Board Post exists";
            break;
        case 202:
            err.message = "Fail to delete Free Board Post";
            break;    
    }
    err.type = errorType;
    return err;
}

function showAll(callback){
    db.free_boards.findAll({
        where:{}
    })
    .then(result => {
        if(result.length == 0){
            return callback(errorWrapper(201));
        }
        return callback(null, result);
    })
    .catch(err => {
        return callback(errorWrapper(0, err));
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
                reject(errorWrapper(201));
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
        if(result.length == 0){
            return callback(errorWrapper(201));
        }
        return callback(null, result);
    })
    .catch(err => {
        return callback(errorWrapper(0, err));
    })
}

function showOneBoard(req, callback){
    db.free_boards.findOne({
        where:{
            postNum: req.body.postNum
        }
    })
    .then(result => {
        if(result.length == 0){
            return callback(errorWrapper(201));
        }
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(errorWrapper(201));
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
                if(result.length == 0){
                    reject(errorWrapper(201));
                }
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(201));
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
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(202));
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