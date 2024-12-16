
const userModel = require('../models/userModel'); // Assuming userModel is exported correctly
const postModel = require('../models/postModel'); 

exports.getAllPosts = async (req, res) => {
    try {
        // Query all posts
        const posts = await postModel.find().populate('user', 'username');

        // Send the posts as response
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}


exports.getUserPost = async (req, res) => {
    try {
        // Retrieve userId from request parameters
        const userId = req.params.userId;

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'A User does not exist'
            })
        }

        // Fetch all posts saved by the user
        const savedPosts = await postModel.find({ _id: { $in: user.savedPosts } });
        // Fetch all posts created by the user
        const myPosts = await postModel.find({ user: userId });
        console.log(savedPosts);
        console.log(myPosts);
        return res.status(200).send({
            success: true,
            message: 'Data found',
            savedPosts,
            myPosts
        })
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return res.status(500).send({
            success: false,
            message: 'Error in relevant posts Callback Function'
        })
    }
}

exports.createPost = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from request parameters
        const { title, description, postPicture, tags } = req.body; // Extract post data from request body
        // // Create post
        const newPost = new postModel({
            title,
            description,
            postPicture,
            tags,
            user: userId
        });
        await newPost.save();

        // Add post reference to user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'A User does not exist'
            })
        }

        user.myPosts.push(newPost._id);
        await user.save();

        return res.status(200).send({
            success: true,
            message: 'Post Created Successfully',
            post: newPost
        })
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).send({
            success: false,
            message: 'error in Create Post callback'
        })
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send({
                success: false,
                message: 'Post not found'
            })
        }

        if (post.user._id != userId) {
            await userModel.findByIdAndUpdate(userId, {
                $pull: { savedPosts: postId }
            });

            return res.status(200).send({
                success: true,
                message: 'Post deleted successfully.'
            });
        }
        await userModel.findByIdAndUpdate(userId, {
            $pull: { myPosts: postId }
        });
        await postModel.findByIdAndDelete(postId);

        return res.status(200).send({
            success: true,
            message: 'Post deleted successfully.'
        });

    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).send({
            success: false,
            message: 'Failed to delete post. Please try again later.'
        });
    }
}

exports.savePost = async (req, res) => {

    try {
        const { userId, postId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        if (user.myPosts.includes(postId)) {
            return res.status(200).json({
                success: true,
                message: 'You are saving your own post IDIOT'
            });
        }

        if (user.savedPosts.includes(postId)) {
            return res.status(200).json({
                success: true,
                message: 'Post Already Saved.'
            });
        }

        user.savedPosts.push(postId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Post saved successfully.'
        });

    } catch (error) {
        console.error('Error saving post:', error);
        return res.status(500).json({
            success: false,
            message: 'Error in Save Post callback'
        });
    }

}