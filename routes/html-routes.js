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
    res.sendFile(path.join(__dirname, "../public/components/views/index.html"));
  });

  app.get("/spotify", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/components/views/spotify.html"));
  });

  app.get("/redirect", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/components/views/redirect.html"));
  });
  app.get("/*", (req, res) => {
    res.redirect('..');
  });

}
