const { Schema, model } = require('mongoose');

// Schema to create a Thought model {thoughtText, createdAt, username, reactions }
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        // nested documents created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought;
