import api from "../api/axios";

export const getBuyerOrders = () =>
  api.get("/service-orders/buyer");

export const getSellerOrders = () =>
  api.get("/service-orders/seller");

export const getServiceOrderById = (id) =>
  api.get(`/service-orders/${id}`);

export const startWork = (id) =>
  api.patch(`/service-orders/${id}/start`);

export const completeWork = (id) =>
  api.patch(`/service-orders/${id}/complete`);

export const confirmCompletion = (id) =>
  api.patch(`/service-orders/${id}/confirm`);

export const getServiceOrderByRequestId = (requestId) => {
  return api.get(`/service-orders/request/${requestId}`);
};