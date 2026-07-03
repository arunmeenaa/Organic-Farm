import api from "../api/axios";

export const getCart = () => {
  return api.get("/cart");
};

export const addToCart = (data) => {
  return api.post("/cart", data);
};

export const updateCartItem = (productId, quantity) => {
  return api.patch(`/cart/${productId}`, {
    quantity,
  });
};

export const removeCartItem = (productId) => {
  return api.delete(`/cart/${productId}`);
};

export const clearCart = () => {
  return api.delete("/cart");
};