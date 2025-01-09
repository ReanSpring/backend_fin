const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const secretKey = 'your_secret_key'; // Replace with your secret key

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;