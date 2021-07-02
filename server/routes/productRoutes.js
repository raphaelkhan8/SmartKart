const express = require('express')
const asyncErrorHandler = require('express-async-handler')
const router = express.Router()
const Product = require('../models/productModel')

// Get all products
router.get('/', asyncErrorHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}))

// Get product by id
router.get('/:id', asyncErrorHandler(async (req, res) => {
  const id = req.params.id
  const foundProduct = await Product.findById(id)
  foundProduct ? res.json(foundProduct) : res.status(404).json({ message: 'Product Not Found'})
}))

module.exports = router