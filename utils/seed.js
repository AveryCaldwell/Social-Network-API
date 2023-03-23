const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData } = require('./data');
// const { getRandomName, getRandomAssignments } = require('./data');

// connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Create empty array to hold the users
    // const users = [];
    await User.insertMany(usersData);
    await Thought.insertMany(thoughtsData);
    // Add users to the collection and await the results
    // await User.collection.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    //console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
