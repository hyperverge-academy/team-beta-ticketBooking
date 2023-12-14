const { MongoClient } = require("mongodb");
const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");

let collection;
async function main() {
  const client = new MongoClient(dbconst.url);
  await client.connect();
  console.log("Connected successfully to database");
  const db = client.db(dbconst.dbName);
  collection = db.collection(dbconst.userCollection);
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
      return resConst.existDataMessage.message;
    } else {
      const result = await collection.insertOne(data);
      return resConst.registerMessage.massage;
    }
  } catch (error) {
    console.error("Error inserting document:", error);
    return error;
  }
};



const saveBooking = async (bookingData) => {
  const client = new MongoClient(uri);
    try {
        const database = client.db(dbconst.dbName);
        const bookings = database.collection(dbconst.bookingCollection);
        console.log('Booking saved:', bookingData);
        const result = await bookings.insertOne(bookingData);
        return resConst.saveBookingMessage.message;

    } catch (error) {
        console.error('Error saving booking:', error);
    }
    finally {
      await client.close()
    }
}

module.exports = { saveBooking , postResponse};
