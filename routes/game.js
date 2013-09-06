var game_service = require('../services/game_service');

var createGame = function (req, res) {
    var title = req.body.title,
        username = req.username;

    game_service.newGame(title, username, function(error, game) {
        if (error) {
            res.send(500, error);
        } else {
            res.send(game);
        }
    });
};

module.exports = {
    createGame: createGame
};
