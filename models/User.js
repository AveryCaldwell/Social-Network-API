const { Schema, model } = require('mongoose');
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
    },
    {
        toJSON: {
            virtuals: true,
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

// Remove thoughts associated with username
userSchema.pre('remove', function (next) {
    Thought.remove({ username: this.username }).exec();
    next();
});
//  Initialize User model
const User = model('User', userSchema);

module.exports = User;
