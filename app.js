var express = require('express');
var app = express();
var port = 3000;
const models = require('./models/index');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error_handler');

const CronJob = require('cron').CronJob;
const image = require('./util/image');
const user = require('./util/user');
const MlWrapper = require('./util/IOU-ML/mlWrapper');

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

ml = new MlWrapper();
const uploadStart = async () => {
    console.log('Upload start');
    if (running.length){
        console.log('Upload data exist');
        var imageNum = running.shift();
        var parentImage = await image.findImage(imageNum);
        var tempPref = await user.showUserPreference(parentImage.user);
        var index = JSON.parse(tempPref.image);
        var prefImage = [];

        for (var i = 0; i < index.length; i++){
            var temp = await image.findImage(index[i]);
            prefImage.push(temp.image);
        }

        console.log(parentImage.image, prefImage, parentImage.lightColor);
        ml.requestServiceStart(parentImage.image, prefImage, parentImage.lightColor);
    }
}
const uploadStop = () => console.log('Upload stopped');
const upload = new CronJob("*/5 * * * * *", uploadStart, uploadStop, false, 'Asia/Seoul');
setTimeout(() => upload.start(), 3000);

const downloadStart = async () => {
    console.log('Download start');
    ml.checkServiceEnd().then(async (changedList)=>{
        if(changedList.length){
            console.log('Download data exist');
            var parentImage = await image.findImageByLink(changedList[0].changedFile);
            var tempLink;
            var tempJson;
            var result;
            var wallImage;
            var floorImage;
            
            for (var i = 1; i < 9; i++){ // save changed image
                var furniture;

                wallImage = await image.findImageByLink(changedList[i].changedJson.wallPicture);
                floorImage = await image.findImageByLink(changedList[i].changedJson.floorPicture);
                
                changedList[i].changedJson.wallPicture = wallImage.imageNum;
                changedList[i].changedJson.floorPicture = floorImage.imageNum;

                tempLink = changedList[i].changedFile;
                tempJson = JSON.stringify(changedList[i].changedJson);
                result = await image.saveChangedImage(parentImage.imageNum, parentImage.user, tempLink, tempJson);

                for (var j = 0; j < changedList[i].changedJson.recommendFurniture.length; j++){ // save changedFurniture
                    var rFurniture = [];
                    for (var k = 0; k < changedList[i].changedJson.recommendFurniture[j].link.length; k++){
                        furniture = await image.saveFurniture(result.imageNum, result.user, changedList[i].changedJson.recommendFurniture[j].link[k]);
                        rFurniture.push(furniture.furnitureNum);
                    }
                    changedList[i].changedJson.recommendFurniture[j].link = rFurniture;
                }                

                tempJson = JSON.stringify(changedList[i].changedJson);
                console.log(tempJson);
                result = await image.editImageData(result.imageNum, tempJson);
            }
        }        
    });
}
const downloadStop = () => console.log('Download stopped');
const download = new CronJob("*/5 * * * * *", downloadStart, downloadStop, false, 'Asia/Seoul');
setTimeout(() => download.start(), 3000);

app.use([errorHandler.logHandler, errorHandler.httpSender]);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;