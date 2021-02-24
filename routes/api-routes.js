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
}