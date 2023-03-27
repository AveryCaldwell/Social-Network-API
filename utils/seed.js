const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData } = require('./data');

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    await User.insertMany(usersData);
    await Thought.insertMany(thoughtsData);

    // Log out the seed data to indicate what should appear in the database
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
