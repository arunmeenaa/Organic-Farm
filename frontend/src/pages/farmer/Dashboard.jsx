import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  Plus,
  Eye,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getFarmerDashboard } from "../../services/dashboard.service";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await getFarmerDashboard();

      setStats(data.stats);
      setRecentProducts(data.recentProducts);
      setRecentOrders(data.recentOrders);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Farmer Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Welcome back! Here's an overview of your farm.
              </p>
            </div>

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              onClick={() => navigate("/farmer/products/add")}
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Stats */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-2xl p-6 shadow">
                <Package size={30} className="text-green-600 mb-2" />
                <p className="text-gray-500">Total Products</p>
                <h2 className="text-3xl font-bold">
                  {stats?.totalProducts ?? 0}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <CheckCircle size={30} className="text-blue-600 mb-2" />
                <p className="text-gray-500">Active Products</p>
                <h2 className="text-3xl font-bold">
                  {stats?.activeProducts ?? 0}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <ShoppingBag size={30} className="text-yellow-600 mb-2" />
                <p className="text-gray-500">Orders</p>
                <h2 className="text-3xl font-bold">
                  {stats?.totalOrders ?? 0}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <IndianRupee size={30} className="text-purple-600 mb-2" />
                <p className="text-gray-500">Revenue</p>
                <h2 className="text-3xl font-bold">₹{stats?.revenue ?? 0}</h2>
              </div>
            </div>

            {/* Products */}

            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Recent Products</h2>
              </div>

              <div className="divide-y">
                {recentProducts.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No products added yet.
                  </div>
                ) : (
                  recentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="p-5 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>

                        <p className="text-gray-500 text-sm">
                          ₹{product.price}/{product.unit}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">Stock: {product.quantity}</p>

                        <span
                          className={`text-sm ${
                            product.status === "Active"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Orders */}

            <div className="bg-white rounded-2xl shadow">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Recent Orders</h2>
              </div>

              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>

                      <p className="text-gray-500 text-sm">{order.buyer}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>

                      <span className="text-green-600 text-sm">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}

          <div className="mt-10 bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>

            <div className="grid sm:grid-cols-3 gap-5">
              <button
                className="bg-green-600 text-white rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-green-700"
                onClick={() => navigate("/farmer/products/add")}
              >
                <Plus size={20} />
                Add Product
              </button>

              <button
                className="bg-blue-600 text-white rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-blue-700"
                onClick={() => navigate("/farmer/products")}
              >
                <Eye size={20} />
                View Products
              </button>

              <button
                className="bg-yellow-500 text-white rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-yellow-600"
                onClick={() => navigate("/farmer/orders")}
              >
                <Clock size={20} />
                Manage Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
