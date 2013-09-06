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
    app.put('/user', auth.authMiddleware, user.updateUser);
    app.delete('/user', auth.authMiddleware, user.deleteUser);
    app.get('/user', auth.authMiddleware, user.getUserDescription);

    app.post('/game', auth.authMiddleware, game.createGame);
};