import api from "../api/axios";

export const getFarmerDashboard = () => {
  return api.get("/dashboard/farmer");
};

export const getBuyerDashboard = () => {
  return api.get("/dashboard/buyer");
};