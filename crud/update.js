const { accountsCollection , client} = require('../db/db');

const main = async () => {
    try {
        // Create a filter for account with the holder "John Random"
        const docToUpdate = { holder: "John Random" }

        // Specify the update to increment balance
        const update = {$inc: {balance: 100}};

        // Set the upsert option to insert a document if no documents match the filter
        const options = { upsert: true };


        let updateResult = await accountsCollection.updateOne(docToUpdate, update, options);
        console.log(`${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`);

        let updateManyResult = await accountsCollection.updateMany(docToUpdate, update, options);
        console.log(`${updateManyResult.matchedCount} document(s) matched the filter, updated ${updateManyResult.modifiedCount} document(s)`);


    } catch (err) {
        console.log(`Error during connection to DB: ${err}`);
    } finally {
        await client.close();
    }
};
main()