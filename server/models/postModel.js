const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required!']
    },
    description: {
        type: String,
        required: [false]
    },
    postPicture: {
        type: String,
        required: [true, 'Picture is required']
    },
    tags: {
        type: [String],
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })

const postModel = mongoose.model('Post', postSchema)

module.exports = postModel;