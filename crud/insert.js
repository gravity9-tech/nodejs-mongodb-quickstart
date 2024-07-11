const { accountsCollection , client} = require('../db/db');

//Document to add
const account = {
    holder: "John Random",
    id: "UUS3434ODPS",
    type: "Private",
    balance: 1323.23
}
//Array of documents to add
const accounts = [{
    holder: "Michael Random",
    id: "UGGF3423ODPS",
    type: "Private",
    balance: 123.23
}, {
    holder: "Mick Happy",
    id: "UGGF3423OGGDS",
    type: "Private",
    balance: 1000
}]

const main = async () => {
    try {
        // Execute insert operation of one document and log result
        let resultOneInserted = await accountsCollection.insertOne(account);
        console.log(`Inserted: ${resultOneInserted.insertedId}`);


        // Prevent additional documents from being inserted if one fails
        const options = { ordered: true };

        // Execute insert operation of many documents and log result
        let resultManyInserted = await accountsCollection.insertMany(accounts, options);
        console.log(`Inserted: ${resultManyInserted.insertedCount} documents.`);

    } catch (err) {
        console.log(`Error during connection to DB: ${err}`);
    } finally {
        // Close connection
        await client.close();
    }
};

main()