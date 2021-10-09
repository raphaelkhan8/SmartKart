const asyncErrorHandler = require('express-async-handler')
const Order = require('../models/orderModel')


// Create new order
const createOrder = asyncErrorHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice,
			user: req.user._id
    })

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
  }
})


module.exports = { createOrder }