var sessions = {};

var authPOST = function (req, res) {
    var username = req.body.username,
        password = req.body.password,
        timeStamp = new Date(),
        token = username + ":" + timeStamp.getTime();

    if (!username || !password) {
        return res.send(401);
    }

    sessions[token] = username;
    return sendAuthResponse(username, token, res);
};

var authPUT = function (req, res) {
    var token = req.body.token,
        username = sessions[token];

    if (!token || !username) {
        return res.send(401);
    }

    return sendAuthResponse(username, token, res);
};

var authDELETE = function (req, res) {
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

var authenticationMiddleware = function (req, res, next) {
    var token = req.cookies.auth_token,
        username = sessions[token];

    if (!username) {
        return res.send(401);
    }

    req.user = username;
    return next();
};

module.exports = {
    authPOST: authPOST,
    authPUT: authPUT,
    authDELETE: authDELETE,
    authMiddleware: authenticationMiddleware
};
