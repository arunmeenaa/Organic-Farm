import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const { data } = await getCart();

      setCart(data.cart?.items || []);
      setTotalItems(data.totalItems || 0);
      setSubtotal(data.subtotal || 0);
    } catch (err) {
      setCart([]);
      setTotalItems(0);
      setSubtotal(0);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product, quantity) => {
    
    try {
      const { data } = await addToCart({
        product,
        quantity,
      });

      setCart(data.cart.items);
      setTotalItems(data.totalItems);
      setSubtotal(data.subtotal);

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const { data } = await updateCartItem(productId, quantity);

      setCart(data.cart.items);
      setTotalItems(data.totalItems);
      setSubtotal(data.subtotal);

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      const { data } = await removeCartItem(productId);

      setCart(data.cart.items);
      setTotalItems(data.totalItems);
      setSubtotal(data.subtotal);

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove item");
    }
  };

  const clear = async () => {
    try {
      const { data } = await clearCart();

      setCart([]);
      setTotalItems(0);
      setSubtotal(0);

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to clear cart");
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "buyer") {
      fetchCart();
    } else {
      setCart([]);
      setTotalItems(0);
      setSubtotal(0);
    }
  }, [isAuthenticated, user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
