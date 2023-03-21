const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add a friend to a user
router.post('/users/:id/friends', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        user.friends.push(req.body.friendId);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Remove a friend from a user
router.delete('/users/:id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        user.friends.pull(req.params.friendId);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all users with their friend counts
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
            .populate('thoughts')
            .populate('friends');
        const userArray = users.map((user) => user.toObject({ getters: true }));
        res.status(200).json(userArray);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
