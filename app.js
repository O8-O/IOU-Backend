var express = require('express');
var app = express();
var port = 3000;
const models = require('./models/index');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error_handler');
const schedule = require('node-schedule');
const db = require('./models');
const multer = require('multer');
// const ml = require('./util/IOU-ML/mlWrapper');

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

app.use([errorHandler.logHandler, errorHandler.httpSender]);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;