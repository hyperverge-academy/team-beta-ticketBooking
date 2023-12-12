const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();

router.post('/users/registration',userController.post);

module.exports = router;