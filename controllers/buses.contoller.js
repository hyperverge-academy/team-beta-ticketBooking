const busService = require('../services/buses.services')

const busDetails = async function (req, res) {
    const sendBody = req.body
    const sendData = await busService.CheckValidation(sendBody)
    res.send(sendData)
}

module.exports = { busDetails }