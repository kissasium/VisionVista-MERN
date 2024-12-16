const express = require('express')
const { getAllPosts, createPost, deletePost, getUserPost, savePost } = require('../controllers/postController')

// router object
const router = express.Router()

// Get All Posts || GET
router.get('/all-posts', getAllPosts)

// Get User Posts || GET
router.get('/:userId/getPosts', getUserPost)

// Create a new post || POST
router.post('/:userId/createPost', createPost)

// delete post || POST
router.post('/:postId/:userId/deletePost', deletePost)

// save post || POST
router.post('/:userId/savePost/:postId', savePost)


module.exports = router