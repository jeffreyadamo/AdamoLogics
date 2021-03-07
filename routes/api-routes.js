require("dotenv").config();
const axios = require('axios');
const weatherAPIkey = process.env.OPEN_WEATHER_API_KEY;
const NasaAPIkey = process.env.NASA_API_KEY;

module.exports = function(app) {
  // Open Weather Map
  //  =========================================================================
  app.get("/api/weather/:citySearch", (req, res) => {
    let city = "?q=" + req.params.citySearch;
    let units = "&units=imperial"
    let weatherAPI = "&appid=" + weatherAPIkey;
    let queryURL = 
      "https://api.openweathermap.org/data/2.5/weather" 
      +city
      +units
      +weatherAPI;

    axios.get(queryURL)
    .then((response) => {      
      console.log("OpenWeatherMap response status = " + response.status);
      let temp = response.data.main.temp.toFixed(1);
      let iconURL = "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";

      let resObj = {
        temp: temp,
        iconURL: iconURL,
      }
      res.send(resObj)
    })
    .catch((err) => {
      console.log(err);
    });  
  })
  //  =========================================================================
  // NASA Pic Of The Day
  //  =========================================================================
  app.get("/api/getNasaPOTD", (req, res) => {
    let NASAqueryURL = "https://api.nasa.gov/planetary/apod?api_key=" + NasaAPIkey;
    axios.get(NASAqueryURL)
    .then((response) => {      
      console.log("NASA response status = " + response.status);
      let resObj = {
        date: response.data.date,
        explanation: response.data.explanation,
        media_type: response.data.media_type,
        service_version: response.data.service_version,
        title: response.data.title,
        url: response.data.url,
        hdurl: response.data.hdurl,
        copyright: response.data.copyright
      }
      res.send(resObj)
    })
    .catch((err) => {
      console.log(err);
    });  
  })
  //  =========================================================================
  // SPOTIFY
  //  =========================================================================
  var querystring = require('querystring');
  var client_id = process.env.SPOTIFY_CLIENT_ID;
  var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  var redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  /**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
   var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  var stateKey = 'spotify_auth_state';
  var state = generateRandomString(16);

  

  app.get('/api/spotifyLogIn', function(req, res) {
    res.cookie(stateKey, state);
    var scope = 'user-read-private user-read-email';
    console.log(res);

    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    }))
  });
    // res.redirect('https://accounts.spotify.com/authorize' +
    //   '?response_type=code' +
    //   '&client_id=' + my_client_id +
    //   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    //   '&redirect_uri=' + encodeURIComponent(redirect_uri));
    // });

    // app.get('/spotifyCallback', function(req, res) {

    //   // your application requests refresh and access tokens
    //   // after checking the state parameter
    
    //   var code = req.query.code || null;
    //   var state = req.query.state || null;
    //   var storedState = req.cookies ? req.cookies[stateKey] : null;
    
    //   if (state === null || state !== storedState) {
    //     res.redirect('/#' +
    //       querystring.stringify({
    //         error: 'state_mismatch'
    //       }));
    //   } else {
    //     res.clearCookie(stateKey);
    //     var authOptions = {
    //       url: 'https://accounts.spotify.com/api/token',
    //       form: {
    //         code: code,
    //         redirect_uri: redirect_uri,
    //         grant_type: 'authorization_code'
    //       },
    //       headers: {
    //         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //       },
    //       json: true
    //     };
    
    //     request.post(authOptions, function(error, response, body) {
    //       if (!error && response.statusCode === 200) {
    
    //         var access_token = body.access_token,
    //             refresh_token = body.refresh_token;
    
    //         var options = {
    //           url: 'https://api.spotify.com/v1/me',
    //           headers: { 'Authorization': 'Bearer ' + access_token },
    //           json: true
    //         };
    
    //         // use the access token to access the Spotify Web API
    //         request.get(options, function(error, response, body) {
    //           console.log(body);
    //         });
    
    //         // we can also pass the token to the browser to make requests from there
    //         res.redirect('/#' +
    //           querystring.stringify({
    //             access_token: access_token,
    //             refresh_token: refresh_token
    //           }));
    //       } else {
    //         res.redirect('/#' +
    //           querystring.stringify({
    //             error: 'invalid_token'
    //           }));
    //       }
    //     });
    //   }
    // });
    
    // app.get('/refresh_token', function(req, res) {
    
    //   // requesting access token from refresh token
    //   var refresh_token = req.query.refresh_token;
    //   var authOptions = {
    //     url: 'https://accounts.spotify.com/api/token',
    //     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    //     form: {
    //       grant_type: 'refresh_token',
    //       refresh_token: refresh_token
    //     },
    //     json: true
    //   };
    
    //   request.post(authOptions, function(error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //       var access_token = body.access_token;
    //       res.send({
    //         'access_token': access_token
    //       });
    //     }
    //   });
    // });
}