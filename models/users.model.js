const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const saveBooking = async (bookingData) => {
  const client = new MongoClient(uri);
    try {
        const database = client.db("busBookings");
        const bookings = database.collection("bookings");
        console.log('Booking saved:', bookingData);
        const result = await bookings.insertOne(bookingData);

        let modelString = {'Message':'Group Beta Suceessfully Booked Ticket'};
        return modelString;

    } catch (error) {
        console.error('Error saving booking:', error);
    }
    finally {
      await client.close()
    }
}

module.exports = { saveBooking };