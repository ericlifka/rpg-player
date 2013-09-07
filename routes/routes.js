module.exports = function (app) {
    var auth = require('./auth');
    var user = require('./user');
    var game = require('./game');

    // Open endpoints
    app.post('/auth', auth.createSession);
    app.put('/auth', auth.validateSession);
    app.post('/user', user.createUser);

    // Authentication required endpoints
    app.delete('/auth', auth.authMiddleware, auth.clearSession);
//    app.put('/user', auth.authMiddleware, user.updateUser);
//    app.delete('/users', auth.authMiddleware, user.deleteUser);
    app.get('/users/:id', auth.authMiddleware, user.getUserDescription);

    app.post('/game', auth.authMiddleware, game.createGame);
};