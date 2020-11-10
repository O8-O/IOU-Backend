const express = require('express');
const router = express.Router();
const models = require('../models');
const recommend = require('../util/recommend');

router.post('/free', async (req, res, next) => {
    try{         
        req.body.postType = 1;
        var find = await recommend.findFreeRecommend(req);    
        if(find){
            err = new Error();
            err.type = 505;
            err.message = "Already recommended"
            throw err;
        }    
        var recom = await recommend.makeFreeRecommend(req);
        var count = await recommend.countRecommend(req);

        models.free_boards.update({
            recommend: count,      
        }, {
            where: {
                postNum: req.body.postNum
            }
        })
        .then(result => {
            return res.json({"result": true});
        })
        .catch(err => {
            return next(err);
        })
    } catch(err) {
        return next(err);
    }       
});

router.post('/vote', async (req, res, next) => {
    try{      
        req.body.postType = 2;   
        var find = await recommend.findVoteRecommend(req);    
        if(find){
            err = new Error();
            err.type = 505;
            err.message = "Already recommended"
            throw err;
        }    
        var recom = await recommend.makeVoteRecommend(req);
        var count = await recommend.countRecommend(req);

        models.vote_boards.update({
            recommend: count,      
        }, {
            where: {
                postNum: req.body.postNum
            }
        })
        .then(result => {
            return res.json({"result": true});
        })
        .catch(err => {
            return next(err);
        })
    } catch(err) {
        return next(err);
    }       
});

router.post('/freeCancel', async (req, res, next) => {
    try{         
        var find = await recommend.findFreeRecommend(req);    
        if(!find){
            err = new Error();
            err.type = 506;
            err.message = "No recommend Data exists"
            throw err;
        }    
        req.body.postType = 1;
        var post = await recommend.deleteRecommend(req);
        var count = await recommend.countRecommend(req);

        models.free_boards.update({
            recommend: count,      
        }, {
            where: {
                postNum: req.body.postNum
            }
        })
        .then(result => {
            return res.json({"result": true});
        })
        .catch(err => {
            return next(err);
        })
    } catch(err) {
        return next(err);
    } 
});

router.post('/voteCancel', async (req, res, next) => {
    try{         
        var find = await recommend.findVoteRecommend(req);    
        if(!find){
            err = new Error();
            err.type = 506;
            err.message = "No recommend Data exists"
            throw err;
        }    
        req.body.postType = 2;
        var post = await recommend.deleteRecommend(req);
        var count = await recommend.countRecommend(req);

        models.vote_boards.update({
            recommend: count,      
        }, {
            where: {
                postNum: req.body.postNum
            }
        })
        .then(result => {
            return res.json({"result": true});
        })
        .catch(err => {
            return next(err);
        })
    } catch(err) {
        return next(err);
    } 
});

module.exports = router;