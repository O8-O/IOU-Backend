const db = require('../models');

function showAll(callback){
    db.free_boards.findAll({
        where:{}
    })
    .then(result => {0
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
    db.free_boards.findAll({
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
    db.free_boards.findOne({
        where:{
            postNum: req.body.postNum
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

function deleteBoard(req, callback){
    db.free_boards.destroy({
        where: {
            postNum: req.body.postNum
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
    showOneBoard: showOneBoard,
    deleteBoard: deleteBoard
}