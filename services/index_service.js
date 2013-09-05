var _ = require('underscore'),
    mongo = require('./mongo_service');


var indexes = [
    {
        collection: 'users',
        index: {
            username: 1
        },
        options: {
            unique: true
        }
    }
];

var ensureIndexes = function () {
    _.each(indexes, function (index) {
        mongo.getCollection(index.collection, function (collectionError, collection, finished) {
            if (collectionError) {
                return console.warn("Error while creating index: ", index, collectionError);
            }
            collection.ensureIndex(index.index, index.options, function (indexError) {
                finished();
                if (indexError) {
                    console.warn("Error while creating index: ", index, indexError);
                }
            });
        });
    });
};

module.exports = {
    ensureIndexes: ensureIndexes
};
