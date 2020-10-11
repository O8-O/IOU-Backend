const db = require('../models');

function showComment(postNum, callback){
    db.comments.findAll({
        where:{
            postNum: postNum
        }
    })
    .then(result => {        
        return callback(null, result);
    })
    .catch(err => {
        return callback(err);
    })
}

function showPromise(commentNum){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.comments.findOne({
                where: {
                    commentNum: commentNum 
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

function makeComment(req, callback){
    db.comments.create({
        postNum: req.body.postNum,
        content: req.body.content,
        writer: req.body.id
    })
    .then(result => {        
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(err);
    })
}

function deleteComment(req, callback){
    db.comments.destroy({
        where: {
            writer: req.body.id,
            commentNum: req.body.commentNum 
        }
    })
    .then(result => {        
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(err);
    })
}

// function deletePostComment(req, callback){
//     db.comments.destroy({
//         where: {
//             postNum: req.body.postNum
//         }
//     })
//     .then(result => {        
//         return callback(null, result.dataValues);
//     })
//     .catch(err => {
//         return callback(err);
//     })
// }

function deletePostComment(req){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.comments.destroy({
                where: {
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(err);
            })
        }, 100);
    });
}

module.exports = {
    showComment: showComment,
    showPromise: showPromise,
    makeComment: makeComment,
    deleteComment: deleteComment,
    deletePostComment: deletePostComment
}