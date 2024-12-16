// Import User Model
const userModel = require('../models/userModel')
// Import module to hash password
const bcryptjs = require('bcryptjs')
// Register a new User
exports.registerUser = async (req, res) => {

    try {
        // Get the data and destructure it
        const { username, email, password } = req.body

        // Adding proper Validation
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please Fill All fields!'
            })
        }
        // Check if the user Exists
        const currentUser = await userModel.findOne({ email })
        if (currentUser) {
            return res.status(401).send({
                success: false,
                message: 'A User already exists with this Email'
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        // Otherwise save user in database
        const user = new userModel({ username, email, password: hashedPassword, pictureUrl: '/images/pic2.jpeg' })
        await user.save()
        // New User Created Successfully
        return res.status(201).send({
            success: true,
            message: "New User Created Successfully!!",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error in Register Callback",
            success: false,
            error
        })
    }

};


// Get All Users
exports.getAllUsers = async (req, res) => {
    try {

        // Fetch all Users from Database
        const users = await userModel.find()
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'All Users Data',
            users
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Get All Users Callback",
            error
        })
    }

};
// Login User
exports.loginUser = async (req, res) => {

    try {

        // Get User Email and Password
        const { email, password } = req.body;
        // Check for empty fields
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please Fill All fields!'
            })
        }
        // Find user in database
        const guest = await userModel.findOne({ email })
        if (!guest) {
            return res.status(200).send({
                success: false,
                message: 'No registered User with this Email'
            })
        }

        const matchPassword = await bcryptjs.compare(password, guest.password)
        if (!matchPassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Email or Password'
            })
        }

        // Otherwise successful
        return res.status(200).send({
            success: true,
            message: "LogIn Successful!!",
            userId: guest._id
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in login Callback function",
            error
        })
    }

}
// Get a Single user
exports.getUserbyId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);
        console.log(user)
        return res.status(200).send({
            success: true,
            message: 'Single User Data',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Get Single User Callback",
            error
        })
    }
}

// Update User
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, password, picture } = req.body;
        console.log("P: ", password);
        if (password) {
            console.log("In pass");
            const hashedPassword = await bcryptjs.hash(password, 10);
            const v = await userModel.findByIdAndUpdate(userId, {
                username: username,
                email: email,
                password: hashedPassword,
                pictureUrl: picture
            });
        } else {
            const v = await userModel.findByIdAndUpdate(userId, {
                username: username,
                email: email,
                pictureUrl: picture
            });
        }


        return res.status(201).send({
            success: true,
            message: "Profile Updated Successfully!!",
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in update Callback function",
            error
        })
    }
}