const constResponse = {

    missingFieldsErrorResponse: {
        status: false,
        statusCode: 400,
        data: { message: "please enter all details" }
    },

    invalidSeatsErrorResponse: {
        status: false,
        statusCode: 400,
        data: { message: "Total seats must be a positive number." }
    },

    invalidDaysErrorResponse: {
        status: false,
        statusCode: 400,
        data: { message: "Invalid days. Please provide valid days." }
    },

    invalidDaysArrayErrorResponse: {
        status: false,
        statusCode: 400,
        data: { message: "Invalid days. Please provide an array of valid days." }
    }
};

module.exports= constResponse;