const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// const { User, Thought } = require('./models');
// const { MongoClient, ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

let db;
const dbName = 'networkDB';

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on port ${PORT}!`);
    });
});

