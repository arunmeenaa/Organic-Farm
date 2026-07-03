import api from "../api/axios";

export const getProducts = (params = {}) => {
  return api.get("/product", {
    params,
  });
};

export const getProductById = (id) => {
  return api.get(`/product/${id}`);
};

export const createProduct = (formData) => {
  return api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
