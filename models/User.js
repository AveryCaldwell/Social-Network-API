const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const Thought = require('./Thought');

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
        // reference Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // reference User model to generate friends array
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Define a virtual property to retrieve the length of the user's friends array
userSchema
    .virtual('friendCount')
    //  Getter
    .get(function () {
        return this.friends.length;
    });

//  Initialize User model
const User = model('user', userSchema);

module.exports = User;
