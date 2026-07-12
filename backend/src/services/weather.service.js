const axios = require("axios");

const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function getCurrentWeather(city) {
  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric",
      },
    });

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description,
    };
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch weather."
    );
  }
}

module.exports = {
  getCurrentWeather,
};