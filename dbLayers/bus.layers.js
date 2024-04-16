const dbResponse = require('../constants/response.constants');
const databaseConnection = require('../config/db.model');

async function insertBusDetails(allBusDetails) {
    let dbConnection;
    try {
        const busesCollection = process.env.BUS_COLLECTION;
        dbConnection = await databaseConnection();
        const collection = dbConnection.collection(busesCollection);

        const insertData = await collection.insertOne(allBusDetails);
        console.log(insertData);
        return dbResponse.busDetailsSuccessResponse;

    } catch (error) {
        console.error("Error inserting bus details: ", error);
        return dbResponse.internalServerError;
    } 
}

async function fetchAllBusesFromDatabase() {
    let dbConnection;
    try {
        const busCollection = process.env.BUS_COLLECTION;
        dbConnection = await databaseConnection();
        const collection = dbConnection.collection(busCollection);

        const query = {};
        const busDetails = collection.find(query);

        if (await collection.countDocuments(query) === 0) {
            console.log('No bookings found for the specified user.'); 
            return dbResponse.missingDocument;
        }

        const busesArray = [];
        for await (const doc of busDetails) {
            busesArray.push(doc);
        }
        console.log(busesArray);
        return busesArray;

    } catch (error) {
        console.error("Error fetching bus details: ", error);
        return dbResponse.internalServerError;
    }
}

module.exports = { insertBusDetails, fetchAllBusesFromDatabase };
