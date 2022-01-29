const express = require('express')
const router = express.Router()
const { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } = require('../controllers/productController')
const { protectRoutes, isAdmin } = require('../middleware/authMiddleware')


router.get('/', getProducts)
router.post('/', protectRoutes, isAdmin, createProduct)
router.get('/:id', getProductById)
router.delete('/:id', protectRoutes, isAdmin, deleteProduct)
router.put('/:id', protectRoutes, isAdmin, updateProduct)
router.post('/:id/reviews', protectRoutes, createProductReview)

module.exports = router