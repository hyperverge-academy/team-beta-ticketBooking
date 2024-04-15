const express = require('express');
const router = express.Router();
const busesControllers = require('../controllers/buses.contoller')

const tokensMiddleware = require('../middlewares/token.middleware')
const busesMiddleware = require('../middlewares/bus.middleware');

router.post('/:userId/buses' ,tokensMiddleware.verifyTokenRequest , busesMiddleware.busesValidationSchema , busesControllers.busDetails)
// router.get('/:userId/busesAll', tokensMiddleware.verifyTokenRequest ,busesControllers.handleFindAllBusesRequest)

module.exports = router;