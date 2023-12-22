const { MongoClient } = require("mongodb");
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
    const client = new MongoClient(uri);
    try {
        const database = client.db("busBookings");
        const bookingsCollection = database.collection("bookings");
        const query = {userId:userId}

        const allBookings = await bookingsCollection.find(query);
        if ((await bookingsCollection.countDocuments(query))===0){
        }
        const bookingsArray = []
        for await(const doc of allBookings){
          bookingsArray.push(doc)        
        }
        return bookingsArray;        
    } 
    finally {
        await client.close();
    }
};

module.exports = { getAllBookings , saveBooking};
