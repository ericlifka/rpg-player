var mongodb = require('mongodb'),
    mongoUrl = 'mongodb://127.0.0.1:27017/rpgPlayer';

var getUser = function (username, callback) {
    mongodb.MongoClient.connect(mongoUrl, function (connectionError, db) {
        if (connectionError) {
            return callback(connectionError, null);
        }

        var collection = db.collection('users');
        collection.find({ username: username }).nextObject(
            function (queryError, userDocument) {
                db.close();
                callback(queryError, userDocument);
            });
    });
};

var createUser = function (user, callback) {
    var options = {
        safe: true
    };

    mongodb.MongoClient.connect(mongoUrl, function (connectionError, db) {
        if (connectionError) {
            return callback(connectionError, null);
        }

        var collection = db.collection('users');
        collection.insert(user, options, function (insertError, objects) {
            db.close();
            callback(insertError, objects);
        });
    });
};

module.exports = {
    getUser: getUser,
    createUser: createUser
};
