import api from "../api/axios";

export const sendMessage = (message) => {
  return api.post("/ai/chat", {
    message,
  });
};