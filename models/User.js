const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { Thought, thoughtSchema } = require('./Thought');

// Schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // mongoose email validation
            match: /^\S+@\S+\.\S+$/,
        },

        friends: [this],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Retrieve the length of the user's friends array
userSchema
    .virtual('friendCount')
    //  Getter
    .get(function () {
        return this.friends.length;
    });
userSchema.virtual('thoughts', {
    ref: 'Thought',
    localField: ['username'],
    foreignField: ['username'],
});

//  Initialize User model
const User = model('User', userSchema);

module.exports = User;
