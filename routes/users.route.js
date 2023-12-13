const express = require('express');

const userController = require('../controllers/users.controller');
const router = express.Router();

router.post('/users/registration',userController.post);

const bookingController = require('../controllers/users.controller');

router.post('/user/:userId/bookings', bookingController.bookTicket);

module.exports = router;


