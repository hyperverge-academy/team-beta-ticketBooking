const resconst = {
    fieldMissingError : {
        success: false,
        error_code: 'PSE: 1001',
        message: 'Some required fields are missing'
    },
    passengerAgeError :{
            success: false,
            error_code: 'PSE: 1001',
            message: 'Invalid passenger age. Please provide a valid positive integer age between 1 and 90'
 
    },
    passengerGenderError :  {
        success: false,
        error_code: 'PSE: 1001',
        message: 'Please Select One Option'
    },
    seatNumberError : {
        success: false,
        error_code: 'PSE: 1001',
        message: 'Please Book Atleast One Seat'
    },
    busArrival_dataTimeError : {
        success: false,
        error_code: 'PSE: 1010',
        message: 'Invalid arrival datetime format'
    },
    busDeparture_dateTimeError : {
        success: false,
        error_code: 'PSE: 1011',
        message: 'Invalid departure datetime format',
    },
    busTicketPrice_Error : {
        success: false,
        error_code: 'PSE: 1009',
        message: 'Invalid price. Please provide a valid price less than or equal to 10000.',
    },
    existDataMessage : {
        message : "This data is already exists"
    },
    registerMessage :{
        massage: "Registration successfull"
    },
    saveBookingMessage : {
        message:'Group Beta Suceessfully Booked Ticket'
    }
}

module.exports = resconst ;