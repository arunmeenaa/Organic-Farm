import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoutes";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProductDetails from "../components/product/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MachineDetails from "../pages/machine/MachineDetails";
import Marketplace from "../pages/buyer/MarketPlace";

import ProtectedRoute from "./ProtectedRoute";
import AllNotification from "../components/notification/AllNotification";
import AIAssistant from "../pages/AIAssistant";
import Profile from "../pages/UserProfile";

import BuyerRoute from "./BuyerRoute";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import Cart from "../pages/buyer/Cart";
import MyOrders from "../pages/buyer/MyOrders";

import Checkout from "../pages/buyer/Checkout";
import BuyerOrderDetails from "../pages/buyer/OrderDetails";
import OrderSuccess from "../components/order/OrderSuccess";
import BookMachine from "../pages/machine/BookMachine";

import SellerRoute from "./SellerRoute";
import Dashboard from "../pages/seller/Dashboard";
import EditProduct from "../pages/seller/EditProduct";
import AddProduct from "../pages/seller/AddProduct";

import SellerOrders from "../pages/seller/Order";
import SellerOrdersDetails from "../components/order/SellerOrderDetails";
import MyInventory from "../pages/seller/MyInventory";
import AddMachine from "../pages/seller/AddMachine";
import EditMachine from "../pages/seller/EditMachine";
import MachineBookingDetails from "../pages/machine/MachineBookingDetails";
import AddService from "../pages/service/AddService";
import EditService from "../pages/service/EditService";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/machines/:id" element={<MachineDetails />} />
        <Route path="/market-place" element={<Marketplace />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/machine-bookings/:id"
            element={<MachineBookingDetails />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/notifications" element={<AllNotification />} />
          <Route element={<BuyerRoute />}>
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<BuyerOrderDetails />} />

            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/machines/book/:id" element={<BookMachine />} />
          </Route>

          <Route element={<SellerRoute />}>
            <Route path="/seller/dashboard" element={<Dashboard />} />

            {/* Products */}
            <Route path="/seller/products/add" element={<AddProduct />} />
            <Route path="/seller/products/edit/:id" element={<EditProduct />} />
            <Route path="/seller/inventory" element={<MyInventory />} />

            {/* Orders */}
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route
              path="/seller/orders/:id"
              element={<SellerOrdersDetails />}
            />

            {/* Machines */}
            <Route path="/seller/machines/add" element={<AddMachine />} />
            <Route path="/seller/machine/edit/:id" element={<EditMachine />} />

            {/* Services */}

            <Route path="/seller/services/add" element={<AddService />} />
            <Route path="/seller/services/edit/:id" element={<EditService />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
