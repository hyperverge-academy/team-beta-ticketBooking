const busModels = require('../models/buses.model');

const constResponse = require('../constants/response.constants');

const validateInsertBusDetails = function (busData) {
    if (!busData.bus_name || !busData.from || !busData.to || !busData.days || !busData.total_seats || !busData.total_time || !busData.bus_stops) {

        return constResponse.missingFieldsErrorResponse;
    }

    if (isNaN(busData.total_seats) || busData.total_seats <= 0) {

        return constResponse.invalidSeatsErrorResponse;
    }

    if (!Array.isArray(busData.days) || busData.days.length === 0) {

        return constResponse.invalidDaysArrayErrorResponse;
    }

    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (let i = 0; i < busData.days.length; i++) {
        if (!validDays.includes(busData.days[i])) {
            return constResponse.invalidDaysErrorResponse;
        }        
    }
    return busModels.insertBusDetails(busData)
}

async function getAllBuses() {
    return busModels.fetchAllBusesFromDatabase();
}

module.exports = { validateInsertBusDetails , getAllBuses }