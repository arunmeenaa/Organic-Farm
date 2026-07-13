import api from "../api/axios";

export const sendMessage = (message) => {
  return api.post("/ai/chat", {
    message,
  });
};

export const getWeatherAdvice = () => {
  return api.get("/dashboard/farmer/weather-advice");
};