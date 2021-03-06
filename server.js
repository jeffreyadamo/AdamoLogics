// Dependencies
// =============================================================
require("dotenv").config();

// Set up the Express App
// =============================================================
const express = require("express");
const app = express();
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

// Use the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Middleware
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());

// API Routes
require("./routes/api-routes.js")(app);

// HTML Routes
require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  