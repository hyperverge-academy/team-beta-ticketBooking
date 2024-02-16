const express = require('express');
const userLogin = require('../models/users.model');
const verifyToken = require('../models/token.model')
const userController = require('../controllers/users.controller');

const router = express.Router();

router.post('/users/:userId/bookings', verifyToken.verifyAuthMiddleware ,userController.bookTicket);
router.get('/users/:id/bookings', userController.getBookings);
router.post('/users/registration',userController.registerUser);
router.post('/users/login',userController.loginUser);

module.exports = router;