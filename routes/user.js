const express = require('express');
const router = express.Router();
const models = require('../models');
const user = require('../util/user');

router.post('/sign_up', (req, res, next) => {
    var body = req.body;
    
    user.encryptPW(body.password, (err, password, saltMade) => {
        models.users.create({
            ID: body.id,
            PW: password,
            email: body.email,
            salt: saltMade
        })
        .then(result => {
            res.json({"result": true});
        })
        .catch(err => {
            console.log(err);
        })
    })    
});

module.exports = router;