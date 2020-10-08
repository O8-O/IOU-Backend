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

module.exports = {
    showComment: showComment
}