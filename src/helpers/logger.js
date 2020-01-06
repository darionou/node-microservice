const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const configs = require('./configs');

/**
 * STACKDRIVER LOGGING 
 */
const stackdriverTransport = new LoggingWinston(configs.winston);

/**
 * Winston logger
 *
 * Log if environment variables are setted true
 *
 * @type {winston.Logger}
 */
let transport = [];

!(process.env.LOGGER_CONSOLE === "false") ?
    transport.push(new winston.transports.Console(configs.logger.console)) : null;

!(process.env.LOGGER_FILE === "false") ?
    transport.push(new winston.transports.File(configs.logger.file)) : null;

!(process.env.LOGGER_STACKDRIVER === "false") ?
    transport.push(stackdriverTransport) : null;


const logger = winston.createLogger({
    //TODO
    //level
    level: process.env.LOGGER_LEVEL,
    format: winston.format.simple(),
    transports: transport
});

module.exports = { logger };

module.exports.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    }
};




