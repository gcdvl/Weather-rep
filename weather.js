
const apiKey = "E7QHA33PAP5K7PV4EPGC8MGW8";

// Get HTML elements
const form = document.getElementById("weather-form");
const input = document.getElementById("location-input");
const weatherContainer = document.getElementById("weather-container");
const loading = document.getElementById("loading");

// Listen for form submit
form.addEventListener("submit", (event) => {

  event.preventDefault(); // Stop page refresh

  const location = input.value; // Get user input

  getWeather(location); // Fetch weather

  input.value = ""; // Clear input field
});

// Fetch weather data from API
async function getWeather(location) {

  loading.classList.remove("hidden"); // Show loading text

  weatherContainer.innerHTML = ""; // Clear old weather data

  try {

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`,
      { mode: "cors" }
    );

    const data = await response.json(); // Convert to JSON

    const weather = processWeatherData(data); // Extract needed data

    displayWeather(weather); // Show data on webpage

  } catch (error) {

    weatherContainer.innerHTML = `
      <p>Failed to fetch weather data.</p>
    `;

    console.log(error);

  }

  loading.classList.add("hidden"); // Hide loading text
}

// Extract only useful data
function processWeatherData(data) {

  return {

    location: data.resolvedAddress,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,

  };
}

// Display weather on webpage
function displayWeather(weather) {

  weatherContainer.innerHTML = `

    <div class="weather-card">

      <h2>${weather.location}</h2>

      <p><strong>Temperature:</strong> ${weather.temp}°C</p>

      <p><strong>Conditions:</strong> ${weather.conditions}</p>

      <p><strong>Humidity:</strong> ${weather.humidity}%</p>

      <p><strong>Wind Speed:</strong> ${weather.windSpeed} km/h</p>

    </div>

  `;
}

