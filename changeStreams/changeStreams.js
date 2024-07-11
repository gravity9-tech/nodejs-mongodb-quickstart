const { accountsCollection , client} = require('../db/db');
const stream = require('stream');

// Function to close stream after certain amount of time.
function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            resolve(changeStream.close());
        }, timeInMs)
    });
}


const pipeline = [
    //Filters documents where the balance is greater than or equal to 1000.
    {
        $match: {
            operationType: 'insert',
            'fullDocument.balance': {$gt: 1000}
        }
    }
]


// Change stream function.
async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []) {

    // Creation of change stream
    const changeStream = accountsCollection.watch(pipeline);

    /* Here we monitor our change stream. ChangeStream's stream() will return a Node Readable stream.
    Pipe() is called to pull the data out of the stream and write it to the console.*/
    changeStream.stream().pipe(
        new stream.Writable({
            objectMode: true,
            write: function (doc, _, cb) {
                console.log(doc);
                cb();
            }
        })
    );


    // Close stream
    await closeChangeStream(timeInMs, changeStream);
}

const main = async () => {
    try {
        await monitorListingsUsingEventEmitter(client, 30000, pipeline);
    } catch (err) {
        console.log(`Error DB: ${err}`);
    } finally {
        await client.close();
    }
};
main()