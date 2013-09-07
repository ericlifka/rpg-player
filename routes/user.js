var user_service = require('../services/user_service');
var auth = require('./auth');

var getUserDescription = function (req, res) {
    var userId = req.params.id;
    user_service.getUserById(userId, function(error, user) {
        if (error) return res.send(404);
        var userRecord = {
            user: {
                id: user._id,
                username: user.username
            }
        };
        res.send(userRecord);
    });
};

var createUser = function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    user_service.createUser({
        username: username,
        password: password
    }, function () {
        auth.createSession(req, res);
    });
};

var updateUser = function () {
};

var deleteUser = function () {
};

module.exports = {
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserDescription: getUserDescription
}
