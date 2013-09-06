module.exports = function (app) {
    var auth = require('./auth');
    var user = require('./user');

    // Open endpoints
    app.post('/auth', auth.createSession);
    app.put('/auth', auth.validateSession);
    app.delete('/auth', auth.clearSession);
    app.post('/user', user.createUser);

    // Authentication required endpoints
//    app.all('*', auth.authMiddleware);
    app.put('/user', auth.authMiddleware, user.updateUser);
    app.delete('/user', auth.authMiddleware, user.deleteUser);
    app.get('/user', auth.authMiddleware, user.getUserDescription);
};