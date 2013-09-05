var mongo = require('./mongo_service');

var getUser = function (username, callback) {
    mongo.getCollection('users', function (error, collection, finished) {
        if (error) return callback(error, null);
        collection.find({ username: username }).nextObject(function (queryError, userDocument) {
            finished();
            callback(queryError, userDocument);
        });
    });
};

var createUser = function (user, callback) {
    mongo.getCollection('users', function (error, collection, finished) {
        if (error) return callback(error, null);
        collection.insert(user, { safe: true }, function (insertError, objects) {
            finished();
            callback(insertError, objects);
        });
    });
};

module.exports = {
    getUser: getUser,
    createUser: createUser
};
