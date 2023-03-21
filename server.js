const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Run npm install mongodb and require mongodb and MongoClient class
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3001;
const app = express();

// Connection string to local instance of MongoDB
const connectionStringURI = `mongodb://127.0.0.1:27017`;

// Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);

// Create variable to hold our database name
const dbName = 'networkDB';
// Use connect method to connect to the mongo server
client
    .connect()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        // Use client.db() constructor to add new db instance
        db = client.db(dbName);
        // start up express server
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
