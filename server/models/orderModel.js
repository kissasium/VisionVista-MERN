const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    package: {
        type: String,
        required: [true, 'Package is Required!']
    },
    details: {
        type: String,
        required: [false]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel;