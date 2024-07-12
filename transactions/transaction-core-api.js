const {client} = require('../db/db');
const {v4: uuidv4} = require("uuid");


async function transaction(client) {
    const session = client.startSession();
    try {
        // Start transaction
        session.startTransaction();

        // Update document in accounts collection
        const accountsColl = client.db("bank").collection("accounts");
        await accountsColl.findOneAndUpdate(
            {
                id: "UUS3434ODPS"
            },
            {
                $inc: {balance: 100}
            });

        // Add new document to transactions collection
        const transactionsColl = client.db("bank").collection("transactions");
        await transactionsColl.insertOne(
            {
                id: uuidv4(),
                amount: 100
            }
        );

        // Commit transaction
        await session.commitTransaction();
        console.log("Transaction committed.");
    } catch (error) {
        console.log("An error occurred during the transaction:" + error);
        await session.abortTransaction();
    } finally {
        await session.endSession();
    }
}

const main = async () => {
    await transaction(client);

};
main()