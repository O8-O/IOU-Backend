const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');

router.post('/sign_in', (req, res, next) => {
    var body = req.body;
    
    user.encryptPW(body.password, (err, password, saltMade) => {
        user.findUserByID(body.id, (err, result) => {
            if(err){
                return next(err);
            }
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
    });    
});

router.get('/log_in', (req, res, next) => {
    user.loginCheck(req.session, (err, result) => {
        if(err){
            return next(err);
        }
        return res.json({"result": true});
   })
});

router.post('/log_in', (req, res, next) => {
    var body = req.body;
    
    user.doLogin(body.id, body.password, (err, result) => {     
        if(err){
            return next(err);
        }        
        req.session.id = body.id;
        req.session.login = true;
        return res.json({"result": true});
    })
});

router.get('/log_out', (req, res, next) => {    
    user.loginCheck(req.session, (err, result) => {
        if(err){
            return next(err);
        }
        req.session.login = false;
        return res.json({"result": true});
   })
});

module.exports = router;