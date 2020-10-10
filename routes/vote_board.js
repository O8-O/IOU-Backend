const express = require('express');
const router = express.Router();
const models = require('../models');
const voteBoard = require('../util/vote_board');
const image = require('../util/image');
const comment = require('../util/comment');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload/');
    },
    filename: function(req, file, callback){
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

var upload = multer({
    storage: storage
});

router.get('/show', (req, res, next) => {
    voteBoard.showAll((err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
})

router.get('/showAllUser', (req, res, next) => {
    voteBoard.showAllUserBoard(req.body.id, (err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
});

router.get('/showOne', (req, res, next) => {
    voteBoard.showOneBoard(req, (err, postData) => {
        if(err){
            return next(err);
        }
        comment.showComment(postData.postNum, (err, commentData) => {
            if(err){
                return next(err);
            }
            return res.json({"board": postData, "comment": commentData});
        })
    })
});

router.post('/create', upload.array('imgFile'), (req, res, next) => {
    if(!req.files){
        return next(new Error());
    }
    else{
        image.saveMultiImage(req, (err, result) => {
            if(err){
                return next(err);
            }
            models.vote_boards.create({
                title: req.body.title,
                contentText: req.body.contentText,
                contentImage1: req.files[0].path,
                contentImage2: req.files[1].path,
                writer: req.body.id,
                views: 0,
                recommend: 0
            })
            .then(result => {
                return res.json({"result": true});
            })
            .catch(err => {
                return next(err);
            })
        })        
    }
});

module.exports = router;