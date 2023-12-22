const express = require('express');
const bookingController = require('../controllers/users.controller');
const router = express.Router();

router.post('/users/:userId/bookings', bookingController.bookTicket);
router.get('/users/:id/bookings', bookingController.getBookings);

module.exports = router;
