require("dotenv").config();
const axios = require('axios');

const weatherAPIkey = process.env.OPEN_WEATHER_API_KEY;

module.exports = function(app) {
  app.get("/api/weather/:citySearch", (req, res) => {
    let city = "?q=" + req.params.citySearch;
    let units = "&units=imperial"
    let API = "&appid=" + weatherAPIkey;
    let queryURL = 
      "https://api.openweathermap.org/data/2.5/weather" 
      +city
      +units
      +API;

    axios.get(queryURL)
    .then((response) => {
      
      console.log("status = " + response.status);
      let temp = response.data.main.temp.toFixed(1);
      let iconURL = "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";

      const resObj = {
        temp: temp,
        iconURL: iconURL,
      }
      res.send(resObj)
    })
    .catch((err) => {
      console.log(err);
    });  

  })
}