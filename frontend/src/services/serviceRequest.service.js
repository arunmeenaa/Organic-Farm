import api from "../api/axios";

export const createServiceRequest = (data) => {
  return api.post("/service-requests", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getServiceRequestById = (id) => api.get(`/service-requests/${id}`);

export const getMyServiceRequests = () => {
  return api.get("/service-requests/my");
};

export const cancelServiceRequest = (id) => {
  return api.patch(`/service-requests/${id}/cancel`);
};

export const deleteServiceRequest = (id) => {
  return api.delete(`/service-requests/${id}`);
};

export const getOpenServiceRequests = () => {
  return api.get("/service-requests/open");
};

export const submitQuotation = (id, data) => {
  return api.post(`/service-requests/${id}/quotation`, data);
};

  export const getSellerRequests = () => {
  return api.get("/service-requests/seller/all");
};