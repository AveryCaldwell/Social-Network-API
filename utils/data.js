// seeds for Thought
const thoughtsData = [
    {
        thoughtText: 'Just had the best sandwich ever',
        username: 'johndoe',
        createdAt: '2022-03-19T15:00:00Z',
        reactions: [
            {
                reactionBody: 'Glad to hear it!',
                username: 'janedoe',
                createdAt: '2022-03-19T16:00:00Z',
            },
            {
                reactionBody: 'What kind of sandwich was it?',
                username: 'bobsmith',
                createdAt: '2022-03-19T17:00:00Z',
            },
        ],
    },
    {
        thoughtText: 'I love hiking in the mountains',
        username: 'janedoe',
        createdAt: '2022-03-20T10:00:00Z',
        reactions: [
            {
                reactionBody: 'Me too! Which mountains have you hiked?',
                username: 'johndoe',
                createdAt: '2022-03-20T11:00:00Z',
            },
        ],
    },
    {
        thoughtText:
            "Life is too short to waste time on things that don't matter.",
        username: 'john_doe',
        reactions: [
            {
                reactionBody: '👍',
                username: 'jane_smith',
            },
            {
                reactionBody: '❤️',
                username: 'bob_jones',
            },
        ],
    },
    {
        thoughtText: 'Programming is a superpower.',
        username: 'jane_smith',
        reactions: [
            {
                reactionBody: '👍',
                username: 'john_doe',
            },
        ],
    },
    {
        thoughtText: 'I love learning new things.',
        username: 'bob_jones',
        reactions: [
            {
                reactionBody: '❤️',
                username: 'jane_smith',
            },
        ],
    },
];

// Seeds for User
const usersData = [
    {
        username: 'john_doe',
        email: 'john.doe@example.com',
        thoughts: [],
        friends: [],
        reactions: [],
    },
    {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
        thoughts: [],
        friends: [],
        reactions: [],
    },
    {
        username: 'bob_jones',
        email: 'bob.jones@example.com',
        thoughts: [],
        friends: [],
        reactions: [],
    },
];
