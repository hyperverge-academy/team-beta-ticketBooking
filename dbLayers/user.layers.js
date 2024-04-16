const dbconst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");
const tokenmodel = require('../models/token.model');
const dbConnections = require("../config/db.model");

const registerAdmin = async function(){
  
  try{
    const userCollection = process.env.USER_COLLECTION
    const adminData = JSON.parse(process.env.ADMIN_DATA)

    const dbConnection = await dbConnections()
    const collection = dbConnection.collection(userCollection)
  
    const findAdminDetails = await collection.findOne({"mobileNumber": adminData.mobileNumber});
    console.log(findAdminDetails , "null")

    if (findAdminDetails){
      console.log(findAdminDetails , "sayali")
      return true;
    }
    else{
      await collection.insertOne(adminData)
      return true;
    }
  }
  catch(error){
    console.log("error",error);
    return false;
  }
}

const saveBooking = async (bookingData) => {
    try {
        const bookingsCollection = process.env.BOOKING_COLLECTION
        const dbConnection = await dbConnections()
        const bookings = dbConnection.collection(bookingsCollection);
        console.log('Booking saved:', bookingData);

        const result = await bookings.insertOne(bookingData);
        console.log(`Document inserted ${result.insertedId}`);

        return resConst.saveBookingMessage;

    } catch (error) {
        console.error('Error saving booking:', error);
    }
    finally {
      
    }
}

const saveUserToDatabase = async function (userData) {
  try {

    const usersCollection = process.env.USER_COLLECTION
    const dbConnection = await dbConnections()


    const convertRegisterData = {
      fullName: userData.fullName,
      mobileNumber : parseInt(userData.mobileNumber),
      password : userData.password,
      confirmPassword : userData.confirmPassword,
      role:"user"
    }
    console.log(convertRegisterData);

    const collection = dbConnection.collection(usersCollection)
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

    const userCollection = process.env.USER_COLLECTION

    const dbConnection = await dbConnections()
    const collection = dbConnection.collection(userCollection)
    
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

const getAllBookings = async (userId) => {

    try {
        
        const bookingsCollection = process.env.BOOKING_COLLECTION
        const dbConnection = await dbConnections()
        const collection = dbConnection.collection(bookingsCollection)
        
        const query = {userId:userId}

        const allBookings = collection.find(query);

        if ((await collection.countDocuments(query))===0){
          return resConst.documentMissing
        }
        const bookingsArray = []
        for await(const doc of allBookings){
          bookingsArray.push(doc)        
        }
        console.log(bookingsArray)
        return bookingsArray;        
    }
    catch (error) {
        console.error('Error retrieving bookings:', error);
        return resConst.internalServerError
    } 
    finally {
        
    }
};

module.exports = { saveBooking, saveUserToDatabase , loginToDatabase,registerAdmin};