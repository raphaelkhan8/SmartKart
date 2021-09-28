const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, updateUserProfile, createUser } = require('../controllers/userController')
const protectRoutes = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', authUser)
router.get('/profile', protectRoutes, getUserProfile)
router.put('/profile', protectRoutes, updateUserProfile)

module.exports = router