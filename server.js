// server.js
const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes/bookRoute');
require('dotenv').config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use book routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})