let { MongoClient } = require('mongodb');
const dbConstans = require('../constants/db.constants');
const dbResponse = require('../constants/response.constants')

async function insertBusDetails(allBusDetails) {
    const client = new MongoClient(dbConstans.uri);
    try {
        const database=client.db(dbConstans.dbName);
        const collection =database.collection(dbConstans.collectionsName)

        const inserData= await collection.insertOne(allBusDetails)

        const responsMessage= {
            message:"Your data has successfully been inserted into the database"
        }
        return responsMessage

    } finally {
        await client.close();
    }
}

const dbConstants = require('../constants/db.constants');
const resConstants = require('../constants/response.constants');

async function fetchAllBusesFromDatabase() {
    const client = new MongoClient(dbConstants.uri);

    try {
        const database = client.db(dbConstants.dbName);
        const busCollection = database.collection(dbConstants.collectionsName);
        const query = {};
        const busDetails = await busCollection.find(query).toArray();
        console.log('Query Result:', busDetails);

        if (busDetails.length === 0) {
            console.log('No bookings found for the specified user.'); 
            return resConstants.missingDocument;
        }

        const busesArray = [];
        for (const doc of busDetails) {
            busesArray.push(doc);
        }

        return busesArray;

    } catch (error) {
        console.error("Error fetching bus details: ", error);
        return 'Internal server error.';
    } finally {
        await client.close();
    }
}

module.exports = { insertBusDetails , fetchAllBusesFromDatabase}