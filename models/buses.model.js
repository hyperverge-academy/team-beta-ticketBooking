let { MongoClient } = require('mongodb');
const dbConstans = require('../constants/db.constants');

async function insertBusDetails(allBusDetails) {
    const client = new MongoClient(dbConstans.uri);
    try {
        const database=client.db(dbConstans.dbName);
        const collection =database.collection(dbConstans.collectionsName)

        const inserData= await collection.insertOne(allBusDetails)

        const responsMessage= {
            message:"Your bus is created successfully"
        }
        return responsMessage

    } finally {
        await client.close();
    }
}
module.exports ={insertBusDetails}