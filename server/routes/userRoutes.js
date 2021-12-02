const express = require('express')
const router = express.Router()
const { authUser, getUserProfile, updateUserProfile, createUser, getAllUsers, 
    getUserById, updateAdminStatus, deleteUser } = require('../controllers/userController')
const { protectRoutes, isAdmin }  = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', authUser)
router.get('/', protectRoutes, isAdmin, getAllUsers)
router.get('/profile', protectRoutes, getUserProfile)
router.put('/profile', protectRoutes, updateUserProfile)
router.get('/:id', protectRoutes, isAdmin, getUserById)
router.put('/:id', protectRoutes, isAdmin, updateAdminStatus)
router.delete('/:id', protectRoutes, isAdmin, deleteUser)

module.exports = router