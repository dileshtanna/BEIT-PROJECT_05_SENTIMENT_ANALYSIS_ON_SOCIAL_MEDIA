const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.error(err.message, err);
  console.log(err.message, err);
  let statusCode;
  let message;
  err.statusCode ? (statusCode = err.statusCode) : (statusCode = 500);
  err.customMessage
    ? (message = err.customMessage)
    : (message = "FATAL ERROR! Please contact the administrator.");

  res.status(statusCode).send(message);
};
