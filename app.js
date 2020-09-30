var express = require('express')
var app = express()
var port = 3000
const models = require('./models/index');

models.sequelize.sync().then(() => {
    console.log("DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});