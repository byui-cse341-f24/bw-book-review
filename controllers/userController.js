const User = require('../models/userModel'); // Adjust this path based on your project structure
const { ObjectId } = require('mongodb');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: err.message });
    }
};

// Get a single user by Id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password // Ensure password is handled securely (hashed)
    });

    try {
        const newUser = await user.save();
        res.status(201).json({ id: newUser._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });
        
        user.username = req.body.username;
        user.email = req.body.email;
        // Do not expose password updates unless handled properly

        const updatedUser = await user.save();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        await user.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    getAllUsers, 
    getUserById, 
    addUser, 
    updateUser, 
    deleteUser 
};
