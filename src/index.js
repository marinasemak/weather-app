/* let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
city = city.toLowerCase().trim();

if (weather[city] !== undefined) {
  let celsius = Math.round(weather[city].temp);
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let humidity = weather[city].humidity;
  alert(
    `It is currently ${celsius}°C (${fahrenheit}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
 */

// Show current date and time
function showDate(today) {
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = today.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[today.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];
  let date = today.getDate();
  return `${hours}:${min}, ${day} ${month} ${date}`;
}
let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = showDate(new Date());

//Display temperature in Celsius and add a link to convert it to Fahrenheit
function showCelcius(event) {
  event.preventDefault();
  let todayTemp = document.querySelector(".today-info_temp");
  todayTemp.innerHTML = 6;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelcius);

function showFahrenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector(".today-info_temp");
  todayTemp.innerHTML = 43;
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

//Show the current temperature of the city from search result

let apiKey = "58a6775f97527351bf6c6966e209be39";
let units = "metric";
let endpointUrl = "https://api.openweathermap.org/data/2.5/weather";

function showCity(city) {
  let apiUrl = `${endpointUrl}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-field").value;
  showCity(city);
}

function showWeather(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#currentHumidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#currentWind");
  wind.innerHTML = (response.data.wind.speed * 3.6).toFixed(2);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

showCity("kyiv");

//Add a Current Location on page refresh
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${endpointUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);

/* function showTemp(response) {
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#currentHumidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#currentWind");
  wind.innerHTML = (response.data.wind.speed * 3.6).toFixed(2);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
} */
