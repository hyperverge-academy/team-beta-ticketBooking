const dbResponse = require('../constants/response.constants')
const databaseConnection = require('./db.model');

async function insertBusDetails(allBusDetails) {

    try {
        const busesCollection = process.env.BUS_COLLECTION 
        const dbConnection = await databaseConnection()
        const collection = dbConnection.collection(busesCollection)

        const inserData= await collection.insertOne(allBusDetails)
        console.log(inserData)
        return dbResponse.busDetailsSuccessResponse;

    } finally {
        
    }
}

async function fetchAllBusesFromDatabase() {

    try {
        const busCollection = process.env.BUS_COLLECTION
        const dbConnection = await databaseConnection()
        const collection = dbConnection.collection(busCollection)

        const query = {};
        const busDetails = collection.find(query);
        // console.log('Query Result:', busDetails);

        if (await collection.countDocuments(query) === 0) {
            console.log('No bookings found for the specified user.'); 
            return resConstants.missingDocument;
        }

        const busesArray = [];
        for await(const doc of busDetails) {
            busesArray.push(doc);
        }
        console.log(busesArray)
        return busesArray;

    } catch (error) {
        console.error("Error fetching bus details: ", error);
        return dbResponse.internalServerError
    } finally {
        // await client.close();
    }
}

module.exports = { insertBusDetails , fetchAllBusesFromDatabase}