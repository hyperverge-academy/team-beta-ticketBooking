
const  userModel  = require('../models/users.model');
const resconst = require('../constants/response.constants');

const registrationPostService = async function (data) {
    return await userModel.postResponse(data);
};
   
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
        return resconst.busArrival_dataTimeError;
    }

    if (new Date (bookingData.departure_dateTime) < new Date()) {
        return resconst.busDeparture_dateTimeError;
    }

    if (!bookingData.price || bookingData.price > 10000) {
        return resconst.busTicketPrice_Error;
    }

    const bookingCall = await userModel.saveBooking(bookingData);
    return bookingCall;
};

module.exports = { validateBookingData , registrationPostService };
