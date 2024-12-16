const express = require('express')
const { getAllUsers, registerUser, loginUser, updateUser, getUserbyId } = require('../controllers/userController')

// router object
const router = express.Router()

// Get All Users || GET
router.get('/all-users', getAllUsers)

// Get Single User || GET
router.get('/:userId', getUserbyId)
// Create a new User || POST
router.post('/register', registerUser)

// Login || POST
router.post('/login', loginUser)

// Update || POST
router.post('/:userId/update', updateUser)

module.exports = router