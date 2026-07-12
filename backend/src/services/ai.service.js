const { GoogleGenAI } = require("@google/genai");
const systemPrompt = require("../prompts/systemPrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
    model: "gemini-3.5-flash",
    config: {
      systemInstruction: systemPrompt(user),
    },
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  chatWithAI,
};
