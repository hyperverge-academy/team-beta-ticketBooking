const express = require('express');

const userController = require('../controllers/users.controller');
const router = express.Router();

router.post('/users/registration',userController.registrationPost);

router.post('/user/:userId/bookings', userController.bookTicket);

module.exports = router;


