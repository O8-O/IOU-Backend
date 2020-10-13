const express = require('express');
const router = express.Router();
const models = require('../models');
const freeBoard = require('../util/free_board');
const image = require('../util/image');
const comment = require('../util/comment');
const recommend = require('../util/recommend');
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
    freeBoard.showAll((err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
})

router.get('/showAllUser', (req, res, next) => {
    freeBoard.showAllUserBoard(req.body.id, (err, postData) => {
        if(err){
            return next(err);
        }
        return res.json({"result": postData});
    })
});

router.get('/showOne', (req, res, next) => {
    freeBoard.showOneBoard(req, (err, postData) => {
        if(err){
            return next(err);
        }
        comment.showComment(postData.postNum, 1, (err, commentData) => {
            if(err){
                return next(err);
            }
            return res.json({"board": postData, "comment": commentData});
        })
    })
});

router.post('/create', upload.single('imgFile'), (req, res, next) => {
    if(!req.file){
        models.free_boards.create({
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
            models.free_boards.create({
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

// router.post('/delete', (req, res, next) => {    
//     comment.deletePostComment(req, (err, result) => {
//         if(err){
//             return next(err);
//         }
//         freeBoard.showOneBoard(req, (err, result) => {
//             console.log(result);
//             if(!result.contentImage){
//                 freeBoard.deleteBoard(req, (err, result) => {
//                     if(err){
//                         return next(err);
//                     }
//                     return res.json({"result": true});
//                 })
//             }
//             else{
//                 image.deleteImage(result.contentImage, (err, result) => {
//                     if(err){
//                         return next(err);
//                     }
//                     freeBoard.deleteBoard(req, (err, result) => {
//                         if(err){
//                             return next(err);
//                         }
//                         return res.json({"result": true});
//                     })
//                 })
//             }     
//         })           
//     })
// });

router.post('/delete', async (req, res, next) => {    
    try{                 
        var post = await freeBoard.showOnePromise(req);

        if(post.writer != req.body.id){
            throw new Error();
        }
        var commentResult = await comment.deletePostComment(req, 1);    
        var recommendResult = await recommend.deleteFreeRecommend(req);  
        if (!post.contentImage){
            var result = await freeBoard.deleteBoard(req);
        }
        else{
            var imageResult = await image.deleteImage(post.contentImage);
            var result = await freeBoard.deleteBoard(req);
        }
        return res.json({"result" : true});
    } catch(err) {
        return next(err);
    }         
});

module.exports = router;