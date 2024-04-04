const express = require('express');
const busesControllers = require('../controllers/buses.contoller')

const router = express.Router();

router.post('/buses',busesControllers.busDetails)
router.get('/buses', busesControllers.handleFindAllBusesRequest)

module.exports= router