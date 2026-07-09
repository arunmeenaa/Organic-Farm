import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Package, Calendar, User, IndianRupee, Clock, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { getFarmerOrders } from "../../services/order.service";
import { getFarmerBookings } from "../../services/machineBooking.service";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .or-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .or-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .or-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .or-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .or-search {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .or-search:focus-within {
      border-color: #059669;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.12);
    }

    .or-filter-btn {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      color: #4B6357;
      transition: all 0.15s ease;
    }
    .or-filter-btn:hover { background: rgba(5, 150, 105, 0.08); }
    .or-filter-active {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: white;
      border: 1px solid transparent;
    }

    .or-empty {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .or-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .or-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }

    .or-status-placed { background: rgba(5, 150, 105, 0.1); color: #065F46; }
    .or-status-accepted { background: rgba(132, 204, 22, 0.16); color: #4D7C0F; }
    .or-status-packed { background: rgba(245, 158, 11, 0.16); color: #B45309; }
    .or-status-shipped { background: rgba(13, 148, 136, 0.14); color: #0F766E; }
    .or-status-delivered { background: rgba(5, 150, 105, 0.16); color: #047857; }
    .or-status-cancelled { background: rgba(225, 29, 72, 0.1); color: #E11D48; }
    .or-status-default { background: #E7E9E4; color: #4B6357; }

    .or-divider { border-top: 1px solid rgba(5, 150, 105, 0.14); }

    .or-view-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: white;
      transition: transform 0.15s ease;
    }
    .or-view-btn:hover { transform: translateY(-1px); }
  `}</style>
);

const filters = ["all", "placed", "accepted", "packed", "shipped", "delivered", "cancelled"];

const statusColors = {
  placed: "or-status-placed",
  accepted: "or-status-accepted",
  packed: "or-status-packed",
  shipped: "or-status-shipped",
  delivered: "or-status-delivered",
  cancelled: "or-status-cancelled",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [machineBookings, setMachineBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [orderType, setOrderType] = useState("product");

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
      <div className="or-root min-h-screen flex items-center justify-center text-emerald-800 font-medium">
        <FontImport />
        <div className="animate-pulse">Loading ecosystem data...</div>
      </div>
    );
  }

  return (
    <div className="or-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Type Toggles Panel */}
        <div className="flex gap-4 mb-10 bg-slate-100/50 p-1.5 rounded-2xl w-max border border-slate-200/40">
          <button
            onClick={() => { setOrderType("product"); setFilter("all"); }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 text-sm ${
              orderType === "product"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>📦</span> Product Orders
          </button>

          <button
            onClick={() => { setOrderType("machine"); setFilter("all"); }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 text-sm ${
              orderType === "machine"
                ? "bg-red-400 text-white shadow-md shadow-emerald-600/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>🚜</span> Machine Bookings
          </button>
        </div>

        {/* Dynamic Context Headers */}
        <div className="mb-8">
          <h1 className="or-display or-title-gradient text-4xl font-bold tracking-tight">
            {orderType === "product" ? "Farmer Incoming Orders" : "Machine Rentals & Bookings"}
          </h1>
          <p className="mt-2 text-sm font-medium" style={{ color: "#7A8D82" }}>
            {orderType === "product" 
              ? "Manage incoming organic harvest requests and delivery fulfillment lifecycle." 
              : "Track booked machinery orders, operations, schedules and rental statuses."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-4 text-slate-400" />
          <input
            type="text"
            placeholder={orderType === "product" ? "Search by order number or buyer..." : "Search by booking number, machinery or client..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="or-search w-full rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium outline-none"
            style={{ color: "#0F2E22" }}
          />
        </div>

        {/* Context Status Filter Carousel */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-xs font-semibold tracking-wide uppercase transition-all ${
                filter === item ? "or-filter-active text-white" : "or-filter-btn"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Empty Fallback View */}
        {processedItems.length === 0 && (
          <div className="or-empty rounded-3xl p-16 text-center border border-dashed border-slate-200 max-w-xl mx-auto shadow-sm">
            <Package size={64} className="mx-auto text-slate-300" />
            <h2 className="or-display text-2xl font-bold mt-5 text-slate-800">
              No Entries Matched
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We couldn't discover metrics tailored to your current parameters. Try expanding filters.
            </p>
          </div>
        )}

        {/* Dynamic Data Stream List Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {orderType === "product" 
            ? processedItems.map((order) => (
                <div key={order._id} className="or-card rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="or-display font-bold text-lg text-slate-900">{order.orderNumber}</h2>
                        <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500">
                          <User size={14} />
                          {order.buyer?.name || "Guest Checkout"}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-400">
                          <Calendar size={14} />
                          {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${statusColors[order.orderStatus] || "or-status-default"}`}>
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="or-divider my-4"></div>

                    <div className="space-y-2">
                      {order.products?.map((item, idx) => (
                        <div key={item.product || idx} className="flex justify-between text-sm font-medium text-slate-600">
                          <span>{item.productName}</span>
                          <span className="text-slate-900 font-semibold">{item.quantity} {item.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="or-divider my-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="or-mono flex items-center text-xl font-bold text-slate-900">
                        <IndianRupee size={18} className="text-slate-600" />
                        {order.totalPrice}
                      </div>
                      <Link to={`/farmer/orders/${order._id}`} className="or-view-btn px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                        View Order
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : processedItems.map((booking) => (
                <div key={booking._id} className="or-card rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                          <Settings size={18} className="text-emerald-600 animate-spin-slow" />
                          {/* Completely Dynamic API Field Mapping */}
                          <h3>{booking.machine?.name || booking.machineName || "Machinery Item"}</h3>
                        </div>
                        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                          Booking ID: {booking.bookingNumber || booking._id?.slice(-8)}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-600">
                          <User size={14} className="text-slate-400" />
                          Renter: <span className="text-slate-900 font-semibold">{booking.buyer?.name || "Registered Buyer"}</span>
                        </div>
                        
                        {/* Dynamic Rentals Time Windows */}
                        <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-500">
                          <Clock size={14} className="text-slate-400" />
                          Duration: <span className="text-slate-900 font-semibold">{booking.durationHours || booking.hours || 0} Hrs</span>
                        </div>

                        {(booking.startDate || booking.bookingDate) && (
                          <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-400">
                            <Calendar size={14} className="text-slate-400" />
                            Schedule: {new Date(booking.startDate || booking.bookingDate).toLocaleDateString(undefined, { dateStyle: 'short' })}
                            {booking.endDate && ` - ${new Date(booking.endDate).toLocaleDateString(undefined, { dateStyle: 'short' })}`}
                          </div>
                        )}
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold ${statusColors[booking.bookingStatus] || "or-status-default"}`}>
                        {booking.bookingStatus || "Pending"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="or-divider my-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="or-mono flex items-center text-xl font-bold text-slate-900">
                        <IndianRupee size={18} className="text-slate-600" />
                        {booking.totalPrice || booking.cost || 0}
                      </div>
                      <Link to={`/machine-bookings/${booking._id}`} className="or-view-btn px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
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