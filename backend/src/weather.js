// Appear on load
const weatherForcast = () => {
  console.log('weather is online');
}
weatherForcast()

// Default city
const defaultCity = 'Seattle, WA'

const city = document.getElementById("city");
city.innerHTML = defaultCity;

const weather = document.createElement('div');
weather.innerHTML = "47 &#176F";

city.appendChild(weather);

