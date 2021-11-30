const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, updateUserProfile, createUser, getAllUsers } = require('../controllers/userController')
const { protectRoutes, isAdmin }  = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', authUser)
router.get('/', protectRoutes, isAdmin, getAllUsers)
router.get('/profile', protectRoutes, getUserProfile)
router.put('/profile', protectRoutes, updateUserProfile)

module.exports = router