const db = require('../models');
const fs = require('fs');

function errorWrapper(errorType, err){
    if(err){
        err.type = 0;
        err.message = "Unexpected error";
        return err;
    }
    err = new Error();

    switch(errorType){
        case 601:
            err.message = "Fail to save image";
            break;
        case 602:
            err.message = "Fail to delete image";
            break;
    }
    err.type = errorType;
    return err;
}

function saveImage(req, callback){
    db.images.create({
        user: req.body.id,
        image: req.file.path
    })
    .then(result => {       
        return callback(null, result.dataValues);
    })
    .catch(err => {
        return callback(errorWrapper(601));
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
            return callback(errorWrapper(601));
        })
    })
    .catch(err => {
        return callback(errorWrapper(601));
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
                    reject(errorWrapper(602));
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
                    reject(errorWrapper(602));
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