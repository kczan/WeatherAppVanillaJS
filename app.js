const locateButton = document.getElementById('locate');
const status = document.getElementById('status');
const cityInput = document.getElementById('city');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature-degree');
const weatherIcon = document.getElementById('weather-icon');
const degree = document.getElementById('degree');
const temperatureDescription = document.getElementById('temperature-description');

const venueSection = document.getElementById('venues');
const venue1 = document.getElementById('venue1');
const venue2 = document.getElementById('venue2');
const venue3 = document.getElementById('venue3');
const venuesTitle = document.getElementById('venues-title');


const venueDivs = [venue1, venue2, venue3];

// Foursquare API Info
const clientId = 'AGFKI4JFAPD4H5RQHEJHTRJNOCBISEAMH50TKJCH3AAA4DCI';
const clientSecret = 'CIRU5VRTJPG0A1EA3YLGGECHKGWLVF2OM32ZOPDUWLKWLWPS';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';


// helpers

function roundTemperature(temp) {
  try{
    return temp.toFixed(1);
  } catch {
    status.innerHTML = 'There seems to be an error of OpenWeather services! Please contact them about that issue.'
  }
}

const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}


// Ajax functions

const getVenues = async () => {
  const city = cityInput.value;
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200421`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
}

const getWeather = async (city) => {
  const urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3b1429d5efe30b361baa6a74a9324de4`
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request failed!');
  } catch (error) {
    console.log(error);
  }
}


// render functions

const renderVenues = (venues) => {
  venueSection.style.visibility = 'visible';
  venuesTitle.style.visibility = 'visible';
  venueDivs.forEach((singleVenueElement, index) => {
    venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    singleVenueElement.innerHTML = venueContent;
  });
}

const renderWeather = (weatherData) => {
  console.log(weatherData);
  cityName.innerHTML = weatherData.name;
  temperature.innerHTML = roundTemperature(weatherData.main.temp);
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  degree.style.visibility = 'visible';
  temperatureDescription.innerHTML = weatherData.weather[0].description;
}

// event handlers

locate.addEventListener('click', () => {
  if (cityInput.value != ''){
    status.style.visibility = 'hidden';
    cityData = cityInput.value;
    getWeather(cityData)
      .then(forecast => renderWeather(forecast));
    getVenues()
      .then(venues => renderVenues(venues));
  } else {
    status.style.visibility = 'visible';
    status.innerHTML = 'Please type in a city.';
  }
});

cityInput.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    locate.click();
  }
});
