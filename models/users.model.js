const { MongoClient } = require("mongodb");
const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");

let collection;
async function connectDb() {
  const client = new MongoClient(dbconst.url);
  await client.connect();
  console.log("Connected successfully to database");
  const db = client.db(dbconst.dbName);
  collection = db.collection(dbconst.userCollection);
}

const registerPostResponse = async function (data) {
  try {
    const convertRegisterData = {
      mobileNumber : parseInt(data.mobileNumber),
      password : data.password
    }
    const info = collection.find({});
    const documents = await info.toArray();
    let registerData = [];
    for (let doc of documents) {
       registerData.push(doc.mobileNumber);
       registerData.push(doc.password);
    }
    if (
       registerData.includes(data.password) &&
       registerData.includes(data.mobileNumber)
    ) {
      return resConst.existDataMessage.message;
    } else {
      const result = await collection.insertOne(convertRegisterData);
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

connectDb();

module.exports = { saveBooking , registerPostResponse};
