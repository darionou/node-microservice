const { HttpError } = require("../errors");

/**
 * ERROR HANDLER
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.json);
  } else {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  errorHandler
};