const db = require('../models');

function showAll(callback){
    db.popularity_boards.findAll({
        where:{}
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
        return callback(null, result);
    })
    .catch(err => {
        return callback(err);
    })
}

function showOneBoard(req, callback){
    db.popularity_boards.findOne({
        where:{
            postNum: req.body.post
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
    showAll: showAll,
    showAllUserBoard: showAllUserBoard,
    showOneBoard: showOneBoard
}