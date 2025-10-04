const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

document.getElementById("searchBtn").addEventListener("click", getWeather);
document.getElementById("cityInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherResult");
  const locationEl = document.getElementById("location");
  const tempEl = document.getElementById("temperature");
  const condEl = document.getElementById("condition");
  const humidityEl = document.getElementById("humidity");
  const windEl = document.getElementById("wind");

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();

    if (data.cod !== 200 && data.cod !== "200") {
      alert(data.message || "City not found.");
      return;
    }

    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${data.main.temp.toFixed(1)} °C`;
    condEl.textContent = data.weather[0].main;
    humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;
    windEl.textContent = `💨 Wind: ${data.wind.speed} m/s`;

    weatherInfo.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again later.");
  }
}
