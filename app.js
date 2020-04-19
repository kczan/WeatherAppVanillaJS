const locateButton = document.getElementById('locate');
const status = document.getElementById('status');
const cityInput = document.getElementById('city');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature-degree');
const weatherIcon = document.getElementById('weather-icon');
const degree = document.getElementById('degree');
const temperatureDescription = document.getElementById('temperature-description');

locate.addEventListener('click', ()=> {
  cityData = cityInput.value;
  locatedWeather(cityData);
});

cityInput.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    locate.click();
  }
});

function locatedWeather(city){
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const weatherData = JSON.parse(xhr.responseText);
      cityName.innerHTML = weatherData.name;
      temperature.innerHTML = roundTemperature(weatherData.main.temp);
      weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      degree.style.visibility = 'visible';
      temperatureDescription.innerHTML = weatherData.weather[0].description;
    }
  }

  xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3b1429d5efe30b361baa6a74a9324de4`);
  // xhr.onload = () => {
  //   const weatherData = JSON.parse(xhr.responseText);
  //   cityName.innerHTML = weatherData.name;
  //   temperature.innerHTML = roundTemperature(weatherData.main.temp);
  //   weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  //   degree.style.visibility = 'visible';
  //   temperatureDescription.innerHTML = weatherData.weather[0].description;
  // }
  xhr.send();
}

function roundTemperature(temp) {
  let numTemp = parseFloat(temp)
  return numTemp.toPrecision(3);
}

