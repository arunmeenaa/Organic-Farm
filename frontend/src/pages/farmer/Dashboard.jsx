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
  Thermometer,
  Droplets,
  Wind,
  MapPin,
  Sparkles,
} from "lucide-react";

import { getFarmerDashboard } from "../../services/dashboard.service";
import { getWeatherAdvice } from "../../services/ai.service";
import toast from "react-hot-toast";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 70% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 70% 50% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245, 158, 11, 0.08), transparent),
        #F4F9F2;
      color: #0F2E22;
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
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
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }

    .fd-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    .fd-panel-head { border-bottom: 1px solid rgba(5, 150, 105, 0.14); }
    .fd-row {
      border-bottom: 1px solid rgba(5, 150, 105, 0.08);
      transition: background 0.15s ease;
    }
    .fd-row:last-child { border-bottom: none; }
    .fd-row:hover { background: rgba(5, 150, 105, 0.04); }

    .fd-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 24px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(5, 150, 105, 0.55); }
    .fd-btn-primary:active { transform: translateY(0); }

    .fd-tile {
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .fd-tile:hover { transform: translateY(-3px); box-shadow: 0 16px 32px -16px rgba(15, 46, 34, 0.35); }

    .fd-badge-active   { background: rgba(5, 150, 105, 0.12); color: #059669; }
    .fd-badge-inactive { background: rgba(225, 29, 72, 0.1);  color: #E11D48; }
    .fd-badge-order    { background: rgba(245, 158, 11, 0.14); color: #B45309; }

    /* Full-page shimmer skeleton */
    .fd-skel {
      background: linear-gradient(90deg, #E3EFE4 25%, #F4F9F2 37%, #E3EFE4 63%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.4s ease infinite;
      border-radius: 12px;
    }

    /* Inline skeleton for weather / advice — narrower pulse */
    .fd-skel-inline {
      background: linear-gradient(90deg, rgba(5,150,105,0.08) 25%, rgba(5,150,105,0.03) 50%, rgba(5,150,105,0.08) 75%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.6s ease infinite;
      border-radius: 8px;
    }

    @keyframes fd-shimmer {
      0%   { background-position: 100% 50%; }
      100% { background-position: 0   50%; }
    }

    .fd-stock-track { background: #E3EFE4; border-radius: 999px; overflow: hidden; }
    .fd-stock-fill  {
      background: linear-gradient(90deg, #059669, #84CC16);
      height: 100%;
      border-radius: 999px;
    }

    .fd-weather-pill {
      background: rgba(255,255,255,0.55);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(5, 150, 105, 0.16);
    }
  `}</style>
);

// ── Skeleton shown while weather/advice loads ────────────────────────────────
const WeatherSkeleton = () => (
  <div className="flex items-center gap-3 mt-4">
    <div className="fd-skel-inline h-5 w-24" />
    <div className="fd-skel-inline h-5 w-28" />
    <div className="fd-skel-inline h-5 w-20" />
    <div className="fd-skel-inline h-5 w-16" />
  </div>
);

const AdviceSkeleton = () => (
  <div className="p-6 grid sm:grid-cols-2 gap-3">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="fd-skel-inline h-10" />
    ))}
  </div>
);
// ────────────────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate();

  // ── Stage 1: farmer data (stats / products / orders) ──
  const [stats, setStats] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true); // full-page skeleton

  // ── Stage 2: external API data (weather / advice) ──────
  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(true); // inline skeletons

  // ── Stage 1: fetch farmer data first ────────────────────
  const fetchDashboard = async () => {
    try {
      const { data } = await getFarmerDashboard();
      setStats(data.stats);
      setRecentProducts(data.recentProducts);
      setRecentOrders(data.recentOrders);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false); // page becomes visible immediately after this
    }
  };

  // ── Stage 2: fetch weather + advice after farmer data is ready ──
  const fetchWeatherAdvice = async () => {
    setWeatherLoading(true);
    try {
      const { data } = await getWeatherAdvice();
      setWeather(data.weather);
      setAdvice(data.advice);
    } catch (err) {
      // Non-critical — weather/advice failure shouldn't break the dashboard
      console.error("Weather/advice fetch failed:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    // Kick off farmer data first; when it resolves, then fetch weather+advice
    fetchDashboard().then(() => fetchWeatherAdvice());
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
      accent: "#059669",
    },
    {
      key: "activeProducts",
      label: "Active Products",
      value: stats?.activeProducts ?? 0,
      icon: CheckCircle,
      accent: "#65A30D",
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
      accent: "#0F766E",
    },
  ];

  // ── Full-page skeleton only while Stage 1 is loading ────
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
        {/* ── Masthead ── */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6"
          style={{ borderBottom: "1px solid rgba(5, 150, 105, 0.18)" }}
        >
          <div className="flex-1">
            <div
              className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.2em] font-semibold"
              style={{ color: "#B45309" }}
            >
              <Sprout size={14} />
              <span>{todayLabel}</span>
            </div>

            <h1 className="fd-display fd-title-gradient text-4xl md:text-5xl font-bold">
              Farmer Dashboard
            </h1>

            <p className="mt-2" style={{ color: "#5B7A6A" }}>
              Welcome back! Here's an overview of your farm.
            </p>

            {/* Weather strip — shows skeleton while Stage 2 loads */}
            <div className="mt-4">
              {weatherLoading ? (
                <WeatherSkeleton />
              ) : weather ? (
                <div className="fd-weather-pill inline-flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Thermometer size={15} style={{ color: "#059669" }} />
                    <span
                      className="fd-mono font-semibold text-sm"
                      style={{ color: "#0F2E22" }}
                    >
                      {weather.temperature}°C
                    </span>
                    <span
                      className="text-sm capitalize"
                      style={{ color: "#5B7A6A" }}
                    >
                      {weather.description}
                    </span>
                  </div>

                  <span style={{ color: "rgba(5,150,105,0.25)" }}>|</span>

                  <div className="flex items-center gap-1.5">
                    <Droplets size={14} style={{ color: "#0F766E" }} />
                    <span className="text-sm" style={{ color: "#5B7A6A" }}>
                      {weather.humidity}% humidity
                    </span>
                  </div>

                  <span style={{ color: "rgba(5,150,105,0.25)" }}>|</span>

                  <div className="flex items-center gap-1.5">
                    <Wind size={14} style={{ color: "#65A30D" }} />
                    <span className="text-sm" style={{ color: "#5B7A6A" }}>
                      {weather.windSpeed} m/s
                    </span>
                  </div>

                  <span style={{ color: "rgba(5,150,105,0.25)" }}>|</span>

                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} style={{ color: "#B45309" }} />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#5B7A6A" }}
                    >
                      {weather.city}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <button
            className="fd-btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shrink-0"
            onClick={() => navigate("/farmer/products/add")}
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* ── Stat Cards — visible immediately after Stage 1 ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {statCards.map(({ key, label, value, icon: Icon, accent }) => (
            <div key={key} className="fd-glass-card rounded-2xl p-6">
              <Icon size={26} style={{ color: accent }} className="mb-3" />
              <p
                className="text-xs uppercase tracking-wider font-medium mb-1"
                style={{ color: "#7A8D82" }}
              >
                {label}
              </p>
              <h2
                className="fd-display fd-mono text-3xl font-bold"
                style={{ color: "#0F2E22" }}
              >
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* ── Products + Orders — visible immediately after Stage 1 ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Products */}
          <div className="fd-panel rounded-2xl">
            <div className="fd-panel-head p-6 flex items-center justify-between">
              <h2
                className="fd-display text-2xl font-semibold"
                style={{ color: "#0F2E22" }}
              >
                Recent Products
              </h2>
              <button
                onClick={() => navigate("/farmer/products")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#059669" }}
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentProducts.length === 0 ? (
                <div className="p-10 text-center" style={{ color: "#7A8D82" }}>
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
                          <h3
                            className="font-semibold"
                            style={{ color: "#0F2E22" }}
                          >
                            {product.name}
                          </h3>
                          <p
                            className="fd-mono text-sm"
                            style={{ color: "#7A8D82" }}
                          >
                            ₹{product.price}/{product.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-medium text-sm"
                            style={{ color: "#0F2E22" }}
                          >
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
          <div className="fd-panel rounded-2xl">
            <div className="fd-panel-head p-6 flex items-center justify-between">
              <h2
                className="fd-display text-2xl font-semibold"
                style={{ color: "#0F2E22" }}
              >
                Recent Orders
              </h2>
              <button
                onClick={() => navigate("/farmer/orders")}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#059669" }}
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentOrders.length === 0 ? (
                <div className="p-10 text-center" style={{ color: "#7A8D82" }}>
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
                      <h3
                        className="font-semibold fd-mono text-sm"
                        style={{ color: "#0F2E22" }}
                      >
                        {order.id}
                      </h3>
                      <p className="text-sm" style={{ color: "#7A8D82" }}>
                        {order.buyer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-semibold fd-mono"
                        style={{ color: "#0F2E22" }}
                      >
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

        {/* ── AI Recommendations — skeleton while Stage 2 loads ── */}
        <div className="fd-panel rounded-2xl mb-8">
          <div className="fd-panel-head p-6 flex items-center gap-2">
            <Sparkles size={18} style={{ color: "#B45309" }} />
            <h2
              className="fd-display text-2xl font-semibold"
              style={{ color: "#0F2E22" }}
            >
              AI Recommendations
            </h2>
          </div>

          {weatherLoading ? (
            <AdviceSkeleton />
          ) : advice.length > 0 ? (
            <ul className="p-6 grid sm:grid-cols-2 gap-3">
              {advice.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(5,150,105,0.05)" }}
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: "#059669" }}
                  />
                  <span className="text-sm" style={{ color: "#2D4A3A" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-sm" style={{ color: "#7A8D82" }}>
              No recommendations available right now.
            </p>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <h2
            className="fd-display text-2xl font-semibold mb-5"
            style={{ color: "#0F2E22" }}
          >
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <button
              className="fd-tile rounded-xl p-6 flex items-center justify-center gap-2 font-semibold"
              style={{
                background: "linear-gradient(135deg, #059669, #047857)",
                color: "white",
              }}
              onClick={() => navigate("/farmer/products/add")}
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              className="fd-tile rounded-xl p-6 flex items-center justify-center gap-2 font-semibold"
              style={{
                background: "linear-gradient(135deg, #84CC16, #65A30D)",
                color: "#063527",
              }}
              onClick={() => navigate("/farmer/products")}
            >
              <Eye size={20} />
              View Products
            </button>
            <button
              className="fd-tile rounded-xl p-6 flex items-center justify-center gap-2 font-semibold"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "white",
              }}
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
