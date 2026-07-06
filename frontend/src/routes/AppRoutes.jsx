import { Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoutes";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Products from "../components/product/Products";
import ProductDetails from "../components/product/ProductDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Machines from "../pages/machine/Machines";
import MachineDetails from "../pages/machine/MachineDetails";

import ProtectedRoute from "./ProtectedRoute";

import BuyerRoute from "./BuyerRoute";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import Cart from "../pages/buyer/Cart";
import MyOrders from "../pages/buyer/MyOrders";
import BuyerProfile from "../pages/buyer/BuyerProfile";
import Checkout from "../pages/buyer/Checkout";
import BuyerOrderDetails from "../pages/buyer/OrderDetails";
import OrderSuccess from "../components/order/OrderSuccess";
import BookMachine from "../pages/machine/BookMachine";
import MyMachineBookings from "../pages/buyer/MyMachineBookings";

import FarmerRoute from "./FarmerRoute";
import Dashboard from "../pages/farmer/Dashboard";
import MyProducts from "../pages/farmer/MyProducts";
import EditProduct from "../pages/farmer/EditProduct";
import AddProduct from "../pages/farmer/AddProduct";
import FarmerProfile from "../pages/farmer/FarmerProfile";
import FarmerOrders from "../pages/farmer/Order";
import FarmerOrdersDetails from "../components/order/FarmerOrderDetails";
import FarmerMachines from "../pages/farmer/MyMachines";
import AddMachine from "../pages/farmer/AddMachine";
import EditMachine from "../pages/farmer/EditMachine";
import FarmerMachineBookings from "../pages/farmer/FarmerMachineBookings";
import MachineBookingDetails from "../pages/machine/MachineBookingDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/machines/:id" element={<MachineDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/machine-bookings/:id"
            element={<MachineBookingDetails />}
          />
          <Route element={<BuyerRoute />}>
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<BuyerOrderDetails />} />
            <Route path="/buyer/profile" element={<BuyerProfile />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/machines/book/:id" element={<BookMachine />} />
            <Route
              path="/buyer/machine-bookings"
              element={<MyMachineBookings />}
            />
          </Route>

          <Route element={<FarmerRoute />}>
            <Route path="/farmer/dashboard" element={<Dashboard />} />
            <Route path="/farmer/products" element={<MyProducts />} />
            <Route path="/farmer/products/add" element={<AddProduct />} />
            <Route path="/farmer/products/edit/:id" element={<EditProduct />} />
            <Route path="/farmer/profile" element={<FarmerProfile />} />
            <Route path="/farmer/orders" element={<FarmerOrders />} />
            <Route
              path="/farmer/orders/:id"
              element={<FarmerOrdersDetails />}
            />
            <Route path="/farmer/machines" element={<FarmerMachines />} />
            <Route path="/farmer/machines/add" element={<AddMachine />} />
            <Route path="/farmer/machine/edit/:id" element={<EditMachine />} />
            <Route
              path="/farmer/machine-bookings"
              element={<FarmerMachineBookings />}
            />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
