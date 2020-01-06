const bodyParser = require('body-parser');
const express = require('express');
const { PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE_NAME } = process.env;

const routes = require('./routes');
const db = require('./helpers/db');
const mongodb = new db(MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DATABASE_NAME);

/**
 * SERVER 
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

mongodb.connect();

const port = PORT || '3000';
app.listen(port, () => console.log(`Service: ${process.env.npm_package_name}. Running on port ${port}`));