const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

exports.createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user._id;
};

exports.getUsers = async () => {
    const users = await User.find();
    return users;
};