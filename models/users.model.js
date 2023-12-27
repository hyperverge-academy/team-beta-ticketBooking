const { MongoClient } = require("mongodb");
const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");

// TODO:: Make a function and call from method
let collection ;
const client = new MongoClient(dbconst.uri);
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

    if(documents.length >= 1){
      return resConst.loginDataExist;
    }
    else {
      const result = await collection.insertOne(convertRegisterData);
      return resConst.registerMessage;
    }
  } catch (error) {
    console.error("Error inserting document:", error);
    return resConst.internalServerError;
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
    return resConst.internalServerError
  }
}
const saveBooking = async (bookingData) => {
  const client = new MongoClient(uri);
    try {
        const database = client.db(dbconst.dbName);
        const bookings = database.collection(dbconst.bookingCollection);
        console.log('Booking saved:', bookingData);
        const result = await bookings.insertOne(bookingData);
        return resConst.saveBookingMessage;

    } catch (error) {
        console.error('Error saving booking:', error);
    }
    finally {
      await client.close()
    }
}

const getAllBookings = async (userId) => {
    const client = new MongoClient(dbconst.uri);
    try {
        const database = client.db(dbconst.dbName);
        const bookingsCollection = database.collection(dbconst.bookingCollection);
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
        return resConst.internalServerError
    } 
    finally {
        await client.close();
    }
};

module.exports = { getAllBookings , saveBooking, saveUserInDB , loginPost};

