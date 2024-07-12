const { ObjectId} = require("mongodb")
const { accountsCollection , client} = require('../db/db');


const main = async () => {
    try {
        const options = {
            // Sort returned documents in ascending order by balance
            sort: { balance: 1 },
            // Include only the `holder` and `balance` fields in each returned document
            projection: { _id: 0, holder: 1, balance: 1 },
        };

        ///Query collection
        let result = accountsCollection.find({balance: {$gt: 1500}}, options)
        console.log("Found documents:")
        for await (const doc of result) {
            console.log(doc);
        }

        //Read only first found document
        let resultOne = await accountsCollection.findOne({_id: new ObjectId("668c399bc90d00061f4959c9")}, options)
        console.log(resultOne);

    } catch (err) {
        console.log(`Error during connection to DB: ${err}`);
    } finally {
        await client.close();
    }
};
main()