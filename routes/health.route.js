const express = require('express');
const health_controllers = require('../controllers/health.controller')

const router = express.Router();

router.get('/health',health_controllers.get)

module.exports = router