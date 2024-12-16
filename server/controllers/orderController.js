const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js');

exports.createOrder = async (req, res) => {

    try {
        const userId = req.params.userId;
        const { package, comments } = req.body;

        // Create a new order instance
        const newOrder = new Order({
            package,
            details: comments,
            user: userId
        });


        await newOrder.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'A User does not exist'
            })
        }

        user.myOrders.push(newOrder._id);
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'Order created successfully',
            order: newOrder
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Order Callback',
        })
    }
};
