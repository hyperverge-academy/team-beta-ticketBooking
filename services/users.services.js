
const  userModel  = require('../models/users.model');
const resconst = require('../constants/response.constants');


const registrationPostService = async function (data) {
    if (!data.mobileNumber || !data.password){
        return resconst.fieldMissingError;
    }
    if (data.mobileNumber.length !== 10 && data.password.length !== 8 ) {
        return resconst.mobileAndPasswordError;
    }
    return await userModel.registerResponseDB(data);

};



const loginPostService = async function (userData){
    if (!userData.mobileNumber || !userData.password){
        return resconst.fieldMissingError;
    }
    if (userData.mobileNumber.length !== 10 && userData.password.lengh !== 8  ){
        return resconst.mobileAndPasswordError;
    }
    return await userModel.loginPost(userData);
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

module.exports = { validateBookingData , registrationPostService ,loginPostService  };
