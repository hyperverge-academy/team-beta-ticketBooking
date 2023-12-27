const express = require('express');

const userController = require('../controllers/users.controller');
const userLogin = require('../models/users.model');
const router = express.Router();

router.post('/users/registration',userController.registrationPost);
router.post('/users/login',userController.loginController);
router.post('/user/:userId/bookings', userController.bookTicket);

module.exports = router;