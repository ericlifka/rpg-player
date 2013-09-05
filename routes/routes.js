module.exports = function (app) {
    var auth = require('./auth');
    var user = require('./user');

    app.post('/auth', auth.createSession);
    app.put('/auth', auth.validateSession);
    app.delete('/auth', auth.clearSession);

    app.post('/user', user.createUser);
    app.put('/user', user.updateUser);
    app.delete('/user', user.deleteUser);

    app.get('/something', auth.authMiddleware, function (req, res) {
        console.log('/something');
        console.log(req.user);
        res.send(200);
    });

};