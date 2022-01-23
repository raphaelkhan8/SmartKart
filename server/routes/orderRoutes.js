const express = require('express')
const router = express.Router()
const { protectRoutes, isAdmin } = require('../middleware/authMiddleware')
const { createOrder, getOrderById, updateOrderToPaid, getUserOrders, getAllOrders, updateOrderToOutForDelivery } = require('../controllers/orderController')

router.get('/', protectRoutes, isAdmin, getAllOrders)
router.post('/', protectRoutes, createOrder)
router.get('/myorders', protectRoutes, getUserOrders)
router.get('/:id', protectRoutes, getOrderById)
router.put('/:id/pay', protectRoutes, updateOrderToPaid)
router.put('/:id/deliver', protectRoutes, isAdmin, updateOrderToOutForDelivery)

module.exports = router