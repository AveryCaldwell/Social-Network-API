const express = require('express');
// We import the ObjectId class from mongodb
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { User, Thought } = require('./models');

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

// const cwd = process.cwd();
// const connectionStringURI = `mongodb://127.0.0.1:27017`;
// const client = new MongoClient(connectionStringURI);

client
    .connect()
    .then(() => {
        console.log('Connected successfully to MongoDB');
        db = client.db(dbName);

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Mongo connection error: ', err.message);
    });
