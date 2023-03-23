const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(async (User) =>
                !User
                    ? res.status(404).json({ message: 'No User with that ID' })
                    : res.json(User)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new User
    createUser(req, res) {
        User.create(req.body)
            .then((User) => res.json(User))
            .catch((err) => res.status(500).json(err));
    },

    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                          .status(404)
                          .json({ message: 'No User find with this ID!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a User and remove thought associated
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((User) =>
                !User
                    ? res.status(404).json({ message: 'No such User exists' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then((course) =>
                !course
                    ? res.status(404).json({
                          message: 'User deleted, but no courses found',
                      })
                    : res.json({ message: 'User successfully deleted' })
            )
            .then(() =>
                res.json({ message: 'User and associated apps deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((User) =>
                !User
                    ? res
                          .status(404)
                          .json({ message: 'No User found with that ID :(' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friends: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((User) =>
                !User
                    ? res
                          .status(404)
                          .json({ message: 'No User found with that ID :(' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
};
