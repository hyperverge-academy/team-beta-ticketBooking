const busService = require('../services/buses.services')

const busDetails = async function (req, res) {
    const sendBody = req.body
    const sendData = await busService.validateInsertBusDetails(sendBody)
    res.send(sendData)
}

async function handleFindAllBusesRequest (req, res) {
    const allBusDetails = await busService.getAllBuses()
    res.send(allBusDetails)
}
module.exports = { busDetails , handleFindAllBusesRequest}