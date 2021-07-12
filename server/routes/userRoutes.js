const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, createUser } = require('../controllers/userController')
const protectRoutes = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', authUser)
router.get('/profile', protectRoutes, getUserProfile)

module.exports = router