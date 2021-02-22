// Default city
const citySearch = 'seattle';

const city = document.getElementById("city");
city.innerHTML = "Seattle, WA";

const weather = document.getElementById('weather');
const icon = document.getElementById('weatherIcon');
const iconImg = document.createElement('img');

function weatherAPI(citySearch){
  $.get('/api/weather/' + citySearch)
  .then((response) => {
    weather.innerHTML = response.temp + "&#176F";
    iconImg.setAttribute('src', response.iconURL);
    icon.appendChild(iconImg);
  })
  .catch((err) => { 
    if (err) throw err}
  )
}
// Comment out to save API use
weatherAPI(citySearch);