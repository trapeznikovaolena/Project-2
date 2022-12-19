function dateTime() {
  let now = new Date();
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayMonth = now.getDate();
  let month = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let appDate = `${days[day]}, ${dayMonth} ${months[month]}  ${hour}:${minutes}`;
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = appDate;
}
dateTime();

function forecast(response) {
  let forecastData = response.data.daily;
  console.log(forecastData);
  let forcastElement = document.querySelector("#forecast");
  let day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forcastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
              <ul class="weather">
                <li>${formatDay(forcastDay.dt)}</li> 
                <li><img
          src="http://openweathermap.org/img/wn/${
            forcastDay.weather[0].icon
          }.png"
          alt=""/></li>
                <li><span >${Math.round(
                  forcastDay.temp.max
                )}° </span> <span>${Math.round(
          forcastDay.temp.min
        )}°</span></li> 
              </ul>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0fe8a8c3e267816d7e1a6e4de374af4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
}

function cityName(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  if (cityDisplay.value) {
    currentCity.innerHTML = cityDisplay.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please type a city");
    currentCity.innerHTML = "Nowhere";
  }
  let apiKey =
    "0fe8a8c3e267816d7e1a6e4de374af4d"; /*display searching city and temp part 11*/
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay.value}&appid=${apiKey}&units=metric`;
  axios.get(urlWeather).then(locationWeather);
}
let city = document.querySelector("#search-form");
city.addEventListener("submit", cityName);

function locationWeather(response) {
  let temperatureElement = document.querySelector("#temperature-today");

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-today");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function searchCity(city) {
  let apiKey = "0fe8a8c3e267816d7e1a6e4de374af4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationWeather);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showFrankfurt(event) {
  event.preventDefault();
  searchCity("Frankfurt");
}

function showKyiv(event) {
  event.preventDefault();
  searchCity("Kyiv");
}

function showParis(event) {
  event.preventDefault();
  searchCity("Paris");
}

let frankfurtButton = document.querySelector("#frankfurt-button");
frankfurtButton.addEventListener("click", showFrankfurt);

let kyivButton = document.querySelector("#kyiv-button");
kyivButton.addEventListener("click", showKyiv);

let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", showParis);
