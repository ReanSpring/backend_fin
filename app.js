const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./route/userRoute');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

module.exports = app;