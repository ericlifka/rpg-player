module.exports = function (app) {
    var auth = require('./auth');

    app.post('/auth', auth.authPOST);
    app.put('/auth', auth.authPUT);
    app.delete('/auth', auth.authDELETE);

    app.get('/something', auth.authMiddleware, function (req, res) {
        console.log('/something');
        console.log(req.user);
        res.send(200);
    });

};