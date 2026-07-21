const { GoogleGenAI } = require("@google/genai");
const systemPrompt = require("../prompts/systemPrompt");
const { getCachedAdvice, setCachedAdvice } = require("../utils/adviceCache");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateSellerAdvice(user, weather) {
  const cacheKey = [
    user.location,
    weather.temperature,
    weather.humidity,
    weather.condition,
  ].join("-");
  const cachedAdvice = getCachedAdvice(cacheKey);

  if (cachedAdvice) {
    return cachedAdvice;
  }
  const prompt = `
Location: ${user.location}

Weather:
Temperature: ${weather.temperature}°C
Condition: ${weather.description}
Humidity: ${weather.humidity}%
Wind: ${weather.windSpeed} m/s

Give exactly 3 short farming recommendations.

Return ONLY JSON.

{
  "advice": [
    "...",
    "...",
    "..."
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    config: {
      systemInstruction: systemPrompt(user),
    },
    contents: prompt,
  });

  const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const advice = JSON.parse(text);

    // Save in cache
    setCachedAdvice(cacheKey, advice);

    return advice;
  } catch (err) {
    console.error("Invalid JSON from Gemini:", text);

    const fallback = {
      advice: [
        "Monitor your crops regularly.",
        "Follow the local weather forecast before irrigation.",
        "Maintain proper soil moisture for healthy crop growth.",
      ],
    };

    setCachedAdvice(cacheKey, fallback);

    return fallback;
  }
}
async function chatWithAI(message, user, weather) {
  const prompt = `
User Role: ${user.role}
Location: ${user.location}

${
  weather
    ? `
Current Weather:
- City: ${weather.city}
- Temperature: ${weather.temperature}°C
- Condition: ${weather.condition}
- Description: ${weather.description}
- Humidity: ${weather.humidity}%
- Wind Speed: ${weather.windSpeed} m/s
`
    : ""
}

User Question:
${message}
If weather information is provided, use it when answering.
Only provide marketplace recommendations when they are relevant to the user's question.

If the user asks only for weather information, focus on weather and practical advice related to agriculture or produce storage. 
Do not promote the marketplace unless asked , and also do not give any type of advice or anything only provide weather information.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    config: {
      systemInstruction: systemPrompt(user),
    },
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  chatWithAI,
  generateSellerAdvice,
};
