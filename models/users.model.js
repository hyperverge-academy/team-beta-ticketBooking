const { MongoClient } = require("mongodb");
const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");
const tokenmodel = require('./token.model');
const  serviceConst = require('../constants/service.constants');

let collection ;
const client = new MongoClient(dbconst.uri);
client.connect().then(()=>{
  console.log("Connected successfully to database");
  const db = client.db(dbconst.dbName);
  collection = db.collection(dbconst.userCollection);
  console.log(collection)
})
.catch(err => console.log(err));

const registerAdmin = async function(){
  const client = new MongoClient(dbconst.uri);
  try{
    const db = client.db(dbconst.dbName);
    const collection = db.collection(dbconst.userCollection)
    console.log(serviceConst.adminData.mobileNumber,"1234");
    console.log(collection);
    const findAdminDetails = await collection.findOne({"mobileNumber": serviceConst.adminData.mobileNumber});
    console.log(findAdminDetails , "null")
    if (findAdminDetails){
      console.log(findAdminDetails , "sayali")
      return true
    }else{
      await collection.insertOne(serviceConst.adminData)
      return true
    }
  }
  catch(error){
    console.log("error",error);
    return false;
  }
}

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
    console.log(mobileNumber,password)
    const info =  await collection.findOne({"mobileNumber" : parseInt(mobileNumber)});
    console.log(info)
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
  const client = new MongoClient(dbconst.uri);
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

module.exports = { getAllBookings , saveBooking, saveUserToDatabase , loginToDatabase,registerAdmin};