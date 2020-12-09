const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');
const voteBoard = require('../util/vote_board');
const image = require('../util/image');
const comment = require('../util/comment');
const recommend = require('../util/recommend');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        directory = __dirname.replace(/routes/g, 'upload\\');
        callback(null, directory);
    },
    filename: function(req, file, callback){
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

var upload = multer({
    storage: storage
});

router.post('/show_all', (req, res, next) => {
    voteBoard.showAll((err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
})

router.post('/show_all_user_board', (req, res, next) => {
    voteBoard.showAllUserBoard(req.body.id, (err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
});

router.post('/show_one', async (req, res, next) => {
    var count = await voteBoard.countVote(req);
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
        err = new Error();
        err.type = 307;
        err.message = "No image received";
        return next(err);
    }
    else{
        image.saveMultiImage(req, (err, result) => {
            if(err){
                return next(err);
            }
            models.vote_boards.create({
                title: req.body.title,
                contentText: req.body.contentText,
                contentImage1: result.image1,
                contentImage2: result.image2,
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

router.post('/edit_text', async (req, res, next) => {
    try{
        var post = await voteBoard.showOnePromise(req);

        if(post.writer != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        }

        var edit = await voteBoard.editText(req);
        return res.json({"result" : true});
    } catch(err) {
        return next(err);
    }  
});

router.post('/delete', async (req, res, next) => {
    try{                 
        var post = await voteBoard.showOnePromise(req);
   
        if(post.writer != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        } 
        var deleteAllVote = await voteBoard.deleteAllVote(req);
        var commentResult = await comment.deletePostComment(req, 2);   
        var recommendResult = await recommend.deleteVoteRecommend(req);  
        var image1 = await user.showOneImage(post.contentImage1);
        var image2 = await user.showOneImage(post.contentImage2);
        var imageResult1 = await image.deleteImage(image1.image);   
        var imageResult2 = await image.deleteImage(image2.image);
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
            err = new Error();
            err.type = 308;
            err.message = "Already voted";
            throw err;
        }        
        var voteResult = await voteBoard.makeVote(req);
        return res.json({"result" : true});
    } catch(err) {   
        return next(err);
    } 
});

router.post('/show_vote', async (req, res, next) => {
    try{
        var result = await voteBoard.showVote(req);
        return res.json({"result" : result});
    } catch(err) {   
        return next(err);
    } 
})

router.post('/cancel_vote', async (req, res, next) => {
    try{
        var showResult = await voteBoard.showUserVote(req);      
        
        if(showResult.postNum != req.body.postNum){
            err = new Error();
            err.type = 309;
            err.message = "Post Num doesn't match";
            throw err;
        }
        var deleteResult = await voteBoard.deleteVote(req);
        return res.json({"result" : true});
    } catch(err) {   
        return next(err);
    } 
})

module.exports = router;