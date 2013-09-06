var mongo = require('./mongo_service');

var newGame = function (title, owner, callback) {
    var game = {
        title: title,
        owner: owner
    };

    mongo.getCollection('games', function (error, collection, finished) {
        if (error) return callback(error, null);
        collection.insert(game, { safe: true }, function (insertError, objects) {
            finished();
            callback(insertError, objects);
        });
    });
};

module.exports = {
    newGame: newGame
};
