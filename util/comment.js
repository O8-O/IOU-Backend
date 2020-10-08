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

module.exports = {
    showComment: showComment,
    makeComment: makeComment
}