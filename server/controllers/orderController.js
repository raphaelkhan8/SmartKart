const asyncErrorHandler = require('express-async-handler')
const Order = require('../models/orderModel')


// Create new order
const createOrder = asyncErrorHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')

  } else {
    const order = new Order({
      user: req.user._id,
      orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
    })

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
  }
})


const getOrderById = asyncErrorHandler(async (req, res) => {
  // get the order by id and attach the corresponding user's name and email to the found object
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


module.exports = { createOrder, getOrderById }