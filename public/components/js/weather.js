// Default city
const defaultCity = 'seattle';

const cityToDisplay = document.getElementById("city");
cityToDisplay.innerHTML = "Seattle, WA";

const weatherData = document.getElementById('weather');
const weatherIcon = document.getElementById('weatherIcon');
const iconImg = document.createElement('img');

function weatherAPI(city){
  $.get('/api/weather/' + city)
  .then((response) => {
    weatherData.innerHTML = response.temp + "&#176F";
    iconImg.setAttribute('src', response.iconURL);
    weatherIcon.appendChild(iconImg);
  })
  .catch((err) => { 
    if (err) throw err}
  )
}
// Comment out to save API use
weatherAPI(defaultCity);