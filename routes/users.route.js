const express = require('express');
const userLogin = require('../models/users.model');

const userController = require('../controllers/users.controller');
const router = express.Router();

router.post('/users/:userId/bookings', userController.bookTicket);
router.get('/users/:id/bookings', userController.getBookings);
router.post('/users/registration',userController.registrationPost);
router.post('/users/login',userController.loginController);

module.exports = router;
