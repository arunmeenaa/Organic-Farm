const { chatWithAI } = require("../services/ai.service");
const { getCurrentWeather } = require("../services/weather.service");

function isWeatherQuestion(message) {
  const keywords = [
    "weather",
    "rain",
    "temperature",
    "forecast",
    "humidity",
    "wind",
    "climate",
    "hot",
    "cold",
    "irrigation",
    "irrigate",
  ];

  const text = message.toLowerCase();

  return keywords.some((keyword) => text.includes(keyword));
}
async function chat(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    let weather = null;

    if (isWeatherQuestion(message)) {
      weather = await getCurrentWeather(req.user.location);
    }

    const reply = await chatWithAI(message, req.user, weather);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  chat,
};
