var user_service = require('../services/user_service');

var sessions = {};

var notMatched = function (userObject, username, password) {
    return !userObject || userObject.username !== username || userObject.password !== password;
};

var createSession = function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    user_service.getUser(username, function (queryError, user) {
        if (queryError || notMatched(user, username, password)) {
            return res.send(401);
        }

        var timeStamp = new Date(),
            token = username + ":" + timeStamp.getTime();

        sessions[token] = username;
        sendAuthResponse(username, token, res);
    });
};

var validateSession = function (req, res) {
    var token = req.body.token,
        username = sessions[token];

    if (!token || !username) {
        return res.send(401);
    }

    return sendAuthResponse(username, token, res);
};

var clearSession = function (req, res) {
    var token = req.body.token;
    sessions[token] = undefined;
    res.send(200);
};

var sendAuthResponse = function (username, token, res) {
    return res.send({
        token: token,
        username: username
    });
};

var authMiddleware = function (req, res, next) {
    var token = req.cookies.auth_token,
        username = sessions[token];

    if (!username) {
        return res.send(401);
    }

    req.username = username;
    return next();
};

module.exports = {
    createSession: createSession,
    validateSession: validateSession,
    clearSession: clearSession,
    authMiddleware: authMiddleware
};
