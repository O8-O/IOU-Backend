const express = require('express');
const router = express.Router();
const models = require('../models');
const voteBoard = require('../util/vote_board');
const image = require('../util/image');
const comment = require('../util/comment');
const multer = require('multer');
const vote_board = require('../util/vote_board');

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

router.get('/showOne', async (req, res, next) => {
    var count = await vote_board.countVote(req);
    voteBoard.showOneBoard(req, (err, postData) => {
        if(err){
            return next(err);
        }
        comment.showComment(postData.postNum, 2, (err, commentData) => {
            if(err){
                return next(err);
            }            
            return res.json({"board": postData, "count": count, "comment": commentData});
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

router.post('/delete', async (req, res, next) => {
    try{                 
        var post = await voteBoard.showOnePromise(req);
   
        if(post.writer != req.body.id){
            throw new Error();
        } 
        var deleteAllVote = await voteBoard.deleteAllVote(req);
        var commentResult = await comment.deletePostComment(req, 2);   
        var imageResult1 = await image.deleteImage(post.contentImage1);   
        var imageResult2 = await image.deleteImage(post.contentImage2);
        var result = await voteBoard.deleteBoard(req);   

        return res.json({"result" : true});
    } catch(err) {   
        return next(err);
    } 
});

router.post('/vote', async (req, res, next) => {
    try{
        var showResult = await voteBoard.showUserVote(req);

        if(showResult){
            throw new Error();
        }        
        var voteResult = await voteBoard.makeVote(req);
        return res.json({"result" : true});
    } catch(err) {   
        return next(err);
    } 
});

router.get('/showVote', async (req, res, next) => {
    try{
        var result = await voteBoard.showVote(req);
        return res.json({"result" : result});
    } catch(err) {   
        return next(err);
    } 
})

router.post('/cancelVote', async (req, res, next) => {
    try{
        var showResult = await voteBoard.showUserVote(req);      
        
        if(showResult.postNum != req.body.postNum){
            throw new Error();
        }
        var deleteResult = await voteBoard.deleteVote(req);
        return res.json({"result" : true});
    } catch(err) {   
        return next(err);
    } 
})

module.exports = router;