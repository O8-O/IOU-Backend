const db = require('../models');

function showComment(post, callback){
    db.comments.findAll({
        where:{
            postNum: post
        }
    })
    .then(result => {        
        return callback(null, result);
    })
    .catch(err => {
        return callback(err);
    })
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

function deletePostComment(req, callback){
    db.comments.destroy({
        where: {
            postNum: req.body.postNum
        }
    })
    .then(result => {        
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(err);
    })
}

module.exports = {
    showComment: showComment,
    makeComment: makeComment,
    deleteComment: deleteComment,
    deletePostComment: deletePostComment
}