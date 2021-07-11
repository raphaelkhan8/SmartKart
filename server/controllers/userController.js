const asyncErrorHandler = require('express-async-handler')
const User = require('../models/userModel')


// User Authentication (gets auth token)
const authUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body
  // find user in database with matching email
  const user = await User.findOne({ email })
  // if user exists and password matches, return the user info and attach auth token
  if (user && await user.matchPassword(password)) {
    res.json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null
    })
  // if user doesn't exist or password is incorrect, throw error
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

module.exports = { authUser } 