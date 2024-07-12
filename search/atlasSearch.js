const { accountsCollection , client} = require('../db/db');

const main = async () => {
    try {
        const pipeline = [
            //Search accounts documents to find "Private" String. Use dynamic mapping index to index all fields
            {
                $search: {
                    index: "dynamic_index_accounts",
                    text: {
                        query: "Private",
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            }
        ];

        const pipelineStatic = [
            //Search accounts documents to find "Private" String. Use static mapping index to index only certain fields.
            {
                $search: {
                    index: "static_index_accounts",
                    text: {
                        query: "Private",
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            }
        ];



        //RESULT
        const results = await accountsCollection.aggregate(pipeline).toArray();
        const resultsStatic = await accountsCollection.aggregate(pipelineStatic).toArray();

        console.log("Dynamic Search aggregation Results:");
        console.log(results);

        console.log("Static Search aggregation Results:");
        console.log(resultsStatic);


    } catch (err) {
        console.log(`Error during search: ${err}`);
    } finally {
        await client.close();
    }
};
main()