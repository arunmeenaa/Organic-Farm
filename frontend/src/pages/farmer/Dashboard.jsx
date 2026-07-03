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
  Sprout,
  ArrowUpRight,
} from "lucide-react";
import { getFarmerDashboard } from "../../services/dashboard.service";
import toast from "react-hot-toast";

// Google Fonts: Fraunces (display/ledger numerals) + Inter (UI body) + IBM Plex Mono (data)
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; color: #23281F; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-rule { border-color: #DDD6C4; }
    .fd-ledger-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-top: 3px solid #1E3527;
      border-radius: 4px;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .fd-ledger-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -14px rgba(30, 53, 39, 0.35);
    }
    .fd-panel {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-radius: 6px;
    }
    .fd-panel-head {
      border-bottom: 1px solid #DDD6C4;
    }
    .fd-row {
      border-bottom: 1px solid #EFEBDD;
      transition: background 0.15s ease;
    }
    .fd-row:last-child { border-bottom: none; }
    .fd-row:hover { background: #FBFAF4; }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; }
    .fd-btn-primary:active { transform: scale(0.98); }

    .fd-tile {
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .fd-tile:hover { transform: translateY(-2px); box-shadow: 0 14px 28px -16px rgba(0,0,0,0.35); }

    .fd-badge-active {
      background: rgba(30, 53, 39, 0.08);
      color: #1E3527;
    }
    .fd-badge-inactive {
      background: rgba(181, 80, 46, 0.1);
      color: #B5502E;
    }
    .fd-badge-order {
      background: rgba(231, 168, 60, 0.16);
      color: #8A5A16;
    }

    .fd-skel {
      background: linear-gradient(90deg, #EFEBDD 25%, #F6F4EC 37%, #EFEBDD 63%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.4s ease infinite;
      border-radius: 4px;
    }
    @keyframes fd-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }

    .fd-stock-track {
      background: #EFEBDD;
      border-radius: 999px;
      overflow: hidden;
    }
    .fd-stock-fill {
      background: linear-gradient(90deg, #E7A83C, #1E3527);
      height: 100%;
      border-radius: 999px;
    }
  `}</style>
);

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

  const todayLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const statCards = [
    {
      key: "totalProducts",
      label: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      accent: "#1E3527",
    },
    {
      key: "activeProducts",
      label: "Active Products",
      value: stats?.activeProducts ?? 0,
      icon: CheckCircle,
      accent: "#2F5233",
    },
    {
      key: "totalOrders",
      label: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingBag,
      accent: "#8A5A16",
    },
    {
      key: "revenue",
      label: "Revenue",
      value: `₹${stats?.revenue ?? 0}`,
      icon: IndianRupee,
      accent: "#B5502E",
    },
  ];

  if (loading) {
    return (
      <div className="fd-root min-h-screen">
        <FontImport />
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="fd-skel h-10 w-72 mb-3" />
          <div className="fd-skel h-5 w-48 mb-10" />
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="fd-skel h-32" />
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="fd-skel h-80" />
            <div className="fd-skel h-80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b-2 fd-rule">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "#8A5A16" }}>
              <Sprout size={14} />
              <span>{todayLabel}</span>
            </div>
            <h1 className="fd-display text-4xl md:text-5xl font-semibold" style={{ color: "#1E3527" }}>
              Farmer Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back! Here's an overview of your farm.
            </p>
          </div>

          <button
            className="fd-btn-primary px-6 py-3 rounded-md flex items-center gap-2 font-medium shrink-0"
            onClick={() => navigate("/farmer/products/add")}
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="grid md:grid-cols-4 gap-5 mb-10 lg:col-span-2">
            {statCards.map(({ key, label, value, icon: Icon, accent }) => (
              <div key={key} className="fd-ledger-card p-6">
                <Icon size={26} style={{ color: accent }} className="mb-3" />
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
                  {label}
                </p>
                <h2 className="fd-display fd-mono text-3xl font-semibold" style={{ color: "#1E3527" }}>
                  {value}
                </h2>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="fd-panel">
            <div className="fd-panel-head p-6 flex items-center justify-between">
              <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E3527" }}>
                Recent Products
              </h2>
              <button
                onClick={() => navigate("/farmer/products")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#8A5A16" }}
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentProducts.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  <Package size={28} className="mx-auto mb-3 opacity-40" />
                  No products added yet. Add your first one to get started.
                </div>
              ) : (
                recentProducts.map((product) => {
                  const stockPct = Math.min(100, Number(product.quantity) || 0);
                  return (
                    <div key={product._id} className="fd-row p-5">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold" style={{ color: "#23281F" }}>
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-sm fd-mono">
                            ₹{product.price}/{product.unit}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-sm">Stock: {product.quantity}</p>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${
                              product.status === "Active"
                                ? "fd-badge-active"
                                : "fd-badge-inactive"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>
                      <div className="fd-stock-track h-1.5 w-full">
                        <div
                          className="fd-stock-fill"
                          style={{ width: `${stockPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Orders */}
          <div className="fd-panel">
            <div className="fd-panel-head p-6 flex items-center justify-between">
              <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E3527" }}>
                Recent Orders
              </h2>
              <button
                onClick={() => navigate("/farmer/orders")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#8A5A16" }}
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentOrders.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  <ShoppingBag size={28} className="mx-auto mb-3 opacity-40" />
                  No orders yet. New orders will show up here.
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="fd-row p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold fd-mono text-sm" style={{ color: "#23281F" }}>
                        {order.id}
                      </h3>
                      <p className="text-gray-500 text-sm">{order.buyer}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold fd-mono">{order.amount}</p>
                      <span className="fd-badge-order text-xs font-medium px-2 py-1 rounded-full inline-block mt-1">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="fd-display text-2xl font-semibold mb-5" style={{ color: "#1E3527" }}>
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            <button
              className="fd-tile rounded-md p-6 flex items-center justify-center gap-2 font-medium"
              style={{ background: "#1E3527", color: "#F6F4EC" }}
              onClick={() => navigate("/farmer/products/add")}
            >
              <Plus size={20} />
              Add Product
            </button>

            <button
              className="fd-tile rounded-md p-6 flex items-center justify-center gap-2 font-medium"
              style={{ background: "#2F5233", color: "#F6F4EC" }}
              onClick={() => navigate("/farmer/products")}
            >
              <Eye size={20} />
              View Products
            </button>

            <button
              className="fd-tile rounded-md p-6 flex items-center justify-center gap-2 font-medium"
              style={{ background: "#E7A83C", color: "#1E3527" }}
              onClick={() => navigate("/farmer/orders")}
            >
              <Clock size={20} />
              Manage Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;