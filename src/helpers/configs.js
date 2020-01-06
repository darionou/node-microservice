const requiredir = require('require-dir');

/**
 * This module will take all the configuration files inside its folder
 * and will return the default configuration merged with
 * the one corresponding to NODE_ENV
 */
const configs = requiredir('../configs');
const defaultConfiguration = configs.default;


let environmentConfig = configs[process.env.NODE_ENV] || null;

const allRules = Object.assign({}, defaultConfiguration, environmentConfig);

module.exports = allRules;
