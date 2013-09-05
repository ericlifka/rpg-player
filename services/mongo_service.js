var mongodb = require('mongodb'),
    mongoUrl = 'mongodb://127.0.0.1:27017/rpgPlayer';

var getCollection = function (collectionName, callback) {
    mongodb.MongoClient.connect(mongoUrl, function (connectionError, db) {
        if (connectionError) {
            return callback(connectionError, null);
        }

        var collection = db.collection(collectionName);
        callback(null, collection, function () {
            db.close();
        });
    });
};

module.exports = {
    getCollection: getCollection
};
