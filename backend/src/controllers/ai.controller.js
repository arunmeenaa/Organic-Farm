const { chatWithAI } = require("../services/ai.service");

async function chat(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await chatWithAI(message, req.user);

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