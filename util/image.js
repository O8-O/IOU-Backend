const db = require('../models');
const fs = require('fs');

function saveImage(req, callback){
    db.images.create({
        user: req.body.id,
        image: req.file.path
    })
    .then(result => {        
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(err);
    })
}

function deleteImage(req, callback){
    var link = req.body.image;
    fs.unlink(link, (err) => {
        if(err){
            return callback(err);
        }
        db.images.destroy({
            where: {
                image: link
            }
        })
        .then(result => {        
            return callback(null, result.dataValues);
        })
        .catch(err => {
            return callback(err);
        })
    })
}

module.exports = {
    saveImage: saveImage,
    deleteImage: deleteImage
}