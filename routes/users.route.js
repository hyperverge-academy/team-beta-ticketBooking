const express = require('express');
// const verifyToken = require('../models/token.model')
const userController = require('../controllers/users.controller');
const tokensMiddleware = require('../middlewares/token.middleware')

const router = express.Router();

// const { bookingValidationSchema, userRegistrationValidationSchema, loginValidationSchema } = require('../middlewares/validationsSchema'); 

const { bookingValidationSchema , userRegistrationValidationSchema , loginValidationSchema} = require('../middlewares/user.middleware')

router.post('/users/:userId/bookings', tokensMiddleware.verifyTokenRequest, bookingValidationSchema ,userController.bookTicket);
router.post('/users/registration', userRegistrationValidationSchema, userController.registerUser);
router.post('/users/login', loginValidationSchema, userController.loginUser);
// router.get('/users/:id/bookings', getAllBookingSchema. userController.getBookings);

module.exports = router;