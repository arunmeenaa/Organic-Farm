const { GoogleGenAI } = require("@google/genai");
const systemPrompt = require("../prompts/systemPrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function chatWithAI(message, user) {
 
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    config: {
      systemInstruction: systemPrompt(user),
    },
    contents: message,
  });

  return response.text;
}

module.exports = {
  chatWithAI,
};
