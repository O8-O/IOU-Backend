const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');
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

router.get('/log_in_status', (req, res, next) => {
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

router.post('/upload_image', upload.single('imgFile'), async (req, res, next) => {
    try{
        var save = await user.saveImage(req);
        return res.json({"result" : true});
    } catch(err) {
        return next(err);
    }
});

router.get('/show_all_image', async (req, res, next) => {
    try{
        var list = await user.showAllImage(req.body.id);
        return res.json({"result" : list});
    } catch(err){
        return next(err);
    }
});

router.get('/show_one_image', async (req, res, next) => {
    try{
        var result = await user.showOneImage(req.body.imageNum);
        return res.json({"result" : result});
    } catch(err){
        return next(err);
    }
});

router.post('/delete_image', async (req, res, next) => {
    try{
        var data = await user.showOneImage(req.body.imageNum);
        if(data.user != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        }
        link = data.image;
        var result = await user.deleteImage(link);
        return res.json({"result" : true});
    } catch(err){
        return next(err);
    }
});

router.post('/save_preference', async (req, res, next) => {
    try{
        var result = await user.savePreference(req);
        return res.json({"result" : true});
    } catch(err){
        return next(err);
    }
});

router.get('/show_preference', async(req, res, next) => {
    try{
        var result = await user.showPreference(req.body.id);                
        data = JSON.parse(result.image);  
        result.image = data;
        return res.json({"result" : result});
    } catch(err){
        return next(err);
    }
});

module.exports = router;