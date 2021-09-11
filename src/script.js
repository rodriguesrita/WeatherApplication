function showTemperature(response) {
  let temperatureElement = document.querySelector("#cur-temp");
  let mintempElement = document.querySelector("#temp-min");
  let maxtempElement = document.querySelector("#temp-max");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = response.data.main.temp_min;
  celsiusMaxTemp = response.data.main.temp_max;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  mintempElement.innerHTML = Math.round(response.data.main.temp_min);
  maxtempElement.innerHTML = Math.round(response.data.main.temp_max);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cur-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let minTempElement = document.querySelector("#temp-min");
  let fahrenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
  minTempElement.innerHTML = Math.round(fahrenheitMinTemp);

  let maxTempElement = document.querySelector("#temp-max");
  let fahrenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;
  maxTempElement.innerHTML = Math.round(fahrenheitMaxTemp);
}

function showcelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cur-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let minTempElement = document.querySelector("#temp-min");
  minTempElement.innerHTML = Math.round(celsiusMinTemp);

  let maxTempElement = document.querySelector("#temp-max");
  maxTempElement.innerHTML = Math.round(celsiusMaxTemp);
}

let celsiusTemperature = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemp);

function search(event) {
  event.preventDefault();
  let apiKey = "3a4736a51fc0f7ecebe96f4cd90ddb87";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

let now = new Date();
let hours = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

let current = document.querySelector("#current");
current.innerHTML = `Today is ${day} ${hours}:${minutes}`;
