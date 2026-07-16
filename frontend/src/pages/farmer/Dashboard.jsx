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

// ── Skeleton shimmer (minimal — only the keyframe, no layout classes) ─────────
const ShimmerStyle = () => (
  <style>{`
    @keyframes fd-shimmer {
      0%   { background-position: 100% 50%; }
      100% { background-position: 0%   50%; }
    }
    .fd-skel {
      background: linear-gradient(90deg, #E3EFE4 25%, #F4F9F2 37%, #E3EFE4 63%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.4s ease infinite;
      border-radius: 12px;
    }
    .dark .fd-skel {
      background: linear-gradient(90deg, #1f2d25 25%, #162019 37%, #1f2d25 63%);
      background-size: 400% 100%;
    }
    .fd-skel-inline {
      background: linear-gradient(90deg, rgba(5,150,105,0.10) 25%, rgba(5,150,105,0.03) 50%, rgba(5,150,105,0.10) 75%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.6s ease infinite;
      border-radius: 8px;
    }
    .dark .fd-skel-inline {
      background: linear-gradient(90deg, rgba(5,150,105,0.18) 25%, rgba(5,150,105,0.06) 50%, rgba(5,150,105,0.18) 75%);
      background-size: 400% 100%;
    }
  `}</style>
);

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };
const mono    = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

// ── Weather Skeleton ──────────────────────────────────────────────────────────
const WeatherSkeleton = () => (
  <div className="flex items-center gap-3 mt-4">
    <div className="fd-skel-inline h-5 w-24" />
    <div className="fd-skel-inline h-5 w-28" />
    <div className="fd-skel-inline h-5 w-20" />
    <div className="fd-skel-inline h-5 w-16" />
  </div>
);

