const { MongoClient } = require("mongodb");
const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");

let collection ;
const client = new MongoClient(dbconst.url);
client.connect().then(()=>{
  console.log("Connected successfully to database");
  const db = client.db(dbconst.dbName);
  collection = db.collection(dbconst.userCollection);
})
.catch(err => console.log(err));

const saveUserInDB = async function (data) {
  try {
    const convertRegisterData = {
      mobileNumber : parseInt(data.mobileNumber),
      password : data.password
    }
    const info = collection.find({ "mobileNumber" : parseInt(data.mobileNumber) });
    const documents = await info.toArray();  

    if(documents.length == 1){
      return resConst.existDataMessage.message
    }
    else {
      const result = await collection.insertOne(convertRegisterData);
      return resConst.registerMessage.massage;
    }
  } catch (error) {
    console.error("Error inserting document:", error);
    return error;
  }
};

const loginPost = async (userData) => {
  try {
    const {mobileNumber, password} = userData;
    const info =  await collection.findOne({"mobileNumber" : parseInt(mobileNumber)});
    if (!info){
      return resConst.loginUserNotfound;
    }
    if(info.password === password) {
      return resConst.loginMessage
    }
    else {
      return resConst.loginError
    }
  } catch (error) {
    console.error(" login Error ", error);
    return error
  }
}
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

module.exports = { saveBooking , saveUserInDB , loginPost};