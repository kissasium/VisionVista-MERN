/*
    Include all dependencies
*/

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')


// Configure dotenv
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')

// Mongoose connection
connectDB();

// Create a REST object
const app = express()

// Add Middlewares to App
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/order', orderRoutes);

// Listen
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} port no ${PORT}`.bgCyan.white);
})


