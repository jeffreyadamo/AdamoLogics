// Dependencies
// =============================================================
const express = require("express");
// const path = require("path");
require("dotenv").config();

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
app.use(express.static("public"));
// app.use(express.static(__dirname + "/"));

app.use(morgan('tiny'));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// app.use(
//   helmet({
//       contentSecurityPolicy: {
//           directives: {
//               defaultSrc: ["'self'"],
//               scriptSrc: ["'self'", "https://code.jquery.com", "https://cdn.jsdelivr.net"],
//               connectSrc: ["'self'", "http://www.adamologics.com"],
//               styleSrc: ["'self'", "fonts.googleapis.com", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
//               fontSrc: ["'self'", "fonts.gstatic.com"],
//               imgSrc: ["'self'", "https://i.imgur.com/", "https://github.githubassets.com", "https://apod.nasa.gov/", "https://openweathermap.org"],
//               frameSrc: ["'self'"]
//           }
//       },
//   })
// );

// API Routes
require("./routes/api-routes.js")(app);

// HTML Routes
require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  