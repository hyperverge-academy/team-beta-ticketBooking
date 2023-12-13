const { MongoClient } = require("mongodb");


const url = "mongodb://localhost:27017";
const dbName = "busData";

let collection;
async function main() {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to database");
  const db = client.db(dbName);
  collection = db.collection("registration");
}
main();

const postResponse = async function (data) {
  try {
    const info = collection.find({});
    const documents = await info.toArray();
    let arrayData = [];
    for (let doc of documents) {
      arrayData.push(doc.mobileNumber);
      arrayData.push(doc.password);
    }
    if (
      arrayData.includes(data.password) &&
      arrayData.includes(data.mobileNumber)
    ) {
      return "This data is already exists";
    } else {
      const result = await collection.insertOne(data);
      return { result, massage: "Registration successfull" };
    }
  } catch (error) {
    console.error("Error inserting document:", error);
    return error;
  }
};



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

module.exports = { saveBooking , postResponse};
