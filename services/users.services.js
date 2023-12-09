const bookingModel = require('../models/users.model');

const validateBookingData = async (bookingData) => {
    if (!bookingData.passenger_name || !bookingData.passenger_age || !bookingData.passenger_gender || !bookingData.bus_id || 
        !bookingData.arrival || !bookingData.departure || !bookingData.From || !bookingData.to || 
        !bookingData.bus_name || !bookingData.date || !bookingData.day || !bookingData.price || 
        !bookingData.Seat_number) {
        const validationError = { success: false,
             error_code: 'PSE: 1001',
             message: 'Some required fields are missing'
             }
             return validationError
    }
    const bookingCall = await bookingModel.saveBooking(bookingData)
    return bookingCall

};

module.exports = { validateBookingData };


