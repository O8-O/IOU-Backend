const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/sign_up', (req, res, next) => {
    var body = req.body;
    console.log(req)
    models.users.create({
        ID: body.id,
        PW: body.password,
        email: body.email
    })
    .then(result => {
        res.json({"result": true});
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;