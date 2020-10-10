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

function saveMultiImage(req, callback){
    db.images.create({
        user: req.body.id,
        image: req.files[0].path
    })
    .then(result => {       
        db.images.create({
            user: req.body.id,
            image: req.files[1].path
        }) 
        .then(result => {
            return callback(null, result.dataValues);
        })
        .catch(err => {
            return callback(err);
        })
    })
    .catch(err => {
        return callback(err);
    })
}

// function deleteImage(link, callback){
//     fs.unlink(link, (err) => {
//         if(err){
//             return callback(err);
//         }
//         link.replace(/\\/g, '\\');
//         db.images.destroy({
//             where: {
//                 image: link
//             }
//         })
//         .then(result => {        
//             return callback(null, result.dataValues);
//         })
//         .catch(err => {
//             return callback(err);
//         })
//     })
// }

function deleteImage(link){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.unlink(link, (err) => {
                if(err){
                    reject(err);
                }
                link.replace(/\\/g, '\\');
                db.images.destroy({
                    where: {
                        image: link
                    }
                })
                .then(result => {        
                    resolve(null, result.dataValues);
                })
                .catch(err => {
                    reject(err);
                })
            })
        }, 100);
    });
}

module.exports = {
    saveImage: saveImage,
    saveMultiImage: saveMultiImage,
    deleteImage: deleteImage
}