const express = require('express');
const router = express.Router();
const busesControllers = require('../controllers/buses.contoller');
const { verifyTokenRequest } = require('../middlewares/token.middleware'); 
const { busesValidationSchema } = require('../middlewares/bus.middleware');

router.post('/buses', verifyTokenRequest, busesValidationSchema, busesControllers.busDetails);
// router.get('/:userId/busesAll', verifyTokenRequest, busesControllers.handleFindAllBusesRequest); 

module.exports = router;
