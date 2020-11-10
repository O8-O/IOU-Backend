const express = require('express');
const router = express.Router();
const recommend = require('../util/recommend');

router.post('/show', async (req, res, next) => {
    try{
        var freeList = await recommend.orderFreeRecommend();
        // var voteList = await hotBoard.orderVoteRecommend();

        return res.json({"result": freeList});
    } catch(err) {   
        return next(err);
    } 
});

module.exports = router;