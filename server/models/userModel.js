const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is Required!']
    },
    email: {
        type: String,
        required: [true, 'Email is Required!']
    },
    password: {
        type: String,
        required: [true, 'Password is Required!']
    },
    pictureUrl: {
        type: String,
        required: [false, 'Not compulsory']
    },
    myPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    myOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]

}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;