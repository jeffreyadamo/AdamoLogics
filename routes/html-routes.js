// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  app.get("/spotify", (req, res) => {
    res.sendFile(path.join(__dirname, "../spotify.html"));
  });

  app.get("/*", (req, res) => {
    res.redirect('..');
  });

}
