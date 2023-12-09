const express = require('express');
const bookingController = require('../controllers/users.controller');

const router = express.Router();

router.post('/user/:userId/bookings', bookingController.bookTicket);

module.exports = router;


