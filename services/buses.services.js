const busModels = require('../models/buses.model')

const CheckValidation = function (busData) {
    if (!busData.bus_name || !busData.from || !busData.to || !busData.days || !busData.total_seats || !busData.total_time || !busData.bus_stops) {
        const statusData = {
            status: false,
            statusCode: 404,
            data: { message: "please enter all details" }
        }
        return statusData
    }

    if (isNaN(busData.total_seats) || busData.total_seats<=0) {
        const statusData = {
            status: false,
            statusCode: 404,
            data: { message: "Total seats must be a positive number." }
        };
        return statusData;
    }

    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (let i = 0; i < validDays.length; i++) {
        if (busData.days !== (validDays[i])) {
            const statusData = {
                status: false,
                statusCode: 404,
                data: { message: "Invalid days. Please provide valid days." }
            };
            return statusData;
        }
    }
    if (!Array.isArray(busData.days) || busData.days.length === 0) {
        const statusData = {
            status: false,
            statusCode: 404,
            data: { message: "Invalid days. Please provide an array of valid days." }
        };
        return statusData;
    }

    return busModels.insertBusDetails(busData)
}

module.exports = { CheckValidation }