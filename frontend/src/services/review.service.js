import api from "../api/axios";

export const getProductReviews = (productId) => {
  return api.get(`/review/product/${productId}`);
};

export const createReview = (data) => {
  return api.post("/review", data);
};

export const updateReview = (reviewId, data) => {
  return api.patch(`/review/${reviewId}`, data);
};

export const deleteReview = (reviewId) => {
  return api.delete(`/review/${reviewId}`);
};