import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Products from "../components/product/Products";
import ProductDetails from "../components/product/ProductDetails";

import ProtectedRoute from "./ProtectedRoute";


import BuyerRoute from "./BuyerRoute";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import Cart from "../pages/buyer/Cart";
import MyOrders from "../pages/buyer/MyOrders";
import BuyerProfile from "../pages/buyer/BuyerProfile";

import FarmerRoute from "./FarmerRoute";
import Dashboard from "../pages/farmer/Dashboard";
import MyProducts from "../pages/farmer/MyProducts";
import AddProduct from "../pages/farmer/AddProduct";
import FarmerProfile from "../pages/farmer/FarmerProfile";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<BuyerRoute />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/profile" element={<BuyerProfile />} />
        </Route>

        <Route element={<FarmerRoute />}>
          <Route path="/farmer/dashboard" element={<Dashboard />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/profile" element={<FarmerProfile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
