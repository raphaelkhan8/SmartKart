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


// Get an order by id
const getOrderById = asyncErrorHandler(async (req, res) => {
  // find the order by id and attach the corresponding user's name and email to the found object
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


// Set order to paid
const updateOrderToPaid = asyncErrorHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    // order.paymentResult values comes from Paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updateOrder = await order.save()

    res.json(updateOrder)

  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


// Get a logged-in user's orders
const getUserOrders = asyncErrorHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})


module.exports = { createOrder, getOrderById, updateOrderToPaid, getUserOrders }