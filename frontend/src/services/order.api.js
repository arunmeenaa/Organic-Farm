import api from "../api/axios";

export const placeOrder = (data) => {
  return api.post("/orders", data);
};

export const getMyOrders = () => {
  return api.get("/orders/me");
};

export const getOrder = (id) => {
  return api.get(`/orders/${id}`);
};