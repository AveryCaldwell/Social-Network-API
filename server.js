const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Run npm install mongodb and require mongodb and MongoClient class
// const { MongoClient } = require('mongodb');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('Social-Network-API')
    ? cwd.split('/Social-Network-API/')[1]
    : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on port ${PORT}!`);
    });
});