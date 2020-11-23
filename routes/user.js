const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');
const multer = require('multer');
var fs = require('fs');
var { running } = require('../app');

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

router.post('/log_in_status', (req, res, next) => {
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

router.post('/log_out', (req, res, next) => {    
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
        running.push(save.imageNum);
        return res.json({"result" : true});
    } catch(err) {
        return next(err);
    }
});

router.post('/show_all_image', async (req, res, next) => {
    try{
        var list = await user.showAllImage(req.body.id);
        return res.json({"result" : list});
    } catch(err){
        return next(err);
    }
});

router.post('/show_one_image', async (req, res, next) => {
    try{
        var result = await user.showOneImage(req.body.imageNum);
        return res.json({"result" : result});
    } catch(err){
        return next(err);
    }
});

router.post('/show_changed_image', async (req, res, next) => {
    try{
        var parent = await user.showOneImage(req.body.imageNum);
        var parentImage = parent.image;
        var parentImageNum = parent.imageNum;
        var result = await user.showChangedImage(req.body.imageNum);
        return res.json({"parent" : parentImageNum, "parent_image" : parentImage, result});
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

router.post('/download_image', (req, res) => {
    try{
        fs.readFile(req.body.image, (err, data) => {
            process.on('uncaughtException', (err) => {
                console.error(err);
                return res.json();
            })
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            res.write(data);
            
            res.end();
            // console.log(data);            
            // return res.json({data});            
        });
    } catch(err){
        return next(err);
    }    
});

router.get('/download/:image', async (req, res, next) => {
    try{
        var imageData = await user.showOneImage(req.params.image);
        
        fs.readFile(imageData.image, (err, data) => {
            process.on('uncaughtException', (err) => {
                console.error(err);
                return res.json();
            })
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            res.write(data);
            
            res.end();          
        });
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

router.post('/show_user_preference', async (req, res, next) => {
    try{
        var result = await user.showUserPreference(req.body.id);     
        if (result == null){
            return res.json({"result" : false});
        }         
        data = JSON.parse(result.image);  
        result.image = data;
        return res.json({"result" : result});
    } catch(err){
        return next(err);
    }
});

router.post('/show_preference', async (req, res, next) => {
    try{        
        var list = await user.showPreference();    
        return res.json({"result" : list});
    } catch(err){
        return next(err);
    }
});

router.post('/edit_preference', async (req, res, next) => {
    try{
        var result = await user.editPreference(req);
        return res.json({"result" : true});
    } catch(err){
        return next(err);
    }
});

// router.post('/add_preference', async (req, res, next) => {
//     try{
//         var result = await user.showPreference(req.body.id);                
//         data = JSON.parse(result.image);  
//         data.shift();
//         data.push(req.body.image);

//         var add = await user.addPreference(req.body.id, data);

//         return res.json({"result" : true});
//     } catch(err){
//         return next(err);
//     }
// });

router.post('/find_id', async (req, res, next) => {
    try{
        var result = await user.findUserByEmail(req.body.email);   
        return res.json({"result" : result.ID});
    } catch(err){
        return next(err);
    }
});

router.post('/reset_password', async (req, res, next) => {
    try{
        var result = await user.findUserByEmail(req.body.email);
        if(result.ID != req.body.id){
            err = new Error();
            err.type = 107;
            err.message = "ID doesn't match"
            throw err;
        }

        var newData = await user.setPassword(req.body.id, req.body.password);   
        return res.json({"result" : true});
    } catch(err){
        return next(err);
    }
});

router.post('/dummy', (req, res, next) => {
    models.images.findOne({
        where: {
            imageNum : req.body.imageNum
        }
    })
    .then(result => {
        return res.json({"result": result});
    })
    .catch(err => {
        return next(err);
    })
});

module.exports = router;