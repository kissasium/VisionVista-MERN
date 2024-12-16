const express = require('express')
const { createOrder } = require('../controllers/orderController')

// router object
const router = express.Router()


// Create a new order || POST
router.post('/:userId/createOrder', createOrder)


module.exports = router