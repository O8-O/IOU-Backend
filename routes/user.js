const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');

router.post('/sign_up', (req, res, next) => {
    var body = req.body;
    
    user.encryptPW(body.password, (err, password, saltMade) => {

        user.findUserByID(body.id, (err, result) => {
            models.users.create({
                ID: body.id,
                PW: password,
                email: body.email,
                salt: saltMade
            })
            .then(result => {
                return res.json({"result": true});
            })
            .catch(err => {
                return next(err);
            })
        });
        
        // if(user.findUserByID(body.id)){
        //     models.users.create({
        //         ID: body.id,
        //         PW: password,
        //         email: body.email,
        //         salt: saltMade
        //     })
        //     .then(result => {
        //         return res.json({"result": true});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         return next(err);
        //     })
        // }   
        // else{
        //     return next(err);
        // }     
    });    
});

module.exports = router;