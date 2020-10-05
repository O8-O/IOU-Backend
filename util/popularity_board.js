const db = require('../models');

function showAllUserBoard(id, callback){
    db.popularity_boards.findAll({
        where:{
            writer: id
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

function showOneUserBoard(id, post, callback){
    db.popularity_boards.findOne({
        where:{
            writer: id,
            postNum: post
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

function showComment(post, callback){
    db.comments.findAll({
        where:{
            postNum: post
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

module.exports = {
    showAllUserBoard: showAllUserBoard,
    showOneUserBoard: showOneUserBoard,
    showComment: showComment
}