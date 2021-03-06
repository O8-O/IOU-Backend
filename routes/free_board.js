const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');
const freeBoard = require('../util/free_board');
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
    freeBoard.showAll((err, postData) => {
        if(err){
            return next(err);
        }    
        var len = postData.length;
        var i;
        var temp;
        for(i = 0; i < len; i++){
            temp = JSON.parse(postData[i].contentImage);
            postData[i].contentImage = temp;
        }   
        return res.json({"result": postData});
    })
})

router.post('/show_all_user_board', (req, res, next) => {
    freeBoard.showAllUserBoard(req.body.id, (err, postData) => {
        if(err){
            return next(err);
        }
        var len = postData.length;
        var i;
        var temp;
        for(i = 0; i < len; i++){
            temp = JSON.parse(postData[i].contentImage);
            postData[i].contentImage = temp;
        }  
        return res.json({"result": postData});
    })
});

router.post('/show_one', (req, res, next) => {
    freeBoard.showOneBoard(req, (err, postData) => {
        if(err){
            return next(err);
        }
        var imageData = JSON.parse(postData.contentImage);
        postData.contentImage = imageData;
        comment.showComment(postData.postNum, 1, (err, commentData) => {
            if(err){
                return next(err);
            }
            return res.json({"board": postData, "comment": commentData});
        })
    })
});

// router.post('/create', upload.single('imgFile'), (req, res, next) => {
//     if(!req.file){
//         models.free_boards.create({
//             title: req.body.title,
//             contentText: req.body.contentText,
//             writer: req.body.id,
//             views: 0,
//             recommend: 0
//         })
//         .then(result => {
//             return res.json({"result": true});
//         })
//         .catch(err => {
//             return next(err);
//         })
//     }
//     else{
//         image.saveImage(req, (err, result) => {
//             if(err){
//                 return next(err);
//             }
//             models.free_boards.create({
//                 title: req.body.title,
//                 contentText: req.body.contentText,
//                 contentImage: result.imageNum,
//                 writer: req.body.id,
//                 views: 0,
//                 recommend: 0
//             })
//             .then(result => {
//                 return res.json({"result": true});
//             })
//             .catch(err => {
//                 return next(err);
//             })
//         })        
//     }
// });

router.post('/create', upload.array('imgFile'), async (req, res, next) => {
    if(!req.files){
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
        var len = req.files.length;
        var i = 0;
        var list = [];
        for (; i < len; i++){
            var temp = await image.promiseSaveImage(req, i);
            list.push(temp.imageNum);
        }
        list = JSON.stringify(list);
        models.free_boards.create({
            title: req.body.title,
            contentText: req.body.contentText,
            contentImage: list,
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

router.post('/edit_text', async (req, res, next) => {
    try{
        var post = await freeBoard.showOnePromise(req);

        if(post.writer != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        }

        var edit = await freeBoard.editText(req);
        return res.json({"result" : true});
    } catch(err) {
        return next(err);
    }  
});

router.post('/delete', async (req, res, next) => {    
    try{                 
        var post = await freeBoard.showOnePromise(req);

        if(post.writer != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        }
        
        var commentResult = await comment.deletePostComment(req, 1);    
        var recommendResult = await recommend.deleteFreeRecommend(req);  
        if (!post.contentImage){
            var result = await freeBoard.deleteBoard(req);
        }
        else{
            var imageList = JSON.parse(post.contentImage);
            var len = imageList.length;
            var i;
            var imageResult;
            var imageLink;
            for(i = 0; i < len; i++){
                imageLink = await image.findImage(imageList[i]);
                imageResult = await image.deleteImage(imageLink.image);
            }
            
            var result = await freeBoard.deleteBoard(req);
        }
        return res.json({"result" : true});
    } catch(err) {
        return next(err);
    }         
});

module.exports = router;