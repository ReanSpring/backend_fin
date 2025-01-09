const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const userRoutes = require('./route/userRoute');
const incomeRoutes = require('./route/incomeRoute');
const outcomeRoutes = require('./route/outcomeRoute');
const dailiesRoutes = require('./route/dailyRoute');
const monthlyRoutes = require('./route/monthlyRoute');
const yearlyRoutes = require('./route/yearlyRoute');
const authRoutes = require('./route/authRoute');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/findatabase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.use('/users', authMiddleware, userRoutes);
app.use('/incomes', incomeRoutes);
app.use('/outcomes', outcomeRoutes);
app.use('/dailies', dailiesRoutes);
app.use('/monthly', monthlyRoutes);
app.use('/yearly', yearlyRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});