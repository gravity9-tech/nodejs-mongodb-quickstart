const { MongoClient } = require('mongodb');

const client = new MongoClient(<connection string>);
const dbName = "bank";
const collectionName = "accounts";
const accountsCollection = client.db(dbName).collection(collectionName);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to DB");
    } catch (err) {
        console.log(`Error during connection to DB: ${err}`);
    }
};
module.exports = { connectToDatabase, accountsCollection, client };
