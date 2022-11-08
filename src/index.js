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

appHeader();
//weatherForecast();
searchBar();

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
  <input class="user-input" placeholder="Houston">
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
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=ontario&appid=4c0ae5ddb569d5716e4c12c7f6bb943f&units=metric",
      { mode: "cors" }
    );
    const responseReport = await response.json();
    console.log(responseReport);
  } catch (error) {
    alert("could not get weather information");
  }
}

//const regionNames = new Intl.DisplayNames(["ng"], { type: "region" });
//console.log(regionNames.of("NG"));
