const express = require("express");
const config = require("config");
const mongoURI = config.get("mongoURI");

const app = express();

const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected To MongoDB");
    if (process.env.NODE_ENV !== "test")
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}`)
      );
  }
);

require("./startup/logging")();
require("./startup/routes")(app);

module.exports = app;
