const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

exports.login = async (username, password) => {
    console.log(`Attempting to log in user: ${username}`);
    const user = await User.findOne({ username });
    if (!user) {
        console.log('User not found');
        throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Password does not match');
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Login successful');
    return { user, token };
};