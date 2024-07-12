const { accountsCollection , client} = require('../db/db');

const main = async () => {
    try {
        const pipeline = [
            //Filters documents where the balance is greater than or equal to 1000.
            {
                $match: {
                    balance: { $gte: 1000 }
                }
            },
            //Sorts the documents by balance in descending order.
            {
                $sort: { balance: -1 }
            },
            //Includes only the id, type, balance, holder, and calculates a new field gbp_balance
            {
                $project: {
                    _id: 0,
                    id: 1,
                    holder: 1,
                    type: 1,
                    balance: 1,
                    gbp_balance: { $multiply: ['$balance', 0.74] } // Assuming conversion rate of 1 USD to 0.74 GBP
                }
            },
            /*Groups the documents by type, calculates the total balance for each account type,
             and creates an array of accounts with their IDs, balances, and GBP balances.*/
            {
                $group: {
                    _id: "$type",
                    total_balance: { $sum: "$balance" },
                    total_gbp_balance: { $sum: "$gbp_balance" }
                }
            }
        ];

        //RESULT
        const results = await accountsCollection.aggregate(pipeline).toArray();

        console.log("Aggregation Results:");
        console.log(results);


    } catch (err) {
        console.log(`Error during aggregation: ${err}`);
    } finally {
        await client.close();
    }
};
main()