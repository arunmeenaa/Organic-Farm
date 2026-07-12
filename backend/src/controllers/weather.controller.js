const { getCurrentWeather } = require("../services/weather.service");

async function weather(req, res) {
  try {
    const weather = await getCurrentWeather(req.user.location);

    res.json({
      success: true,
      weather,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}