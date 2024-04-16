const express = require('express');
const userController = require('../controllers/users.controller');
const { verifyTokenRequest } = require('../middlewares/token.middleware'); 
const { bookingValidationSchema, userRegistrationValidationSchema, loginValidationSchema } = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/users/:userId/bookings', verifyTokenRequest, bookingValidationSchema, userController.bookTicket);
router.post('/users/registration', userRegistrationValidationSchema, userController.registerUser);
router.post('/users/login', loginValidationSchema, userController.loginUser);

module.exports = router;