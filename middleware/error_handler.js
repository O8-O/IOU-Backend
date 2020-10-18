module.exports = {
    logHandler : (err, req, res, next) => {
        console.error('[' + new Date() + '] ' + err.stack);
        next(err);
    },
    httpSender : (err, req, res, next) => {
        return res.status(520).json({"result": false, "msg": "Unexpected error"});
    }
}