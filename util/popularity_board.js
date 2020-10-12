const db = require('../models');

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
                reject(err);
            })
        }, 100);
    });
}

function makeRecommend(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.recommends.create({
                postType: req.body.postType,
                postNum: req.body.postNum,
                user: req.body.id
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
    countRecommend: countRecommend,
    makeRecommend: makeRecommend,
    deleteRecommend: deleteRecommend
}