const express = require('express')
const router = express.Router()
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController')
const { protectRoutes, isAdmin } = require('../middleware/authMiddleware')


router.get('/', getProducts)
router.get('/:id', getProductById)
router.delete('/:id', protectRoutes, isAdmin, deleteProduct)

module.exports = router