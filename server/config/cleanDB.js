const models = require('../models');
const db = require('./connection');

module.exports = async (modelName, collectionName) => {

    let modelExists = await models[modelName].db.db
        .listCollections({
            name: collectionName,
        })
        .toArray();

    if (modelExists.length) {
        await db.dropCollection(collectionName);
    }

}
