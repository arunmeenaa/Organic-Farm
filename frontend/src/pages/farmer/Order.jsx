import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Package, Calendar, User, IndianRupee, Clock, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { getFarmerOrders } from "../../services/order.service";
import { getFarmerBookings } from "../../services/machineBooking.service";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };
const mono    = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const filters = ["all", "placed", "accepted", "packed", "shipped", "delivered", "cancelled"];

// Status badge Tailwind classes
const statusColors = {
  placed:    "bg-emerald-500/10 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300",
  accepted:  "bg-lime-500/20 text-lime-800 dark:bg-lime-500/20 dark:text-lime-300",
  packed:    "bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  shipped:   "bg-teal-500/15 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300",
  delivered: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  cancelled: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
};
const statusDefault = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";

const Orders = () => {
  const [orders, setOrders]               = useState([]);
  const [machineBookings, setMachineBookings] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState("");
  const [filter, setFilter]               = useState("all");
  const [orderType, setOrderType]         = useState("product");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const [orderRes, bookingRes] = await Promise.all([
        getFarmerOrders(),
        getFarmerBookings(),
      ]);
      setOrders(orderRes?.data?.orders || []);
      setMachineBookings(bookingRes?.data?.bookings || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const processedItems = useMemo(() => {
    const keyword = search.toLowerCase();
    if (orderType === "product") {
      return orders.filter((order) => {
        const matchStatus = filter === "all" || order.orderStatus === filter;
        const matchSearch =
          order.orderNumber?.toLowerCase().includes(keyword) ||
          order.buyer?.name?.toLowerCase().includes(keyword);
        return matchStatus && matchSearch;
      });
    } else {
      return machineBookings.filter((booking) => {
        const matchStatus = filter === "all" || booking.bookingStatus === filter;
        const matchSearch =
          booking.bookingNumber?.toLowerCase().includes(keyword) ||
          booking.machine?.name?.toLowerCase().includes(keyword) ||
          booking.buyer?.name?.toLowerCase().includes(keyword);
        return matchStatus && matchSearch;
      });
    }
  }, [orders, machineBookings, orderType, filter, search]);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <FontLink />
        <div className="animate-pulse text-emerald-700 dark:text-emerald-400 font-medium">
          Loading ecosystem data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-foreground font-sans">
      <FontLink />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Type Toggle Panel ── */}
        <div className="flex gap-3 bg-slate-100/60 dark:bg-white/5 p-1.5 rounded-2xl w-max border border-slate-200/40 dark:border-white/10 mb-10">
          <button
            onClick={() => { setOrderType("product"); setFilter("all"); }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 text-sm ${
              orderType === "product"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>📦</span> Product Orders
          </button>

          <button
            onClick={() => { setOrderType("machine"); setFilter("all"); }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 text-sm ${
              orderType === "machine"
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>🚜</span> Machine Bookings
          </button>
        </div>

        {/* ── Page Header ── */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent"
            style={display}
          >
            {orderType === "product" ? "Farmer Incoming Orders" : "Machine Rentals & Bookings"}
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            {orderType === "product"
              ? "Manage incoming organic harvest requests and delivery fulfillment lifecycle."
              : "Track booked machinery orders, operations, schedules and rental statuses."}
          </p>
        </div>

        {/* ── Search Bar ── */}
        <div className="relative mb-6 flex items-center bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 rounded-xl focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-150">
          <Search size={18} className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder={
              orderType === "product"
                ? "Search by order number or buyer..."
                : "Search by booking number, machinery or client..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium outline-none text-emerald-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* ── Status Filter Carousel ── */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-xs font-semibold tracking-wide uppercase transition-all duration-150 ${
                filter === item
                  ? "bg-gradient-to-r from-emerald-600 to-lime-400 text-white border border-transparent shadow-sm"
                  : "bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/8 dark:hover:bg-emerald-500/10"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ── Empty State ── */}
        {processedItems.length === 0 && (
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-sm">
            <Package size={64} className="mx-auto text-slate-300 dark:text-slate-600" />
            <h2
              className="text-2xl font-bold mt-5 text-slate-800 dark:text-white"
              style={display}
            >
              No Entries Matched
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              We couldn't discover metrics tailored to your current parameters. Try expanding filters.
            </p>
          </div>
        )}

        {/* ── Cards Grid ── */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Product Orders */}
          {orderType === "product"
            ? processedItems.map((order) => (
                <div
                  key={order._id}
                  className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2
                          className="font-bold text-lg text-slate-900 dark:text-white"
                          style={display}
                        >
                          {order.orderNumber}
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <User size={14} />
                          {order.buyer?.name || "Guest Checkout"}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                          <Calendar size={14} />
                          {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${
                          statusColors[order.orderStatus] || statusDefault
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="my-4 border-t border-emerald-500/14 dark:border-emerald-700/20" />

                    <div className="space-y-2">
                      {order.products?.map((item, idx) => (
                        <div
                          key={item.product || idx}
                          className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-400"
                        >
                          <span>{item.productName}</span>
                          <span className="text-slate-900 dark:text-white font-semibold">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="my-4 border-t border-emerald-500/14 dark:border-emerald-700/20" />
                    <div className="flex justify-between items-center">
                      <div
                        className="flex items-center text-xl font-bold text-slate-900 dark:text-white"
                        style={mono}
                      >
                        <IndianRupee size={18} className="text-slate-600 dark:text-slate-400" />
                        {order.totalPrice}
                      </div>
                      <Link
                        to={`/farmer/orders/${order._id}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-400 shadow-sm hover:-translate-y-0.5 transition-all duration-150"
                      >
                        View Order
                      </Link>
                    </div>
                  </div>
                </div>
              ))

            /* Machine Bookings */
            : processedItems.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-lg">
                          <Settings size={18} className="text-emerald-600 dark:text-emerald-400 animate-spin-slow" />
                          <h3>{booking.machine?.name || booking.machineName || "Machinery Item"}</h3>
                        </div>
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                          Booking ID: {booking.bookingNumber || booking._id?.slice(-8)}
                        </p>

                        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                          <User size={14} className="text-slate-400 dark:text-slate-500" />
                          Renter:{" "}
                          <span className="text-slate-900 dark:text-white font-semibold">
                            {booking.buyer?.name || "Registered Buyer"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <Clock size={14} className="text-slate-400 dark:text-slate-500" />
                          Duration:{" "}
                          <span className="text-slate-900 dark:text-white font-semibold">
                            {booking.durationHours || booking.hours || 0} Hrs
                          </span>
                        </div>

                        {(booking.startDate || booking.bookingDate) && (
                          <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                            <Calendar size={14} />
                            Schedule:{" "}
                            {new Date(booking.startDate || booking.bookingDate).toLocaleDateString(undefined, { dateStyle: "short" })}
                            {booking.endDate &&
                              ` - ${new Date(booking.endDate).toLocaleDateString(undefined, { dateStyle: "short" })}`}
                          </div>
                        )}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${
                          statusColors[booking.bookingStatus] || statusDefault
                        }`}
                      >
                        {booking.bookingStatus || "Pending"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="my-4 border-t border-emerald-500/14 dark:border-emerald-700/20" />
                    <div className="flex justify-between items-center">
                      <div
                        className="flex items-center text-xl font-bold text-slate-900 dark:text-white"
                        style={mono}
                      >
                        <IndianRupee size={18} className="text-slate-600 dark:text-slate-400" />
                        {booking.totalPrice || booking.cost || 0}
                      </div>
                      <Link
                        to={`/machine-bookings/${booking._id}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-400 shadow-sm hover:-translate-y-0.5 transition-all duration-150"
                      >
                        Manage Lease
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Orders;