import api from "../api/axios";

export const getProducts = (params = {}) => {
  return api.get("/product", {
    params,
  });
};

export const getProductById = (id) => {
  return api.get(`/product/${id}`);
};

export const createProduct = (data) => {
  return api.post("/product", data);
};

export const updateProduct = (id, data) => {
  return api.patch(`/product/${id}`, data);
};

export const changeProductStatus = (id, data) => {
  return api.patch(`/product/${id}/status`, data);
};

export const getMyProducts = () => {
  return api.get("/product/me");
};