const jwt = require('jsonwebtoken')
const asyncErrorHandler = require('express-async-handler')
const User = require('../models/userModel')
const { JWT_SECRET } = process.env

// Middleware for protected routes
const protectRoutes = asyncErrorHandler(async (req, res, next) => {
  let token = req.headers.authorization

  // if the token exists and starts with Bearer
  if (token && token.startsWith('Bearer')) {
    try {
      // remove 'Bearer ' from token and decode it
      const tokenSplit = token.split(' ')[1]
      const decoded = jwt.verify(tokenSplit, JWT_SECRET)
      /* get the user from database using decoded id and assign that info (excluding password) to req.user
         (req.user will be accessible in all protected routes) */
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } 

  if (!token) {
    res.status(401)
    throw new Error('Not autorized, no token')
  }
})

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const { user } = req
  if (user && user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized. Must be an admin.')
  }
}

module.exports = { protectRoutes, isAdmin } 