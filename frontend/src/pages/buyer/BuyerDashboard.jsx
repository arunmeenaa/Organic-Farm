import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  Heart,
  Search,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getBuyerDashboard } from "../../services/dashboard.service";
import { useEffect, useState } from "react";

const BuyerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data } = await getBuyerDashboard();
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      } catch (err) {
        console.error(err);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  /* ── Shared token shortcuts ── */
  // fd-root text primaries
  const textPrimary = darkMode ? "text-[#D1FAE5]" : "text-[#0F2E22]";
  const textMuted = darkMode
    ? "text-[rgba(167,243,208,0.55)]"
    : "text-[#7A8D82]";

  // fd-panel / fd-stat-card glass surface
  const panelCls = darkMode
    ? "bg-white/[0.05] backdrop-blur-[16px] border border-[rgba(52,211,153,0.10)]"
    : "bg-white/[0.72] backdrop-blur-[16px] border border-white/60";

  // fd-stat-card (panel + hover lift)
  const statCardCls = `${panelCls} transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(6,95,70,0.30)]`;

  // fd-title-gradient
  const titleGradient = darkMode
    ? "bg-gradient-to-r from-[#34D399] to-[#A3E635] bg-clip-text text-transparent"
    : "bg-gradient-to-r from-[#065F46] to-[#65A30D] bg-clip-text text-transparent";

  // fd-link-accent
  const linkAccent = darkMode
    ? "text-emerald-400 hover:text-emerald-300 transition-colors duration-150"
    : "text-[#059669] hover:text-[#065F46] transition-colors duration-150";

  // fd-row divider
  const rowCls = darkMode
    ? "border-b border-[rgba(52,211,153,0.10)] last:border-b-0 hover:bg-[rgba(52,211,153,0.04)] transition-colors duration-150"
    : "border-b border-[rgba(5,150,105,0.10)] last:border-b-0 hover:bg-[rgba(5,150,105,0.04)] transition-colors duration-150";

  // fd-panel header divider
  const panelDivider = darkMode
    ? "border-b border-[rgba(52,211,153,0.14)]"
    : "border-b border-[rgba(5,150,105,0.14)]";

  // fd-btn-primary
  const btnPrimary =
    "bg-gradient-to-r from-[#059669] to-[#84CC16] text-[#063527] font-semibold " +
    "shadow-[0_10px_22px_-10px_rgba(5,150,105,0.45)] " +
    "hover:-translate-y-px hover:shadow-[0_14px_26px_-10px_rgba(5,150,105,0.55)] " +
    "transition-[transform,box-shadow] duration-150";

  // fd-wishlist-count
  const wishlistCount = darkMode ? "text-emerald-400" : "text-[#059669]";

  return (
    <div className="font-sans min-h-screen transition-[background] duration-300">
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div>
            {/* fd-display fd-title-gradient */}
            <h1
              className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-4xl font-bold ${titleGradient}`}
            >
              Buyer Dashboard
            </h1>
            <h1
              className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-4xl font-bold ${titleGradient}`}
            >
              Welcome back, {user?.name ?? "Buyer"}
            </h1>
            <p className={`mt-2 ${textMuted}`}>
              Track your orders and continue shopping.
            </p>
          </div>

          {/* fd-btn-primary */}
          <Link
            to="/market-place"
            className={`${btnPrimary} px-6 py-3 rounded-xl flex items-center gap-2`}
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>

        {/* ── Statistics ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* fd-stat-card */}
          <div className={`${statCardCls} rounded-2xl p-6`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={textMuted}>Total Orders</p>
                <h2
                  className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-3xl font-bold mt-2 ${textPrimary}`}
                >
                  {stats?.totalOrders ?? 0}
                </h2>
              </div>
              {/* fd-icon-chip-0 */}
              <div
                className={`p-4 rounded-xl ${
                  darkMode
                    ? "bg-[rgba(5,150,105,0.18)] text-emerald-400"
                    : "bg-[rgba(5,150,105,0.12)] text-[#059669]"
                }`}
              >
                <Package />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Recent Orders — fd-panel ── */}
          <div className={`${panelCls} lg:col-span-2 rounded-2xl`}>
            <div
              className={`flex justify-between items-center p-6 ${panelDivider}`}
            >
              <h2
                className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-2xl font-semibold ${textPrimary}`}
              >
                Recent Orders
              </h2>
              <Link to="/orders" className={`font-semibold ${linkAccent}`}>
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className={`${rowCls} flex items-center justify-between rounded-xl p-5`}
                >
                  {/* Left Section */}
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${textPrimary}`}>
                      {order.products[0].productName}
                      {order.products.length > 1 &&
                        ` +${order.products.length - 1} more`}
                    </h3>
                    <p className={`text-sm mt-1 ${textMuted}`}>
                      Order #{order.orderNumber}
                    </p>
                    <p className={`text-sm mt-1 ${textMuted}`}>
                      🌾 seller:{" "}
                      <span className="font-medium">{order.seller?.name}</span>
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <h3
                      className={`text-xl font-bold font-['IBM_Plex_Mono',ui-monospace,monospace] ${textPrimary}`}
                    >
                      ₹{order.totalPrice}
                    </h3>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "delivered"
                          ? darkMode
                            ? "bg-emerald-900/50 text-emerald-300"
                            : "bg-green-100 text-green-700"
                          : order.orderStatus === "cancelled"
                            ? darkMode
                              ? "bg-red-900/40 text-red-300"
                              : "bg-red-100 text-red-700"
                            : darkMode
                              ? "bg-yellow-900/40 text-yellow-300"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className={`${panelCls} rounded-2xl p-6`}>
              <h2
                className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-xl font-semibold mb-5 ${textPrimary}`}
              >
                Quick Actions
              </h2>

              <div className="space-y-4">
                {/* fd-quick-action-0 */}
                <Link
                  to="/market-place"
                  className={`flex items-center justify-between rounded-xl p-4 transition-colors duration-150 ${
                    darkMode
                      ? "bg-[rgba(5,150,105,0.12)] text-emerald-300 hover:bg-[rgba(5,150,105,0.22)]"
                      : "bg-[rgba(5,150,105,0.08)] text-[#065F46] hover:bg-[rgba(5,150,105,0.16)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Search />
                    Browse Products
                  </span>
                  <ArrowRight size={18} />
                </Link>

                {/* fd-quick-action-1 */}
                <Link
                  to="/cart"
                  className={`flex items-center justify-between rounded-xl p-4 transition-colors duration-150 ${
                    darkMode
                      ? "bg-[rgba(245,158,11,0.14)] text-amber-300 hover:bg-[rgba(245,158,11,0.24)]"
                      : "bg-[rgba(245,158,11,0.12)] text-[#B45309] hover:bg-[rgba(245,158,11,0.20)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Package />
                    My Cart
                  </span>
                  <ArrowRight size={18} />
                </Link>

                {/* fd-quick-action-2 */}
                <Link
                  to="/orders"
                  className={`flex items-center justify-between rounded-xl p-4 transition-colors duration-150 ${
                    darkMode
                      ? "bg-[rgba(132,204,22,0.14)] text-lime-300 hover:bg-[rgba(132,204,22,0.24)]"
                      : "bg-[rgba(132,204,22,0.14)] text-[#4D7C0F] hover:bg-[rgba(132,204,22,0.22)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Truck />
                    Track Orders
                  </span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Wishlist */}
            <div className={`${panelCls} rounded-2xl p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-rose-500" />
                <h2
                  className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-xl font-semibold ${textPrimary}`}
                >
                  Wishlist
                </h2>
              </div>

              <p className={textMuted}>
                You have
                <span
                  className={`font-['IBM_Plex_Mono',ui-monospace,monospace] font-bold ${wishlistCount}`}
                >
                  {" "}
                  6{" "}
                </span>
                saved products.
              </p>

              <Link
                to="/wishlist"
                className={`inline-block mt-5 font-semibold ${linkAccent}`}
              >
                View Wishlist →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
