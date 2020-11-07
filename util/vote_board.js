const db = require('../models');

function errorWrapper(errorType, err){
    if(err){
        err.type = 0;
        err.message = "Unexpected error";
        return err;
    }
    err = new Error();

    switch(errorType){
        case 301:
            err.message = "No Vote Board Post exists";
            break;
        case 302:
            err.message = "Fail to delete Vote Board Post";
            break;
        case 303:
            err.message = "Fail to make vote data in DB";
            break;   
        case 304:
            err.message = "Fail to show vote data in DB";
            break;
        case 305:
            err.message = "Fail to delete vote data in DB";
            break;
        case 306:
            err.message = "Fail to count vote data in DB";
            break;
        // case 307 is set in routes/vote_boards.js
        // case 308 is set in routes/vote_boards.js
        // case 309 is set in routes/vote_boards.js
    }
    err.type = errorType;
    return err;
}

function showAll(callback){
    db.vote_boards.findAll({
        where:{}
    })
    .then(result => {0
        if(result.length == 0){
            return callback(errorWrapper(301));
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
            db.vote_boards.findAll({
                where:{}
            })
            .then(result => {                
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(301));
            })
        }, 100);
    });
}

function showAllUserBoard(id, callback){
    db.vote_boards.findAll({
        where:{
            writer: id
        }
    })
    .then(result => {
        if(result.length == 0){
            return callback(errorWrapper(301));
        }
        return callback(null, result);
    })
    .catch(err => {
        return callback(errorWrapper(0, err));
    })
}

function showOneBoard(req, callback){
    db.vote_boards.findOne({
        where:{
            postNum: req.body.postNum
        }
    })
    .then(result => {
        if(result.length == 0){
            return callback(errorWrapper(301));
        }
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(errorWrapper(301));
    })
}

function showOnePromise(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.vote_boards.findOne({
                where:{
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                if(result.length == 0){
                    reject(errorWrapper(301));
                }
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(301));
            })
        }, 100);
    });
}

function deleteBoard(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.vote_boards.destroy({
                where: {
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(302));
            })
        }, 100);
    });
}

function makeVote(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.votes.create({
                postNum: req.body.postNum,
                user: req.body.id,
                choice: req.body.choice
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(303));
            })
        }, 100);
    });
}

function showVote(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.votes.findAll({
                where: {
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                if(result.length == 0){
                    resolve(result);
                }
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(304));
            })
        }, 100);
    }); 
}

function showUserVote(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.votes.findOne({
                where: {
                    postNum: req.body.postNum,
                    user: req.body.id
                }
            })
            .then(result => {
                if(!result){
                    resolve(result);
                }
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(err);
            })
        }, 100);
    });
}

function deleteVote(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.votes.destroy({
                where: {
                    postNum: req.body.postNum,
                    user: req.body.id
                }
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(305));
            })
        }, 100);
    });
}

function deleteAllVote(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.votes.destroy({
                where: {
                    postNum: req.body.postNum
                }                
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(305));
            })
        }, 100);
    });
}

function countVote(req){
    var count = {};
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.votes.findAndCountAll({
                where: {
                    postNum: req.body.postNum,
                    choice: 1
                }                
            })
            .then(result => {
                count.count1 = result.count;
                if(!result){
                    reject(errorWrapper(306));
                }
                db.votes.findAndCountAll({
                    where: {
                        postNum: req.body.postNum,
                        choice: 2
                    }                
                })
                .then(result => {
                    count.count2 = result.count;
                    if(!result){
                        reject(errorWrapper(306));
                    }
                    resolve(count);
                })
                .catch(err => {
                    reject(errorWrapper(0, err));
                })
            })
            .catch(err => {
                reject(errorWrapper(0, err));
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
    deleteBoard: deleteBoard,
    makeVote: makeVote,
    showVote: showVote,
    showUserVote: showUserVote,
    deleteVote: deleteVote,
    deleteAllVote: deleteAllVote,
    countVote: countVote
}