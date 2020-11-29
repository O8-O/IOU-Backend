var express = require('express');
var app = express();
var port = 3000;
const models = require('./models/index');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error_handler');
// const schedule = require('node-schedule');
// const db = require('./models');
// const multer = require('multer');

const CronJob = require('cron').CronJob;
const image = require('./util/image');
const user = require('./util/user');
// const MlWrapper = require('./util/IOU-ML/mlWrapper');

var running = [];
module.exports.running = running;

models.sequelize.sync().then(() => {
    console.log("DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});

app.use(express.json());
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 24 hour
    }
}));
app.use('/upload', express.static('uploads'));

app.use('/user', require('./routes/user'));
app.use('/free_board', require('./routes/free_board'));
app.use('/vote_board', require('./routes/vote_board'));
app.use('/hot_board', require('./routes/hot_board'));
app.use('/comment', require('./routes/comment'));
app.use('/recommend', require('./routes/recommend'));

// ml = new MlWrapper();
// schedule.scheduleJob("*/5 * * * * *", () => {
//     console.log("HI");
//     if(running.length){
//         var imageNum = running.shift();
//         db.images.findOne({
//             where: {
//                 imageNum: imageNum
//             }
//         })
//         .then(result => {       
//             ml.getStyleChangedImage(result.dataValues.image, [""]).then(
//                 (data) => {
//                     var len = data.length;
//                     var loop = data[len - 1];
//                     setTimeout(() => {
//                         for(var i = len - 2; i > len - loop - 2; i--){
//                             console.log("WHY");
//                             db.changed_images.create({
//                                 user: result.dataValues.user,
//                                 parentImage: result.dataValues.imageNum,
//                                 image: data[i]
//                             })
//                             .then(result => {       
//                                 console.log(result.dataValues);
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                             })
//                         }
//                         console.log("success");     
//                     }, 1000);
//                 },
//                 (err) => {
//                     console.log(err);
//                 }
//             )               
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }    
// });


// ml = new MlWrapper();
const uploadStart = async () => {
    console.log('Upload start');
    if (running.length){
        console.log('Upload data exist');
        var imageNum = running.shift();
        var parentImage = await image.findImage(imageNum);
        var tempPref = await user.showUserPreference(parentImage.user);
        var index = JSON.parse(tempPref.image);
        var lightColor = JSON.parse(parentImage.lightColor);
        var prefImage = []

        for (var i = 0; i < index.length; i++){
            var temp = await image.findImage(index[i]);
            prefImage.push(temp.image);
        }

        console.log(parentImage.image, prefImage, lightColor);
        // ml.requestServiceStart(parentImage.image, prefImage, lightColor);
    }
}
const uploadStop = () => console.log('Upload stopped');
const upload = new CronJob("*/5 * * * * *", uploadStart, uploadStop, false, 'Asia/Seoul');
// setTimeout(() => upload.start(), 3000);

const downloadStart = async () => {
    console.log('Download start');
    var changedList;
    var changedList = [{changedFile: null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}, {changedFile:null, changedJSON:null}];

    changedList[0].changedFile = "C:\\Users\\KDW\\Desktop\\KOO\\대학\\3학년2학기\\캡스톤디자인\\capstone\\IOU-Backend\\upload\\2020-11-29T10-56-10.649Zinterior (1).jpg";
    changedList[1].changedFile = "C:\\Users\\KDW\\Desktop\\KOO\\대학\\3학년2학기\\캡스톤디자인\\capstone\\IOU-Backend\\upload\\2020-11-29T10-56-15.503Zinterior (8).jpg";
    changedList[1].changedJson = {
        wallColor : [233, 242, 172],
        wallPicture : 63,
        floorColor : [233, 242, 172],
        floorPicture : 64,
        changedFurniture : [
            {
                start : [234, 457], color : [233, 242, 172]
            },
            {
                start : [1023, 678], color : [233, 242, 172]
            }
        ],
        recommendFurniture : [
            {
                start : [234, 457], pictureList : [65, 66, 67]
            },
            {
                start : [1023, 678], pictureList : [68, 69, 70]
            }
        ],
        recommendMore : [71, 72]
    };

    // var changedList = ml.checkServiceEnd();
    if (changedList.length){
        console.log('Download data exist');
        var parentImage = await image.findImageByLink(changedList[0].changedFile);
        var tempLink;
        var tempJson;
        var result;
        for (var i = 1; i < 2; i++){
            tempLink = changedList[i].changedFile;
            tempJson = JSON.stringify(changedList[i].changedJson);
            console.log(tempJson);
            result = await image.saveChangedImage(parentImage.imageNum, parentImage.user, tempLink, tempJson);
            console.log(result);
        }
    }
}
const downloadStop = () => console.log('Download stopped');
const download = new CronJob("*/5 * * * * *", downloadStart, downloadStop, false, 'Asia/Seoul');
// setTimeout(() => download.start(), 3000);

app.use([errorHandler.logHandler, errorHandler.httpSender]);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;