const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const connURL = 'mongodb://localhost:27017';
const dbName = 'msamdb';
const collectionName = 'students';
const oid = mongodb.ObjectID;
module.exports = {
    mongoClient,connURL,dbName, oid
}