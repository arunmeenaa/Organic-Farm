import api from "../api/axios";

export const getSellerDashboard = () => {
  return api.get("/dashboard/seller");
};

export const getBuyerDashboard = () => {
  return api.get("/dashboard/buyer");
};