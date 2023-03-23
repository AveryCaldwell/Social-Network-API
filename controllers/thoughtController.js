const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((Thoughts) => res.json(Thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((Thought) =>
                !Thought
                    ? res
                          .status(404)
                          .json({ message: 'No Thought with that ID' })
                    : res.json(Thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((Thought) => res.json(Thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((Thought) =>
                !Thought
                    ? res
                          .status(404)
                          .json({ message: 'No Thought with this id!' })
                    : res.json(Thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((Thought) =>
                !Thought
                    ? res
                          .status(404)
                          .json({ message: 'No Thought with that ID' })
                    : User.deleteMany({ _id: { $in: Thought.Users } })
            )
            .then(() => res.json({ message: 'Thought and Users deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
};
