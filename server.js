// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
require("dotenv").config();

// Set up the Express App
// =============================================================
const app = express();
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

// Use the Express app to handle data parsing
app.use(express.static(__dirname + "/"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

// API Routes
require("./routes/api-routes.js")(app);

// HTML Routes
require("./routes/html-routes.js")(app);
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
//   });

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  