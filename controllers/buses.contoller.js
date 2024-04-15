const busModel = require('../models/buses.model')

const busDetails = async function (req, res) {
    const sendBody = req.body
    const sendData = await busModel.insertBusDetails(sendBody)
    res.send(sendData)
}

async function handleFindAllBusesRequest (req, res) {
    const allBusDetails = await busModel.getAllBuses()
    res.send(allBusDetails)
}

module.exports = { busDetails , handleFindAllBusesRequest}

