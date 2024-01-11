const resconst = {
    fieldMissingError: {
        success: false,
        errorCode: 'PSE: 1001',
        message: 'Some required fields are missing'
    },
    passengerAgeError: {
        success: false,
        errorCode: 'IA:2001',
        message: 'Invalid passenger age. Please provide a valid positive integer age between 1 and 90'

    },
    passengerGenderError: {
        success: false,
        errorCode: 'GE:3001',
        message: 'Please Select One Option'
    },
    seatNumberError: {
        success: false,
        errorCode: 'SN:4001',
        message: 'Please Book Atleast One Seat'
    },
    busArrivalDataTimeError: {
        success: false,
        errorCode: 'BA:5001',
        message: 'Invalid arrival datetime format'
    },
    busDepartureDateTimeError: {
        success: false,
        errorCode: 'DDT:6001',
        message: 'Invalid departure datetime format',
    },
    busTicketPriceError: {
        success: false,
        errorCode: 'BTP:7001',
        message: 'Invalid price. Please provide a valid price less than or equal to 10000.',
    },
    existDataMessage: {
        success: true,
        errorCode: 200,
        message: "This data is already exists"
    },
    registerMessage: {
        success: true,
        errorCode: 200,
        message: "Registration successful"
    },
    registerError : {
        success: false,
        errorCode: 409, 
        message: "User is already registered"
    },
    saveBookingMessage: {
        success: true,
        errorCode: 201,
        message: 'Group Beta Suceessfully Booked Ticket'
    },
    mobileAndPasswordError: {
        success: false,
        errorCode: 400,
        message: "Mobile number shuold be 10 digit and password len should be 8 digit"
    },
    loginMessage: {
        success: true,
        errorCode: 200,
        message: "login successful"
    },
    loginError: {
        success: false,
        errorCode: 401,
        message: "password and mobile number are invalid"
    },
    loginUserNotfound: {
        success: false,
        errorCode: 204,
        message: "user not found"
    },
    internalServerError: {
        success: "false",
        errorCode: 500,
        message: "Interval server error. We are looking into this."
    },
    loginDataExist: {
        success: true,
        errorCode: 400,
        message: "you have already logged in"
    },

    internalServerError: {
        success: false,
        errorCode: 500,
        message: "Internal Server Error. we are looking into this server"
    },

    documentMissing:{
        success: false,
        errorCode: 204,
        message: "No bookings found for the specified user"
    },
    passwordNotMatch :{
        suceess:false,
        message:'Passwords do not match',
        errorCode: 400
    }
}

module.exports = resconst;