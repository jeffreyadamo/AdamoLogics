// Default city
const citySearch = 'seattle';

const city = document.getElementById("city");
city.innerHTML = "Seattle, WA";

const weather = document.getElementById('weather');
const icon = document.createElement('img');

function weatherAPI(citySearch){
  $.get('/api/weather/' + citySearch)
  .then((response) => {
    weather.innerHTML = response.temp + "&#176F";
    icon.setAttribute('src', response.iconURL);
    weather.appendChild(icon);
  })
  .catch((err) => { 
    if (err) throw err}
  )
}

weatherAPI(citySearch);