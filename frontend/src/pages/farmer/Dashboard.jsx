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

// Same direction as Farmer Profile / About: glassmorphism over a soft
// indigo/emerald/amber gradient mesh, gradient text, rounded display type.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 70% 50% at 10% 0%, rgba(99, 102, 241, 0.14), transparent),
        radial-gradient(ellipse 70% 50% at 90% 20%, rgba(16, 185, 129, 0.14), transparent),
        radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245, 158, 11, 0.08), transparent),
        #F5F6FA;
      color: #1E1B4B;
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-title-gradient {
      background: linear-gradient(90deg, #4338CA, #059669);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .fd-glass-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .fd-glass-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px -18px rgba(79, 70, 229, 0.3);
    }

    .fd-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    .fd-panel-head { border-bottom: 1px solid rgba(99, 102, 241, 0.14); }
    .fd-row {
      border-bottom: 1px solid rgba(99, 102, 241, 0.08);
      transition: background 0.15s ease;
    }
    .fd-row:last-child { border-bottom: none; }
    .fd-row:hover { background: rgba(99, 102, 241, 0.04); }

    .fd-btn-primary {
      background: linear-gradient(90deg, #4F46E5, #059669);
      color: white;
      box-shadow: 0 10px 24px -10px rgba(79, 70, 229, 0.5);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(79, 70, 229, 0.6); }
    .fd-btn-primary:active { transform: translateY(0); }

    .fd-tile {
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .fd-tile:hover { transform: translateY(-3px); box-shadow: 0 16px 32px -16px rgba(30, 27, 75, 0.35); }

    .fd-badge-active { background: rgba(16, 185, 129, 0.12); color: #059669; }
    .fd-badge-inactive { background: rgba(244, 63, 94, 0.1); color: #E11D48; }
    .fd-badge-order { background: rgba(245, 158, 11, 0.14); color: #B45309; }

    .fd-skel {
      background: linear-gradient(90deg, #E7E8F2 25%, #F5F6FA 37%, #E7E8F2 63%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.4s ease infinite;
      border-radius: 12px;
    }
    @keyframes fd-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }

    .fd-stock-track { background: #E7E8F2; border-radius: 999px; overflow: hidden; }
    .fd-stock-fill {
      background: linear-gradient(90deg, #6366F1, #10B981);
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
      accent: "#4F46E5",
    },
    {
      key: "activeProducts",
      label: "Active Products",
      value: stats?.activeProducts ?? 0,
      icon: CheckCircle,
      accent: "#059669",
    },
    {
      key: "totalOrders",
      label: "Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingBag,
      accent: "#B45309",
    },
    {
      key: "revenue",
      label: "Revenue",
      value: `₹${stats?.revenue ?? 0}`,
      icon: IndianRupee,
      accent: "#E11D48",
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6" style={{ borderBottom: "1px solid rgba(99, 102, 241, 0.18)" }}>
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "#B45309" }}>
              <Sprout size={14} />
              <span>{todayLabel}</span>
            </div>
            <h1 className="fd-display fd-title-gradient text-4xl md:text-5xl font-bold">
              Farmer Dashboard
            </h1>
            <p className="mt-2" style={{ color: "#5B5A87" }}>
              Welcome back! Here's an overview of your farm.
            </p>
          </div>

          <button
            className="fd-btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shrink-0"
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
              <div key={key} className="fd-glass-card rounded-2xl p-6">
                <Icon size={26} style={{ color: accent }} className="mb-3" />
                <p className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: "#8B8CA0" }}>
                  {label}
                </p>
                <h2 className="fd-display fd-mono text-3xl font-bold" style={{ color: "#1E1B4B" }}>
                  {value}
                </h2>
              </div>
            ))}
          </div>

          {/* Products */}
          <div className="fd-panel rounded-2xl">
            <div className="fd-panel-head p-6 flex items-center justify-between">
              <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E1B4B" }}>
                Recent Products
              </h2>
              <button
                onClick={() => navigate("/farmer/products")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#4F46E5" }}
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentProducts.length === 0 ? (
                <div className="p-10 text-center" style={{ color: "#8B8CA0" }}>
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
                          <h3 className="font-semibold" style={{ color: "#1E1B4B" }}>
                            {product.name}
                          </h3>
                          <p className="fd-mono text-sm" style={{ color: "#8B8CA0" }}>
                            ₹{product.price}/{product.unit}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-medium text-sm" style={{ color: "#1E1B4B" }}>
                            Stock: {product.quantity}
                          </p>
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
                        <div className="fd-stock-fill" style={{ width: `${stockPct}%` }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Orders */}
          <div className="fd-panel rounded-2xl">
            <div className="fd-panel-head p-6 flex items-center justify-between">
              <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E1B4B" }}>
                Recent Orders
              </h2>
              <button
                onClick={() => navigate("/farmer/orders")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#4F46E5" }}
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentOrders.length === 0 ? (
                <div className="p-10 text-center" style={{ color: "#8B8CA0" }}>
                  <ShoppingBag size={28} className="mx-auto mb-3 opacity-40" />
                  No orders yet. New orders will show up here.
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="fd-row p-5 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold fd-mono text-sm" style={{ color: "#1E1B4B" }}>
                        {order.id}
                      </h3>
                      <p className="text-sm" style={{ color: "#8B8CA0" }}>{order.buyer}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold fd-mono" style={{ color: "#1E1B4B" }}>
                        {order.amount}
                      </p>
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
          <h2 className="fd-display text-2xl font-semibold mb-5" style={{ color: "#1E1B4B" }}>
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            <button
              className="fd-tile rounded-xl p-6 flex items-center justify-center gap-2 font-semibold"
              style={{ background: "linear-gradient(135deg, #4F46E5, #4338CA)", color: "white" }}
              onClick={() => navigate("/farmer/products/add")}
            >
              <Plus size={20} />
              Add Product
            </button>

            <button
              className="fd-tile rounded-xl p-6 flex items-center justify-center gap-2 font-semibold"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "white" }}
              onClick={() => navigate("/farmer/products")}
            >
              <Eye size={20} />
              View Products
            </button>

            <button
              className="fd-tile rounded-xl p-6 flex items-center justify-center gap-2 font-semibold"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "white" }}
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