import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  CalendarDays,
  IndianRupee,
  Eye,
  MapPin,
  Clock,
  Tractor,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";
import { getMyOrders } from "../../services/order.service";
import { getBuyerBookings } from "../../services/machineBooking.service";
import { useTheme } from "../../context/ThemeContext";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&display=swap');

    @keyframes float1 { 50% { transform: translateY(40px) translateX(20px); } }
    @keyframes float2 { 50% { transform: translateY(-30px) translateX(-25px); } }
  `}</style>
);

/* ── Status → Tailwind class lookup (was a big block of .status-* / 
   .buyer-dark .status-* CSS rules) ────────────────────────────────────── */
const STATUS_CLASSES = {
  placed:
    "bg-emerald-500/10 text-emerald-800 border border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
  accepted:
    "bg-lime-500/10 text-lime-800 border border-lime-500/25 dark:bg-lime-400/15 dark:text-lime-300 dark:border-lime-400/30",
  packed:
    "bg-amber-500/10 text-amber-800 border border-amber-500/25 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/28",
  shipped:
    "bg-sky-500/10 text-sky-800 border border-sky-500/25 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/28",
  delivered:
    "bg-green-500/10 text-green-900 border border-green-500/24 dark:bg-green-400/15 dark:text-green-300 dark:border-green-400/28",
  completed:
    "bg-indigo-500/10 text-indigo-900 border border-indigo-500/24 dark:bg-indigo-400/15 dark:text-indigo-300 dark:border-indigo-400/28",
  pending:
    "bg-amber-500/10 text-amber-900 border border-amber-500/22 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/26",
  rejected:
    "bg-red-500/10 text-red-900 border border-red-500/22 dark:bg-red-400/15 dark:text-red-300 dark:border-red-400/26",
  cancelled:
    "bg-rose-500/10 text-rose-900 border border-rose-500/22 dark:bg-rose-400/15 dark:text-rose-300 dark:border-rose-400/26",
};
const DEFAULT_STATUS_CLASS =
  "bg-slate-500/10 text-slate-700 border border-slate-500/18 dark:bg-white/[0.09] dark:text-slate-300 dark:border-white/14";

const getStatusClass = (s) =>
  STATUS_CLASSES[s?.toLowerCase()] ?? DEFAULT_STATUS_CLASS;
const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");

/* ── Reusable Tailwind class strings (were .glass, .t-head, etc.) ──────── */
const glass =
  "bg-white/55 backdrop-blur-[30px] border border-white/70 shadow-[0_10px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-white/[0.07] dark:border-white/10 dark:shadow-[0_10px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]";

const glassCard =
  "bg-white/55 backdrop-blur-[28px] border border-white/65 rounded-[28px] transition-all duration-300 shadow-[0_10px_30px_rgba(15,23,42,0.09)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(15,23,42,0.14)] dark:bg-white/[0.07] dark:border-white/10 dark:shadow-[0_10px_30px_rgba(0,0,0,0.30)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)]";

const glassBadge =
  "px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold backdrop-blur-xl";

/* Was `.glass-btn` + a `::before` shimmer that had no hover rule to trigger
   it — defined but never actually animated. Reimplemented as a working
   hover sweep using `before:` + `hover:before:` utilities. */
const glassBtn =
  "relative overflow-hidden inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white " +
  "bg-linear-to-br from-green-700 via-green-500 to-lime-400 shadow-[0_10px_25px_rgba(16,185,129,0.28)] " +
  "transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] " +
  "before:content-[''] before:absolute before:inset-0 before:-translate-x-[120%] " +
  "before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent " +
  "before:transition-transform before:duration-700 hover:before:translate-x-[120%]";

const tHead = "text-slate-900 dark:text-slate-100";
const tMuted = "text-slate-500 dark:text-slate-400";
const tLabel = "text-slate-400 dark:text-white/40";

const emptyCard =
  "bg-white/55 backdrop-blur-xl border-[1.5px] border-dashed border-emerald-500/30 rounded-3xl dark:bg-white/5 dark:border-emerald-500/25";

const spinner =
  "border-4 border-blue-100 border-t-emerald-500 rounded-full dark:border-white/10 dark:border-t-emerald-500";

const cardDivider = "h-px bg-slate-900/10 my-7 dark:bg-white/10";

/* ════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT — all state, hooks, and data logic unchanged
   ════════════════════════════════════════════════════════════════════════ */
const BuyerOrder = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [ordersRes, bookingsRes] = await Promise.all([
        getMyOrders(),
        getBuyerBookings(),
      ]);
      setOrders(ordersRes?.data?.orders || []);
      setBookings(bookingsRes?.data?.bookings || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load activity histories",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={` min-h-screen flex justify-center items-center transition-colors duration-500${darkMode ? " dark" : ""}`}
      >
        <FontImport />
        <div className={`${spinner} h-10 w-10 animate-spin`} />
      </div>
    );
  }

  return (
    <div
      className={` min-h-screen py-10 relative overflow-hidden transition-all duration-500${darkMode ? " dark" : ""}`}
    >
      <FontImport />

      {/* Ambient blobs — were `.buyer-root::before` / `::after` */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="relative mb-10">
          <div className="absolute w-[220px] h-[220px] rounded-full bg-emerald-500/[0.13] blur-[80px] -top-10 -left-[50px] pointer-events-none" />

          <p className={`${tLabel} uppercase tracking-[0.3em] text-xs mb-2`}>
            Dashboard
          </p>

          <h1
            className="font-['Space_Grotesk'] text-5xl font-black bg-clip-text text-transparent
              bg-linear-to-r from-green-700 via-emerald-600 to-lime-500
              dark:from-green-400 dark:via-lime-300 dark:to-emerald-400"
          >
            GreenHarvest Orders
          </h1>

          <p className={`${tMuted} mt-4 max-w-xl leading-7`}>
            Manage your product orders, machinery rentals, and activity in one
            place.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`${glass} rounded-full p-1.5 mb-10 inline-flex gap-2 w-max`}
        >
          {[
            {
              id: "orders",
              emoji: "🛍",
              label: "Orders",
              count: orders.length,
            },
            {
              id: "bookings",
              emoji: "🚜",
              label: "Machinery",
              count: bookings.length,
            },
          ].map(({ id, emoji, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-6 py-3 rounded-full transition-all font-semibold ${
                activeTab === id
                  ? "bg-white text-emerald-500 shadow-[0_8px_25px_rgba(15,23,42,0.10)] dark:bg-linear-to-br dark:from-emerald-500 dark:to-blue-500 dark:text-white dark:shadow-[0_8px_25px_rgba(16,185,129,0.30)]"
                  : "text-slate-600 dark:text-emerald-100/65"
              }`}
            >
              {emoji} {label}
              <span className="ml-2 opacity-60">({count})</span>
            </button>
          ))}
        </div>

        {/* ══════════════ ORDERS TAB ══════════════ */}
        {activeTab === "orders" &&
          (orders.length === 0 ? (
            <div className={`${emptyCard} max-w-xl mx-auto p-16 text-center`}>
              <Package size={70} className="mx-auto text-emerald-500 mb-6" />
              <h2
                className={`font-['Space_Grotesk'] ${tHead} text-3xl font-bold`}
              >
                Nothing Here Yet
              </h2>
              <p className={`${tMuted} mt-3`}>
                Once you place orders or rent machinery, they'll appear
                beautifully organized here.
              </p>
              <Link to="/products" className={`${glassBtn} mt-8`}>
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className={`${glassCard} relative overflow-hidden p-7 group`}
                >
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-emerald-400/20 blur-3xl group-hover:scale-125 transition duration-700 pointer-events-none" />

                  <div className="relative flex justify-between items-start">
                    <div>
                      <div
                        className={`${tLabel} text-xs uppercase tracking-[0.25em]`}
                      >
                        Order
                      </div>
                      <h2
                        className={`font-['Space_Grotesk'] ${tHead} text-2xl font-bold mt-1`}
                      >
                        {order.orderNumber}
                      </h2>
                      <div className={`flex items-center gap-2 mt-4 ${tMuted}`}>
                        <CalendarDays size={16} />
                        <span className="text-sm">
                          {new Date(order.createdAt).toLocaleDateString(
                            undefined,
                            { dateStyle: "medium" },
                          )}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`${glassBadge} ${getStatusClass(order.orderStatus)}`}
                    >
                      {capitalize(order.orderStatus)}
                    </span>
                  </div>

                  <div className={`mt-7 ${glass} rounded-2xl p-4`}>
                    <div className={`${tLabel} text-xs uppercase mb-1`}>
                      Seller
                    </div>
                    <div className={`${tHead} text-lg font-semibold`}>
                      {order.farmerName || "Organic Partner"}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <div>
                      <div className={`${tLabel} text-xs uppercase`}>
                        Total Amount
                      </div>
                      <div className="flex items-center mt-1">
                        <IndianRupee size={18} className="text-emerald-500" />
                        <span className={`${tHead} text-3xl font-bold`}>
                          {order.totalPrice}
                        </span>
                      </div>
                    </div>
                    <Link to={`/orders/${order._id}`} className={glassBtn}>
                      <Eye size={18} /> View Details
                    </Link>
                  </div>

                  <div className={cardDivider} />

                  <div className="flex justify-between items-center">
                    <div className={`flex items-center gap-2 ${tMuted}`}>
                      <ShoppingBag size={18} />
                      <span>{order.products?.length || 0} Item(s)</span>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold">
                      LIVE TRACKING
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* ══════════════ BOOKINGS TAB ══════════════ */}
        {activeTab === "bookings" &&
          (bookings.length === 0 ? (
            <div className={`${emptyCard} max-w-xl mx-auto p-16 text-center`}>
              <Tractor size={70} className="mx-auto text-emerald-500 mb-6" />
              <h2
                className={`font-['Space_Grotesk'] ${tHead} text-2xl font-bold`}
              >
                No Heavy Machinery Leased
              </h2>
              <p className={`${tMuted} mt-2`}>
                Rent programmatic equipment profiles directly onto your active
                operational parameters.
              </p>
              <Link to="/machines" className={`${glassBtn} mt-8`}>
                Explore Equipment Hub
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className={`${glassCard} overflow-hidden group relative`}
                >
                  <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-green-500/20 blur-3xl group-hover:scale-125 transition duration-700 pointer-events-none" />

                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        booking.machine?.images?.[0] ||
                        booking.machine?.image ||
                        "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=1000"
                      }
                      alt={booking.machine?.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-emerald-950/80 via-emerald-900/25 to-transparent" />

                    <div className="absolute top-5 right-5">
                      <span
                        className={`${glassBadge} ${getStatusClass(booking.bookingStatus)}`}
                      >
                        {capitalize(booking.bookingStatus)}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5">
                      <div className="text-white/70 text-xs uppercase tracking-widest">
                        Machine
                      </div>
                      <h2 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                        {booking.machine?.name}
                      </h2>
                      <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs capitalize">
                        {booking.machine?.category}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`${glass} rounded-2xl p-4`}>
                        <CalendarDays
                          size={18}
                          className="text-emerald-500 mb-3"
                        />
                        <div className={`${tLabel} text-xs uppercase`}>
                          Rental Period
                        </div>
                        <div className={`${tHead} font-semibold mt-1`}>
                          {new Date(booking.startDate).toLocaleDateString()}
                        </div>
                        <div className={`${tMuted} text-sm`}>to</div>
                        <div className={`${tHead} font-semibold`}>
                          {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className={`${glass} rounded-2xl p-4`}>
                        <Clock size={18} className="text-blue-400 mb-3" />
                        <div className={`${tLabel} text-xs uppercase`}>
                          Booking Unit
                        </div>
                        <div
                          className={`${tHead} font-semibold capitalize mt-1`}
                        >
                          {booking.bookingUnit || "Hours"}
                        </div>
                      </div>
                    </div>

                    {booking.farmLocation && (
                      <div
                        className={`${glass} rounded-2xl p-4 mt-5 flex gap-3`}
                      >
                        <MapPin className="text-rose-400 shrink-0" size={20} />
                        <div>
                          <div className={`${tLabel} text-xs uppercase`}>
                            Delivery Location
                          </div>
                          <div className={`${tHead} font-semibold`}>
                            {booking.farmLocation.village},{" "}
                            {booking.farmLocation.district}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-7">
                      <div>
                        <div className={`${tLabel} text-xs uppercase`}>
                          Total Amount
                        </div>
                        <div className="flex items-center mt-1">
                          <IndianRupee size={18} className="text-emerald-500" />
                          <span className={`${tHead} text-3xl font-bold`}>
                            {booking.totalAmount || booking.totalPrice || 0}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/machine-bookings/${booking._id}`}
                        className={glassBtn}
                      >
                        <Eye size={18} /> Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuyerOrder;
