const express = require('express')
const router = express.Router()
const protectRoutes = require('../middleware/authMiddleware')
const { createOrder, getOrderById, updateOrderToPaid, getUserOrders } = require('../controllers/orderController')

router.post('/', protectRoutes, createOrder)
router.get('/myorders', protectRoutes, getUserOrders)
router.get('/:id', protectRoutes, getOrderById)
router.put('/:id/pay', protectRoutes, updateOrderToPaid)

module.exports = router