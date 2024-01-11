const { MongoClient } = require("mongodb");
const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");
const tokenmodel = require('./token.model')

let collection ;
const client = new MongoClient(dbconst.uri);
client.connect().then(()=>{
  console.log("Connected successfully to database");
  const db = client.db(dbconst.dbName);
  collection = db.collection(dbconst.userCollection);
})
.catch(err => console.log(err));

const saveUserToDatabase = async function (userData) {
  try {
    const convertRegisterData = {
      fullName: userData.fullName,
      mobileNumber : parseInt(userData.mobileNumber),
      password : userData.password,
      confirmPassword : userData.confirmPassword,
      role:"user"
    }
    console.log(convertRegisterData);

    const info = await collection.find({ "mobileNumber" : parseInt(userData.mobileNumber) });
    const documents = await info.toArray();  

    if(documents.length >= 1){
      return resConst.registerError;
    }

    if (userData.password !== userData.confirmPassword) {
      return resConst.passwordNotMatch;
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

const loginToDatabase = async (loginData) => {
  try {
    const {mobileNumber, password} = loginData;
    const info =  await collection.findOne({"mobileNumber" : parseInt(mobileNumber)});
    if (!info){
      return resConst.loginUserNotfound;
    }
    if(info.password === password) {
      const tokenData = {
        mobileNumber : loginData.mobileNumber,
        role: info.role
      }
      console.log(tokenData);
      return tokenmodel.generateToken(tokenData)
    }
    else  {
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
          return resConst.documentMissing
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

module.exports = { getAllBookings , saveBooking, saveUserToDatabase , loginToDatabase};