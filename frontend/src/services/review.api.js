import api from "../api/axios";

export const createReview = (data) => {
  return api.post("/reviews", data);
};

export const updateReview = (id, data) => {
  return api.patch(`/reviews/${id}`, data);
};

export const deleteReview = (id) => {
  return api.delete(`/reviews/${id}`);
};