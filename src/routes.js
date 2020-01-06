const app = module.exports = require('express')();
const {errorHandler} = require("./middlewares/common");
const router = require('express').Router();

const controllers = require('./controllers');

const morgan = require('morgan');
const logger = require('./helpers/logger');


app.use(morgan('combined', {stream: logger.stream}));

// index handshake
app.get('/', (req, res) => {
  res.json({status: "ok"});
});

/**
 * ROUTES
 */
// router.get('/', controllers.samples)

app.use('/users', router);

// the catch all route
app.all('*', (req, res) => {
  res.status(404).end();
});

// handle errors
app.use(errorHandler);