// ── Advice Skeleton ───────────────────────────────────────────────────────────
const AdviceSkeleton = () => (
  <div className="p-6 grid sm:grid-cols-2 gap-3">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="fd-skel-inline h-10" />
    ))}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();

  // ── Stage 1: farmer data (stats / products / orders) ──
  const [stats, setStats]                 = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders]   = useState([]);
  const [loading, setLoading]             = useState(true);

  // ── Stage 2: external API data (weather / advice) ──────
  const [weather, setWeather]             = useState(null);
  const [advice, setAdvice]               = useState([]);
  const [weatherLoading, setWeatherLoading] = useState(true);

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

  const fetchWeatherAdvice = async () => {
    setWeatherLoading(true);
    try {
      const { data } = await getWeatherAdvice();
      setWeather(data.weather);
      setAdvice(data.advice);
    } catch (err) {
      console.error("Weather/advice fetch failed:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard().then(() => fetchWeatherAdvice());
  }, []);

  const todayLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const statCards = [
    { key: "totalProducts",  label: "Total Products",  value: stats?.totalProducts ?? 0,        icon: Package,     accent: "text-emerald-600 dark:text-emerald-400" },
    { key: "activeProducts", label: "Active Products", value: stats?.activeProducts ?? 0,        icon: CheckCircle, accent: "text-lime-600 dark:text-lime-400" },
    { key: "totalOrders",    label: "Orders",          value: stats?.totalOrders ?? 0,           icon: ShoppingBag, accent: "text-amber-700 dark:text-amber-500" },
    { key: "revenue",        label: "Revenue",         value: `₹${stats?.revenue ?? 0}`,         icon: IndianRupee, accent: "text-teal-700 dark:text-teal-400" },
  ];

  // ── Full-page skeleton ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen  font-sans">
        <FontLink />
        <ShimmerStyle />
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="fd-skel h-10 w-72 mb-3" />
          <div className="fd-skel h-5 w-48 mb-10" />
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {[0, 1, 2, 3].map((i) => <div key={i} className="fd-skel h-32" />)}
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
    <div className="min-h-screen  text-foreground font-sans">
      <FontLink />
      <ShimmerStyle />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Masthead ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-emerald-500/20 dark:border-emerald-700/25">
          <div className="flex-1">

            {/* Date label */}
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.2em] font-semibold text-amber-700 dark:text-amber-500">
              <Sprout size={14} />
              <span>{todayLabel}</span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent"
              style={display}
            >
              Farmer Dashboard
            </h1>

            <p className="mt-2 text-emerald-900/60 dark:text-emerald-300/70">
              Welcome back! Here's an overview of your farm.
            </p>

            {/* Weather strip */}
            <div className="mt-4">
              {weatherLoading ? (
                <WeatherSkeleton />
              ) : weather ? (
                <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 rounded-2xl bg-white/55 dark:bg-white/5 backdrop-blur-md border border-emerald-500/16 dark:border-emerald-700/30">

                  <div className="flex items-center gap-2">
                    <Thermometer size={15} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-sm text-emerald-950 dark:text-white" style={mono}>
                      {weather.temperature}°C
                    </span>
                    <span className="text-sm capitalize text-emerald-800/70 dark:text-emerald-300/70">
                      {weather.description}
                    </span>
                  </div>

                  <span className="text-emerald-500/30">|</span>

                  <div className="flex items-center gap-1.5">
                    <Droplets size={14} className="text-teal-700 dark:text-teal-400" />
                    <span className="text-sm text-emerald-800/70 dark:text-emerald-300/70">
                      {weather.humidity}% humidity
                    </span>
                  </div>

                  <span className="text-emerald-500/30">|</span>

                  <div className="flex items-center gap-1.5">
                    <Wind size={14} className="text-lime-600 dark:text-lime-400" />
                    <span className="text-sm text-emerald-800/70 dark:text-emerald-300/70">
                      {weather.windSpeed} m/s
                    </span>
                  </div>

                  <span className="text-emerald-500/30">|</span>

                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-amber-700 dark:text-amber-500" />
                    <span className="text-sm font-medium text-emerald-800/70 dark:text-emerald-300/70">
                      {weather.city}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {statCards.map(({ key, label, value, icon: Icon, accent }) => (
            <div
              key={key}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <Icon size={26} className={`${accent} mb-3`} />
              <p className="text-xs uppercase tracking-wider font-medium mb-1 text-slate-500 dark:text-slate-400">
                {label}
              </p>
              <h2
                className="text-3xl font-bold text-emerald-950 dark:text-white"
                style={{ ...display, ...mono }}
              >
                {value}
              </h2>
            </div>
          ))}
        </div>

        {/* ── Products + Orders ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Products Panel */}
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl">
            <div className="flex items-center justify-between p-6 border-b border-emerald-500/14 dark:border-emerald-700/20">
              <h2 className="text-2xl font-semibold text-emerald-950 dark:text-white" style={display}>
                Recent Products
              </h2>
              <button
                onClick={() => navigate("/farmer/products")}
                className="text-sm font-medium flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentProducts.length === 0 ? (
                <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                  <Package size={28} className="mx-auto mb-3 opacity-40" />
                  No products added yet. Add your first one to get started.
                </div>
              ) : (
                recentProducts.map((product) => {
                  const stockPct = Math.min(100, Number(product.quantity) || 0);
                  return (
                    <div
                      key={product._id}
                      className="p-5 border-b border-emerald-500/8 dark:border-emerald-700/15 last:border-0 hover:bg-emerald-500/4 dark:hover:bg-emerald-500/5 transition-colors duration-150"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold text-emerald-950 dark:text-white">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400" style={mono}>
                            ₹{product.price}/{product.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm text-emerald-950 dark:text-white">
                            Stock: {product.quantity}
                          </p>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 ${
                              product.status === "Active"
                                ? "bg-emerald-500/12 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                : "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>
                      {/* Stock bar */}
                      <div className="h-1.5 w-full bg-emerald-100 dark:bg-emerald-900/40 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-lime-400"
                          style={{ width: `${stockPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Orders Panel */}
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl">
            <div className="flex items-center justify-between p-6 border-b border-emerald-500/14 dark:border-emerald-700/20">
              <h2 className="text-2xl font-semibold text-emerald-950 dark:text-white" style={display}>
                Recent Orders
              </h2>
              <button
                onClick={() => navigate("/farmer/orders")}
                className="text-sm font-medium flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div>
              {recentOrders.length === 0 ? (
                <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                  <ShoppingBag size={28} className="mx-auto mb-3 opacity-40" />
                  No orders yet. New orders will show up here.
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="p-5 flex justify-between items-center border-b border-emerald-500/8 dark:border-emerald-700/15 last:border-0 hover:bg-emerald-500/4 dark:hover:bg-emerald-500/5 transition-colors duration-150"
                  >
                    <div>
                      <h3 className="font-semibold text-emerald-950 dark:text-white">
                        {order.products[0].productName}
                        {order.products.length > 1 && ` +${order.products.length - 1} more`}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Buyer: {order.buyer?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-950 dark:text-white" style={mono}>
                        ₹{order.totalPrice}
                      </p>
                      <span className="text-xs font-medium px-2 py-1 rounded-full inline-block mt-1 bg-amber-500/14 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── AI Recommendations ── */}
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl mb-8">
          <div className="flex items-center gap-2 p-6 border-b border-emerald-500/14 dark:border-emerald-700/20">
            <Sparkles size={18} className="text-amber-700 dark:text-amber-500" />
            <h2 className="text-2xl font-semibold text-emerald-950 dark:text-white" style={display}>
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
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/8"
                >
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-emerald-900 dark:text-emerald-200">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-6 text-sm text-slate-500 dark:text-slate-400">
              No recommendations available right now.
            </p>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div>
          <h2 className="text-2xl font-semibold mb-5 text-emerald-950 dark:text-white" style={display}>
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <button
              className="rounded-xl p-6 flex items-center justify-center gap-2 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/30"
              style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
              onClick={() => navigate("/farmer/products/add")}
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              className="rounded-xl p-6 flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-lime-900/20"
              style={{ background: "linear-gradient(135deg, #84CC16, #65A30D)", color: "#063527" }}
              onClick={() => navigate("/farmer/products")}
            >
              <Eye size={20} />
              View Products
            </button>
            <button
              className="rounded-xl p-6 flex items-center justify-center gap-2 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/30"
              style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
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