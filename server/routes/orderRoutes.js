const express = require('express')
const router = express.Router()
const protectRoutes = require('../middleware/authMiddleware')
const { createOrder, getOrderById } = require('../controllers/orderController')

router.post('/', protectRoutes, createOrder)
router.get('/:id', protectRoutes, getOrderById)

module.exports = router