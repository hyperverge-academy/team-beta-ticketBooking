const resconst = {
    fieldMissingError : {
        success: false,
        error_code: 'PSE: 1001',
        message: 'Some required fields are missing'
    },
    passengerAgeError :{
            success: false,
            error_code: 'IA:2001',
            message: 'Invalid passenger age. Please provide a valid positive integer age between 1 and 90'
 
    },
    passengerGenderError :  {
        success: false,
        error_code: 'GE:3001',
        message: 'Please Select One Option'
    },
    seatNumberError : {
        success: false,
        error_code: 'SN:4001',
        message: 'Please Book Atleast One Seat'
    },
    busArrivalDataTimeError : {
        success: false,
        error_code: 'BA:5001',
        message: 'Invalid arrival datetime format'
    },
    busDepartureDateTimeError : {
        success: false,
        error_code: 'DDT:6001',
        message: 'Invalid departure datetime format',
    },
    busTicketPriceError : {
        success: false,
        error_code: 'BTP:7001',
        message: 'Invalid price. Please provide a valid price less than or equal to 10000.',
    },
    existDataMessage : {
        success : true,
        statusCode : 200,
        message : "This data is already exists"
    },
    registerMessage :{
        success : true,
        statusCode : 201,
        massage: "Registration successfull"
    },
    saveBookingMessage : {
        success : true,
        statusCode : 201,
        message:'Group Beta Suceessfully Booked Ticket'
    },
    mobileAndPasswordError : {
        success : false,
        statusCode : 400,
        massage : "Mobile number shuold be 10 digit and password len should be 8 digit"
    },
    loginMessage :{
        success : true,
        statusCode : 201,
        massage: "login successfull"
    },
    loginError :{
        success : false,
        statusCode : 401 ,
        massage : "password and mobile number are invalid"
    },
    loginUserNotfound :{
        success : false,
        statusCode : 404 ,
        massage : "user not found"
    }

    
}

module.exports = resconst ;