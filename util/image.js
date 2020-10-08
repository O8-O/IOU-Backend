const db = require('../models');

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

module.exports = {
    saveImage: saveImage
}