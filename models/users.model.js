const { MongoClient } = require("mongodb");
const dbConst = require('../constants/db.constants')
const respConst = require('../constants/resp.constants')
const uri = "mongodb://localhost:27017";

const saveBooking = async (bookingData) => {
  const client = new MongoClient(uri);
    try {
        const database = client.db("busBookings");
        const bookings = database.collection("bookings");
        console.log('Booking saved:', bookingData);
        const result = await bookings.insertOne(bookingData);

        let modelObject = {'Message':'Group Beta Suceessfully Booked Ticket'};
        return modelObject;

    } catch (error) {
        console.error('Error saving booking:', error);
    }
    finally {
      await client.close()
    }
}

const getAllBookings = async (userId) => {
    const client = new MongoClient(dbConst.uri);
    try {
        const database = client.db(dbConst.dbName);
        const bookingsCollection = database.collection(dbConst.busCollection);
        const query = {userId:userId}

        const allBookings = await bookingsCollection.find(query);
        if ((await bookingsCollection.countDocuments(query))===0){
          return { message: 'No bookings found for the specified user.' };
        }
        const bookingsArray = []
        for await(const doc of allBookings){
          bookingsArray.push(doc)        
        }
        return bookingsArray;        
    }
    catch (error) {
        console.error('Error retrieving bookings:', error);
        return respConst.internalServerError
    } 
    finally {
        await client.close();
    }
};

module.exports = { getAllBookings , saveBooking};
