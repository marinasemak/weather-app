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

//Daily forecast

function formatDate(timestemp) {
  let formattedTime = new Date(timestemp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[formattedTime.getDay()];
  return day;
}

function weatherForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="daily-info_temp">`;

  dailyForecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="daily-info_day">
          <span class="daily-info_weekday">${formatDate(day.time)}</span>
          <br />
          <img src="images/${day.condition.icon}.svg" alt="cloudy_sunny" />
          <br />
          <span class="daily-info-temp__max">${Math.round(
            day.temperature.maximum
          )}</span> &nbsp; &nbsp;
          <span class="daily-info-temp__min">${Math.round(
            day.temperature.minimum
          )}</span>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `${endpointUrl}forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(weatherForecast);
}

//Show the current temperature of the city from search result

let apiKey = "37232bf6b294f9b4afoeacbdcb8093at";
let units = "metric";
let endpointUrl = "https://api.shecodes.io/weather/v1/";

function showCity(city) {
  let apiUrl = `${endpointUrl}current?query=${city}&key=${apiKey}&units=${units}`;
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

  getForecast(response.data.coordinates);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

showCity("kyiv");
weatherForecast();
