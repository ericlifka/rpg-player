var mongo_service = require('./mongo_service');
var _ = require('underscore');

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
        mongo_service.getCollection(index.collection, function (collectionError, collection) {
            if (collectionError) {
                return console.warn("Error while creating index: ", index, collectionError);
            }
            collection.ensureIndex(index.index, index.options, function (indexError) {
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
