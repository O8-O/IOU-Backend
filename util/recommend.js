const db = require('../models');

function errorWrapper(errorType, err){
    if(err){
        err.type = 0;
        err.message = "Unexpected error";
        return err;
    }
    err = new Error();

    switch(errorType){
        case 501:
            err.message = "Fail to find recommend";
            break;
        case 502:
            err.message = "Fail to order recommend";
            break;
        case 503:
            err.message = "Fail to make recommend";
            break;
        case 504:
            err.message = "Fail to delete recommend";
            break;
        // case 505 is set in routes/recommend.js
        // case 506 is set in routes/recommend.js
    }
    err.type = errorType;
    return err;
}

function countRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.findAndCountAll({
                where:{
                    postType: req.body.postType,
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                resolve(result.count);
            })
            .catch(err => {
                reject(errorWrapper(0, err));
            })
        }, 100);
    });
}

function findFreeRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.findOne({
                where:{
                    postType: 1,
                    postNum: req.body.postNum,
                    user: req.body.id
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(501));
            })
        }, 100);
    });
}

function findVoteRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.findOne({
                where:{
                    postType: 2,
                    postNum: req.body.postNum,
                    user: req.body.id
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(501));
            })
        }, 100);
    });
}

function orderFreeRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.free_boards.findAll({
                where:{},
                order: [
                    ['recommend', 'DESC'],
                    ['createdAt', 'DESC']
                ]
            })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(502));
            })
        }, 100);
    });
}

function orderVoteRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.vote_boards.findAll({
                where:{},
                order: [
                    ['recommend', 'DESC'],
                    ['createdAt', 'DESC']
                ]
            })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(errorWrapper(502));
            })
        }, 100);
    });
}

function makeFreeRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.create({
                postType: 1,
                postNum: req.body.postNum,
                user: req.body.id
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(503));
            })
        }, 100);
    });
}

function makeVoteRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.create({
                postType: 2,
                postNum: req.body.postNum,
                user: req.body.id
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(503));
            })
        }, 100);
    });
}

function deleteRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.destroy({
                where: {
                    postType: req.body.postType,
                    postNum: req.body.postNum,
                    user: req.body.id
                }                
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(504));
            })
        }, 100);
    });
}

function deleteFreeRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.destroy({
                where: {
                    postType: 1,
                    postNum: req.body.postNum
                }                
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(504));
            })
        }, 100);
    });
}

function deleteVoteRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.destroy({
                where: {
                    postType: 2,
                    postNum: req.body.postNum
                }                
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(504));
            })
        }, 100);
    });
}

module.exports = {
    countRecommend: countRecommend,
    findFreeRecommend: findFreeRecommend,
    findVoteRecommend: findVoteRecommend,
    orderFreeRecommend: orderFreeRecommend,
    orderVoteRecommend: orderVoteRecommend,
    makeFreeRecommend: makeFreeRecommend,
    makeVoteRecommend: makeVoteRecommend,
    deleteRecommend: deleteRecommend,
    deleteFreeRecommend: deleteFreeRecommend,
    deleteVoteRecommend: deleteVoteRecommend
}