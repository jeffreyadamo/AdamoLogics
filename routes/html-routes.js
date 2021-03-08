// **************************************************************************
// html-routes.js - a set of routes for sending users to various html pages
// **************************************************************************
// Dependencies
// =============================================================
var path = require("path");
var fs = require("fs");
const request = require("request"); // "Request" library
const querystring = require("querystring");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/components/views/index.html"));
  });

  app.get("/spotify", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../public/components/views/spotify.html")
    );
  });

  app.get("/spotifyCallbackPage", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../public/components/views/spotifyCallback.html")
    );
  });

  app.get("/redirect", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../public/components/views/redirect.html")
    );
  });
  // app.get("/*", (req, res) => {
  //   res.redirect('..');
  // });

  // SPOTIFY
  // =============================================================
  // source code refactored from https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  var stateKey = "spotify_auth_state";
  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  const generateRandomString = (length) => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  app.get("/login", function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = "user-read-private user-read-email";
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  });

  // After the user logs in spotify will redirect to /spotifyCallback with data

  app.get("/spotifyCallback", function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    console.log("spotify code is " + code);
    var state = req.query.state || null;
    console.log("spotify state is " + state);
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log("spotify storedState is " + storedState);

    if (state === null || state !== storedState) {
      console.log(
        "state error: either state is null or does not match storedState"
      );
      res.redirect(
        "/spotify" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;
          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          // use the access token to access the Spotify Web API
          request.get(options, function (error, response, body) {
            //Here is where I have finally have the data!
            var returnedObj = JSON.stringify(body);
            fs.writeFile(
              path.join(__dirname, "../backend/API/userinfo.JSON"),
              returnedObj,
              function (err) {
                if (err) throw err;
                console.log("userInfo.JSON created");
              }
            );
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            "/spotifyCallbackPage/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
              })
          );
        } else {
          res.redirect(
            "/spotify/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

  app.get("/refresh_token", function (req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          access_token: access_token,
        });
      }
    });
  });

  // END EXPORTS
};
