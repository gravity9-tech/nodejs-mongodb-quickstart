const { accountsCollection , client} = require('../db/db');

const main = async () => {
    try {
        ///Delete document
        const docToDelete = { holder: "John Random" }

        /* Delete the first document in the "accounts" collection that matches
            the specified query document */
        let deletionResult = await accountsCollection.deleteOne(docToDelete)
        deletionResult.deletedCount === 1 ? console.log('Document deleted') : console.log('Document not deleted');

        /* Delete all documents in the "accounts" collection that matches
            the specified query document */
        let deletionManyResult = await accountsCollection.deleteMany(docToDelete)
        console.log(`${deletionManyResult.deletedCount} documents matched filter and were deleted` )


    } catch (err) {
        console.log(`Error during connection to DB: ${err}`);
    } finally {
        await client.close();
    }
};
main()