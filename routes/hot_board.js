const express = require('express');
const router = express.Router();
const recommend = require('../util/recommend');

router.post('/show', async (req, res, next) => {
    try{
        var freeList = await recommend.orderFreeRecommend();
        // var voteList = await hotBoard.orderVoteRecommend();
        var len = freeList.length;
        var i;
        var temp;
        for(i = 0; i < len; i++){
            temp = JSON.parse(freeList[i].contentImage);
            freeList[i].contentImage = temp;
        }   

        return res.json({"result": freeList});
    } catch(err) {   
        return next(err);
    } 
});

module.exports = router;