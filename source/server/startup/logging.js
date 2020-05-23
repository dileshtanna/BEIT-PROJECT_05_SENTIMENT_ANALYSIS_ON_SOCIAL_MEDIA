const winston = require("winston");
require("express-async-errors");
module.exports = function() {
  winston.exceptions.handle(new winston.transports.Console({}));
  process.on("unhandledRejection", err => {
    throw err;
  });
};
