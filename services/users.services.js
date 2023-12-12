const bookingModel = require('../models/users.model');

const validateBookingData = async (bookingData) => {
    if (!bookingData.passenger_name || !bookingData.passenger_age || !bookingData.passenger_gender || !bookingData.bus_id || 
        !bookingData.arrival_dateTime || !bookingData.departure_dateTime || !bookingData.from || !bookingData.to || 
        !bookingData.bus_name || !bookingData.price || 
        !bookingData.seat_number) {
        const validationError = {
            success: false,
            error_code: 'PSE: 1001',
            message: 'Some required fields are missing'
        };
        return validationError;
    }

    if (bookingData.passenger_age <= 0 || bookingData.passenger_age >= 90
        ) {
        const validationError = {
            success: false,
            error_code: 'PSE: 1001',
            message: 'Invalid passenger age. Please provide a valid positive integer age between 1 and 90'
        };
        return validationError;
    }

    if (!bookingData.passenger_gender == "Female" || !bookingData.passenger_gender == "Male" || !bookingData.passenger_gender == "Others") {
        const validationError = {
            success: false,
            error_code: 'PSE: 1001',
            message: 'Please Select One Option'
        };
        return validationError;
    }

    if (bookingData.seat_number <= 0) {
        const validationError = {
            success: false,
            error_code: 'PSE: 1001',
            message: 'Please Book Atleast One Seat'
        };
        return validationError;
    }

    if ((bookingData.arrival_dataTime)) {
        return {
            success: false,
            error_code: 'PSE: 1010',
            message: 'Invalid arrival datetime format',
        };
    }

    if (new Date (bookingData.departure_dateTime) < new Date()) {
        return {
            success: false,
            error_code: 'PSE: 1011',
            message: 'Invalid departure datetime format',
        };
    }

    if (!bookingData.price || bookingData.price > 10000) {
        return {
            success: false,
            error_code: 'PSE: 1009',
            message: 'Invalid price. Please provide a valid price less than or equal to 10000.',
        };
    }

    const bookingCall = await bookingModel.saveBooking(bookingData);
    return bookingCall;
};

module.exports = { validateBookingData };
