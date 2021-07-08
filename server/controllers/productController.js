const asyncErrorHandler = require('express-async-handler')
const Product = require('../models/productModel')


// Get all products
const getProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// Get product by id
const getProductById = asyncErrorHandler(async (req, res) => {
  const id = req.params.id
  const foundProduct = await Product.findById(id)
  foundProduct ? res.json(foundProduct) : res.status(404).json({ message: 'Product Not Found'})
})


module.exports = { getProducts, getProductById }