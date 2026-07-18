import api from "../api/axios";

// Buyer
export const placeOrder = (data) => {
  return api.post("/orders", data);
};

export const getMyOrders = () => {
  return api.get("/orders/");
};

export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

export const cancelOrder = (id, data) => {
  return api.patch(`/orders/${id}/cancel`, data);
};

// seller
export const getsellerOrders = () => {
  return api.get("/orders/seller");
};

export const updateOrderStatus = (id, status) => {
  return api.put(`/orders/${id}/status`, {
    status,
  });
};