import api from "../api/axios";

export const createService = (data) => {
  return api.post("/service", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getAllServices = (params) => api.get("/service", { params });
export const getMyServices = () => api.get("/service/my-services");
export const getServiceById = (id) => api.get(`/service/${id}`);
export const updateService = (id, data) => {
  return api.patch(`/service/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteService = (id) => api.delete(`/service/${id}`);
