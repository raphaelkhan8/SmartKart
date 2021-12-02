const asyncErrorHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')


// Create new user
const createUser = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body
  // check to see if user already exists
  const userExists = await User.findOne({ email })
  // if user already exists, throw error
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // else, create the user
  const user = await User.create({
    name,
    email,
    password
  })

  // if new user is created, send 201(Created) and info to client 
  if (user) {
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

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
      token: generateToken(user._id)
    })
  // if user doesn't exist or password is incorrect, throw error
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


// Gets user's profile (using protectRoutes middleware (see userRoutes.js))
const getUserProfile = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// Updates user's profile (using protectRoutes middleware (see userRoutes.js))
const updateUserProfile = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    
    res.json({ 
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// Gets all users from database (needs admin privileges)
const getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


// Get user by id (needs admin privileges)
const getUserById = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// Update user's admin status (needs admin privileges)
const updateAdminStatus = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {

    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    
    res.json({ 
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// Deletes a user (needs admin privileges)
const deleteUser = asyncErrorHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  
  if (user) {
    await user.remove()
    res.json({ message: 'User removed '})
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})



module.exports = { createUser, authUser, getUserProfile, updateUserProfile, getAllUsers, getUserById, updateAdminStatus, deleteUser } 