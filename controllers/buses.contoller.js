const busService = require('../services/buses.services')

const busDetails = async function (req, res) {
    const sendBody = req.body
    const sendData = await busService.validateInsertBusDetails(sendBody)
    res.send(sendData)
}

module.exports = { busDetails }