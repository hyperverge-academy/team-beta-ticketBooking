const  userModel  = require('../models/users.model');
const resconst = require('../constants/response.constants');

const registerUserService = async function (registerData) {
    if (!registerData.fullName || !registerData.mobileNumber || !registerData.password || !registerData.confirmPassword){
        return resconst.fieldMissingError;
    }
    if (registerData.mobileNumber.length !== 10 && registerData.password.length !== 8 && registerData.confirmPassword.lengh !== 8) {
        return resconst.mobileAndPasswordError;
    }
    return await userModel.saveUserToDatabase(registerData);
};

const loginUserService= async function (loginData){
    if (!loginData.mobileNumber || !loginData.password){
        return resconst.fieldMissingError;
    }
    if (loginData.mobileNumber.length !== 10 && loginData.password.lengh !== 8){
        return resconst.mobileAndPasswordError;
    }
    return await userModel.loginToDatabase(loginData);
}

const validateBookingData = async (bookingData) => {
    if (!bookingData.passenger_name || !bookingData.passenger_age || !bookingData.passenger_gender || !bookingData.bus_id || 
        !bookingData.arrival_dateTime || !bookingData.departure_dateTime || !bookingData.from || !bookingData.to || 
        !bookingData.bus_name || !bookingData.price || 
        !bookingData.seat_number) {      
        return resconst.fieldMissingError;
    }

    if (bookingData.passenger_age <= 0 || bookingData.passenger_age >= 90
        ) {
        return resconst.passengerAgeError;
    }

    if (!bookingData.passenger_gender == "Female" || !bookingData.passenger_gender == "Male" || !bookingData.passenger_gender == "Others") {
        return resconst.passengerGenderError;
    }

    if (bookingData.seat_number <= 0) {
        return resconst.seatNumberError;
    }

    if ((bookingData.arrival_dataTime)) {
        return resconst.busArrivalDataTimeError;
    }

    if (new Date (bookingData.departure_dateTime) < new Date()) {
        return resconst.busDepartureDateTimeError;
    }

    if (!bookingData.price || bookingData.price > 10000) {
        return resconst.busTicketPriceError;
    }

    const bookingCall = await userModel.saveBooking(bookingData);
    return bookingCall;
};

const getUserBookings = async (userId) => {
   
    const booking = await userModel.getAllBookings(userId)
    return booking
}

module.exports = { getUserBookings, validateBookingData , registerUserService , loginUserService};
