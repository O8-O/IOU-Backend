const express = require('express');
const router = express.Router();
const comment = require('../util/comment');

router.post('/show', (req, res, next) =>{
    comment.showComment(req.body.postNum, req.body.postType, (err, result) => {
        if(err){
            return next(err);
        }
        return res.json({"result": result});
    })
})

router.post('/make', (req, res, next) => {
    comment.makeComment(req, (err, result) => {
        if(err){
            return next(err);
        }
        return res.json({"result": true});
    })
});

router.post('/delete', async (req, res, next) => {    
    try{
        var data = await comment.showPromise(req.body.commentNum);
        if(data.writer != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        }
        comment.deleteComment(req, (err, result) => {
            if(err){
                return next(err);
            }
            return res.json({"result": true});
        })
    } catch(err) {
        return next(err);
    }    
});

module.exports = router;