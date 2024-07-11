const {client} = require('../db/db');
const {v4: uuidv4} = require("uuid");


async function transaction(client) {
    let txnRes = await client.withSession(async (session) =>
        session.withTransaction(async (session) => {
            const accountsColl = client.db("bank").collection("accounts");
            await accountsColl.findOneAndUpdate({
                    id: "UUS3434ODPS"
                },
                {
                    $inc: {balance: 100}
                });

            const transactionsColl = client.db("bank").collection("transactions");
            await transactionsColl.insertOne(
                {
                    id: uuidv4(),
                    amount: 100
                }
            );

            return "Transaction committed.";
        }, null)
    );
    console.log(txnRes);
}

const main = async () => {
    await transaction(client);
};
main()