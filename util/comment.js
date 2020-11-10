const db = require('../models');

function errorWrapper(errorType, err){
    if(err){
        err.type = 0;
        err.message = "Unexpected error";
        return err;
    }
    err = new Error();

    switch(errorType){
        case 401:
            err.message = "Fail to show comment";
            break;
        case 402:
            err.message = "Fail to delete comment";
            break;
    }
    err.type = errorType;
    return err;
}

function showComment(postNum, postType, callback){
    db.comments.findAll({
        where:{
            postType: postType,
            postNum: postNum
        }
    })
    .then(result => {        
        return callback(null, result);
    })
    .catch(err => {
        return callback(errorWrapper(0, err));
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
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(401));
            })
        }, 100);
    });
}

function makeComment(req, callback){
    db.comments.create({
        postType: req.body.postType,
        postNum: req.body.postNum,
        content: req.body.content,
        writer: req.body.id
    })
    .then(result => {        
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(errorWrapper(0, err));
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
        return callback(errorWrapper(0, err));
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

function deletePostComment(req, postType){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            db.comments.destroy({
                where: {
                    postType: postType,
                    postNum: req.body.postNum
                }
            })
            .then(result => {
                resolve(result.dataValues);
            })
            .catch(err => {
                reject(errorWrapper(402));
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