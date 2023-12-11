let { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/"

async function insertBusDetails(doc) {
    const client = new MongoClient(uri);
    try {
        const database=client.db('busBookings')
        const collection =database.collection("Buses")

        const result= await collection.insertOne(doc)

        const sendRespons= {
            message:"Your data has successfully been inserted into the database"
        }
        return sendRespons

    } finally {
        await client.close();
    }
}
module.exports ={insertBusDetails}