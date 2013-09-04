var sessions = {};

var authPOST = function (req, res) {
    var username = req.body.username,
        password = req.body.password,
        timeStamp = new Date(),
        token = username + ":" + timeStamp.getTime();

    if (username && password) {
        sessions[token] = username;
        sendAuthResponse(username, token, res);
    } else {
        res.send(401);
    }
};

var authPUT = function (req, res) {
    var token = req.body.token,
        username = sessions[token];

    if (token && username) {
        sendAuthResponse(username, token, res);
    } else {
        res.send(401);
    }
};

var authDELTE = function (req, res) {
    var token = req.body.token;
    sessions[token] = undefined;
    res.send(200);
};

var sendAuthResponse = function (username, token, res) {
    res.send({
        token: token,
        username: username
    });
};

exports.authPOST = authPOST;
exports.authPUT = authPUT;
exports.authDELTE = authDELTE;