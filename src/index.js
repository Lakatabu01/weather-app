import "./style.css";
import logo from "./images/logo.png";

const anchorDiv = document.querySelector(".anchor");
const header = document.createElement("div");
const appName = "Weather App";
const telescopeImage = document.createElement("img");
const searchGroup = document.createElement("div");

telescopeImage.src = logo;
telescopeImage.classList.add("telescope");
header.classList.add("header");
anchorDiv.appendChild(header);
anchorDiv.appendChild(searchGroup);
anchorDiv.appendChild(displayWeatherData());

appHeader();
searchBar();

const location = document.querySelector(".country");
const temperatureDisplay = document.querySelector(".temp");
const feelsLikeDisplay = document.querySelector(".feel");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");
const cloudDisplay = document.querySelector(".clouds");

function appHeader() {
  header.innerHTML = `
  <div class="header-container"> 
  <div class="logo-div"></div>
  <div>${appName}</div>
  </div>
`;
  const telescopeDiv = document.querySelector(".logo-div");
  telescopeDiv.appendChild(telescopeImage);
}

function searchBar() {
  searchGroup.classList.add("search-group");
  searchGroup.innerHTML = `
  <div>
  <input class="user-input" placeholder="Type in a city...">
  <button class="search-button">Search</button>
  </div>
  `;
  assignPromiseToButton();
}

function assignPromiseToButton() {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", weatherForecast);
}

async function weatherForecast() {
  try {
    const input = document.querySelector(".user-input");
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&appid=4c0ae5ddb569d5716e4c12c7f6bb943f&units=metric",
      { mode: "cors" }
    );
    const responseReport = await response.json();

    const state = responseReport.name;
    const temperature = responseReport.main.temp;
    const feelsLike = responseReport.main.feels_like;
    const humidity = responseReport.main.humidity;
    const windSpeed = responseReport.wind.speed;
    const cloud = responseReport.weather[0].description;
    const countryCode = responseReport.sys.country;
    const codeToName = new Intl.DisplayNames(["ng"], { type: "region" });
    const country = codeToName.of(countryCode);

    //console.log(location);
    location.textContent = (await state) + ", " + (await country) + ".";
    temperatureDisplay.textContent = (await temperature) + " \u00B0 celsius";
    feelsLikeDisplay.textContent =
      "Feels like: " + "  " + (await feelsLike) + " \u00B0 C";
    humidityDisplay.textContent = "Humidity: " + "  " + (await humidity) + " %";
    windDisplay.textContent =
      "Wind speed: " + "  " + (await windSpeed) + " km/h";
    cloudDisplay.textContent = "Clouds: " + "  " + (await cloud);

    input.value = "";
  } catch (error) {
    alert("Oops, could not get weather information");
  }
}

function displayWeatherData() {
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather-info");
  weatherDiv.innerHTML = `
  <h1 class= "country"></h1>
  <div class= "all-data">
  <p class= "temp">Welcome.</p>
  <p class= "feel"></p>
  <p class= "humidity"></p>
  <p class= "wind"></p>
  <p class= "clouds"></p>
  </div>
  `;
  return weatherDiv;
}
displayWeatherData();
