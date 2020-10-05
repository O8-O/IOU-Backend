const express = require('express');
const router = express.Router();
const models = require('../models');
const reBoard = require('../util/popularity_board');
const multer = require('multer');

var upload = multer({
    dest: 'upload/'
});

router.get('/showAll', (req, res, next) => {
    reBoard.showAllUserBoard(req.body.id, (err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
});

router.get('/showOne', (req, res, next) => {
    reBoard.showOneUserBoard(req.body.id, (err, postData) => {
        reBoard.showComment(postData.postNum, (err, commentData) => {
            if(err){
                return next(err);
            }
            return res.json({"board": postData, "comment": commentData});
        })
    })
});

router.post('/create', upload.single('imagFile'), (req, res, next) => {
    var file = req.file;

    
})