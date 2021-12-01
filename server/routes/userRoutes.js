const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, updateUserProfile, createUser, getAllUsers, deleteUser } = require('../controllers/userController')
const { protectRoutes, isAdmin }  = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', authUser)
router.get('/', protectRoutes, isAdmin, getAllUsers)
router.get('/profile', protectRoutes, getUserProfile)
router.put('/profile', protectRoutes, updateUserProfile)
router.delete('/:id', protectRoutes, isAdmin, deleteUser)

module.exports = router