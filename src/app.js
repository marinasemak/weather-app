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

//Show the current temperature of the city from search result

let apiKey = "37232bf6b294f9b4afoeacbdcb8093at";
let units = "metric";
let endpointUrl = "https://api.shecodes.io/weather/v1/current?";

function showCity(city) {
  let apiUrl = `${endpointUrl}query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-field").value;
  if (city) {
    showCity(city);
  } else {
    showCity("kyiv");
  }
}

function showWeather(response) {
  let cityName = document.querySelector("#city-name");
  let temperature = document.querySelector("#temperature");
  celsiusTemperature = response.data.temperature.current;
  let humidity = document.querySelector("#currentHumidity");
  let wind = document.querySelector("#currentWind");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityName.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(celsiusTemperature);
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  description.innerHTML = response.data.condition.description;
  iconElement.setAttribute("src", `images/${response.data.condition.icon}.svg`);
  iconElement.setAttribute("alt", response.data.condition.description);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

showCity("kyiv");

//Display temperature in Celsius and add a link to convert it to Fahrenheit
function showCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let farenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = farenheitTemp;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}
let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelcius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

//Add a Current Location on page refresh
/* function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${endpointUrl}lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition); */
