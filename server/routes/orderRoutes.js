const express = require('express')
const router = express.Router()
const protectRoutes = require('../middleware/authMiddleware')
const { createOrder } = require('../controllers/orderController')

router.post('/', protectRoutes, createOrder)

module.exports = router