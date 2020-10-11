var express = require('express')
var app = express()
var port = 3000
const models = require('./models/index');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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
app.use('/comment', require('./routes/comment'));

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

module.exports = app;