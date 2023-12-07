const express = require('express');
const healthControllers = require('../controllers/health.controller')

const router = express.Router();

router.get('/health',healthControllers.get)

module.exports = router