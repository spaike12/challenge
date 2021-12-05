function changingDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day} ${hours}:${minutes}`;
}
let dateChange = document.querySelector("#date");
let currentTime = new Date();
dateChange.innerHTML = changingDate(currentTime);

function changeCity(event) {
  event.preventDefault();
  let element = document.querySelector("#cities");
  let enterInput = document.querySelector("#search-city");
  if (enterInput.value) {
    element.innerHTML = `${enterInput.value}`;
  } else {
    element.innerHTML = null;
    alert("Please type a city");
  }
  console.log(element);
  let apiKey = "b56dee47f3425bec7db87b3d81cba63c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterInput.value}&appid=b56dee47f3425bec7db87b3d81cba63c&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = response.data.main.humidity;
  let humidityDetails = document.querySelector("#humidity");
  humidityDetails.innerHTML = `${humidity}%`;
  let wind = response.data.wind.speed;
  let windDetails = document.querySelector("#windspeed");
  windDetails.innerHTML = `${wind} m/s`;
}

function showCurrentTemperature(response) {
  document.querySelector("#cities").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = response.data.main.humidity;
  let humidityDetails = document.querySelector("#humidity");
  humidityDetails.innerHTML = `${humidity}%`;
  let wind = response.data.wind.speed;
  let windDetails = document.querySelector("#windspeed");
  windDetails.innerHTML = `${wind} m/s`;
}

function positionGeo(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b56dee47f3425bec7db87b3d81cba63c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}
function geoLocater(event) {
  navigator.geolocation.getCurrentPosition(positionGeo);
}

let geo = document.querySelector("#button");
geo.addEventListener("click", geoLocater);
