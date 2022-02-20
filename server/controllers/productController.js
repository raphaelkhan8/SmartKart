const asyncErrorHandler = require('express-async-handler')
const Product = require('../models/productModel')
const Order = require('../models/orderModel')

// Get all products (or a specific product if keyword is not an empty string)
const getProducts = asyncErrorHandler(async (req, res) => {
  // pageSize will be used for pagination 
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    /* If keyword exists, set the name property to the keyword to fetch that specific product. 
       Using regex to match substrings with axtual name (ex. iph will still match with iphone).
       Passing in i to options for case-insensitive search */
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  // else, pass-in an empty object to get all products
  } : {}

  // Get the total number of products coming back from database
  const productCount = await Product.countDocuments({ ...keyword })
  // Use .limit to limit the number of Products returned to fit within the pageSize
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

  // Send back the products, page number, and total number of pages
  res.json({ products, page, pages: Math.ceil(productCount / pageSize) })
})


// Get product by id
const getProductById = asyncErrorHandler(async (req, res) => {
  const id = req.params.id
  const foundProduct = await Product.findById(id)
  foundProduct ? res.json(foundProduct) : res.status(404).json({ message: 'Product Not Found'})
})


// Delete product (need admin credentials)
const deleteProduct = asyncErrorHandler(async (req, res) => {
  const id = req.params.id
  const foundProduct = await Product.findById(id)

  if (foundProduct) {
    await foundProduct.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})


// Create new product (need admin credentials)
const createProduct = asyncErrorHandler(async (req, res) => {
  const newProduct = new Product({
    user: req.user._id,
    name: 'Sample name',
    image: '/images/sample.jpg',
    description: 'Sample description',
    category: 'Sample category',
    brand: 'Sample brand',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  })

  const createdProduct = await newProduct.save()
  res.status(201).json(createdProduct)
})


// Update product (need admin credentials)
const updateProduct = asyncErrorHandler(async (req, res) => {
  const { name, image, description, category, brand, price, countInStock } = req.body

  const foundProduct = await Product.findById(req.params.id)

  if (foundProduct) {
    foundProduct.name = name
    foundProduct.image = image
    foundProduct.description = description
    foundProduct.category = category
    foundProduct.brand = brand
    foundProduct.price = price
    foundProduct.countInStock = countInStock

    const updatedProduct = await foundProduct.save()
    res.status(201).json(updatedProduct)

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// Add review for product (user must have bought product first)
const createProductReview = asyncErrorHandler(async (req, res) => {
  const { rating, comment } = req.body
 
  const foundProduct = await Product.findById(req.params.id)
 
  // Bring in user orders to check if they ordered the product
  const orders = await Order.find({ user: req.user._id })
  
  // Array of product ids that the user ordered
  const ordersItems = [].concat.apply([], orders.map(order => order.orderItems.map(item => item.id.toString())))
 
  if (foundProduct) {
    // Check if the id of the product matches any of the users ordered products
    const hasBought = ordersItems.includes(foundProduct._id.toString())
 
    if(!hasBought) {
      res.status(400)
      throw new Error('You can only review products you bought')
    }
 
    const alreadyReviewed = foundProduct.reviews.find(review => review.user.toString() === req.user._id.toString())
 
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('You have already reviewed this product')
    }
 
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }
 
    foundProduct.reviews.push(review)
    foundProduct.numReviews = foundProduct.reviews.length
    foundProduct.rating = foundProduct.reviews.reduce((acc, item) => item.rating + acc, 0) / foundProduct.reviews.length
 
    await foundProduct.save()
 
    res.status(201).json({ message: 'Review added' })

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// Gets top rate products
const getTopRatedProducts = asyncErrorHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4)
  res.json(products)
})


module.exports = { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopRatedProducts }