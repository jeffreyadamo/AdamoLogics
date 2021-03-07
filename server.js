// Dependencies
// =============================================================
const express = require("express");
// const path = require("path");
require("dotenv").config();

// Spotify stuff
const request = require('request');
const cors = require('cors');
const quickstring = require('quickstring');
const cookieParser = require('cookie-parser');

// Set up the Express App
// =============================================================
const app = express();
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

// Use the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
  .use(cors())
  .use(cookieParser());

// Middleware
app.use(morgan('tiny'));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// API Routes
require("./routes/api-routes.js")(app);

// HTML Routes
require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  