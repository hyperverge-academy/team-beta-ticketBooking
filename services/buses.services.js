const busModels = require('../models/buses.model')

const CheckValidation = function (busData) {
    if (!busData.bus_name || !busData.from || !busData.to || !busData.days || !busData.total_seats || !busData.total_time || !busData.bus_stops) {
        const statusData = {
            status: false,
            statusCode: 404,
            data: {message:"please enter all details"}
        }
        return statusData
    }
    return busModels.insertBusDetails(busData)
}

module.exports = { CheckValidation }