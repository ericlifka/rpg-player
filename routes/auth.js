var sessions = {};

var authenticate = function (req, res) {
    var username = req.body.username,
        password = req.body.password,
        token = req.body.token;

    if (token) {
        authenticateWithToken(token, res);
    } else if (username && password) {
        authenticateWithUsernameAndPassword(username, password, res);
    } else {
        res.send(401);
    }
};

var authenticateWithUsernameAndPassword = function (username, password, res) {
    var timeStamp = new Date(),
        token = username + ":" + timeStamp.getTime();

    sessions[token] = username;
    sendAuthResponse(username, token, res);
};

var authenticateWithToken = function (token, res) {
    var username = sessions[token];

    if (username) {
        sendAuthResponse(username, token, res);
    } else {
        res.send(401);
    }
};

var sendAuthResponse = function (username, token, res) {
    res.send({
        token: token,
        username: username
    });
};

exports.authenticate = authenticate;