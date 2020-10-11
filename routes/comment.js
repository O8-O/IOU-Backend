const express = require('express');
const router = express.Router();
const comment = require('../util/comment');

router.get('/show', (req, res, next) =>{
    comment.showComment(req.body.postNum, (err, result) => {
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
            throw new Error();
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