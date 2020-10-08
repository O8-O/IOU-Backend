const express = require('express');
const router = express.Router();
const models = require('../models');
const reBoard = require('../util/popularity_board');
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
    reBoard.showAll((err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
})

router.get('/showAll', (req, res, next) => {
    reBoard.showAllUserBoard(req.body.id, (err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
});

router.get('/showOne', (req, res, next) => {
    reBoard.showOneUserBoard(req, (err, postData) => {
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

router.post('/create', upload.single('imgFile'), (req, res, next) => {
    if(!req.file){
        models.popularity_boards.create({
            title: req.body.title,
            contentText: req.body.contentText,
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
    }
    else{
        image.saveImage(req, (err, result) => {
            if(err){
                return next(err);
            }
            models.popularity_boards.create({
                title: req.body.title,
                contentText: req.body.contentText,
                contentImage: req.file.path,
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

router.post('/comment', (req, res, next) => {
    comment.makeComment(req, (err, result) => {
        if(err){
            return next(err);
        }
        return res.json({"result": true});
    })
});

module.exports = router;