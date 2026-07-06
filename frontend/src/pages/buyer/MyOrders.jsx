import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, CalendarDays, IndianRupee, Eye, MapPin, Clock, Tractor, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { getMyOrders } from "../../services/order.service";
import { getBuyerBookings } from "../../services/machineBooking.service";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .buyer-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .buyer-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .buyer-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .buyer-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .buyer-spinner {
      border: 4px solid #DCEBDD;
      border-top-color: #059669;
    }

    .buyer-empty-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .buyer-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: white;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .buyer-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }

    .buyer-glass-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: box-shadow 0.18s ease, transform 0.18s ease;
    }
    .buyer-glass-card:hover {
      box-shadow: 0 16px 28px -18px rgba(6, 95, 70, 0.3);
      transform: translateY(-2px);
    }

    /* Badges Status Registry */
    .status-placed { background: rgba(5, 150, 105, 0.1); color: #065F46; }
    .status-accepted { background: rgba(132, 204, 22, 0.16); color: #4D7C0F; }
    .status-packed { background: rgba(245, 158, 11, 0.16); color: #B45309; }
    .status-shipped { background: rgba(13, 148, 136, 0.14); color: #0F766E; }
    .status-delivered { background: rgba(5, 150, 105, 0.16); color: #047857; }
    .status-completed { background: rgba(37, 99, 235, 0.12); color: #1D4ED8; }
    .status-pending { background: rgba(217, 119, 6, 0.12); color: #B45309; }
    .status-rejected { background: rgba(220, 38, 38, 0.1); color: #B91C1C; }
    .status-cancelled { background: rgba(225, 29, 72, 0.1); color: #E11D48; }
    .status-default { background: #E7E9E4; color: #4B6357; }

    .buyer-divider { border-top: 1px solid rgba(5, 150, 105, 0.14); }

    .buyer-view-link { color: #059669; transition: color 0.15s ease; }
    .buyer-view-link:hover { color: #065F46; }
  `}</style>
);

const BuyerOrder = () => {
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'bookings'
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      toast.error(err.response?.data?.message || "Failed to load activity histories");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const registry = {
      placed: "status-placed",
      accepted: "status-accepted",
      packed: "status-packed",
      shipped: "status-shipped",
      delivered: "status-delivered",
      completed: "status-completed",
      pending: "status-pending",
      rejected: "status-rejected",
      cancelled: "status-cancelled",
    };
    return registry[status?.toLowerCase()] || "status-default";
  };

  if (loading) {
    return (
      <div className="buyer-root min-h-screen flex justify-center items-center">
        <FontImport />
        <div className="buyer-spinner h-10 w-10 rounded-full border-4 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="buyer-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Dashboard Header Block */}
        <div className="mb-8">
          <h1 className="buyer-display buyer-title-gradient text-4xl font-extrabold tracking-tight">
            My Purchase Activity
          </h1>
          <p className="mt-2 text-sm font-medium" style={{ color: "#7A8D82" }}>
            Track and check details of your product acquisitions and machinery lease allocations.
          </p>
        </div>

        {/* Global Hub Navigation Controller Tabs */}
        <div className="flex gap-3 bg-slate-200/50 p-1.5 rounded-2xl w-max border border-slate-200/30 mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === "orders"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🛍️ Harvest Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === "bookings"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🚜 Machine Bookings ({bookings.length})
          </button>
        </div>

        {/* Product Orders Stream Context View */}
        {activeTab === "orders" && (
          orders.length === 0 ? (
            <div className="buyer-empty-card rounded-2xl p-12 text-center border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto">
              <Package size={60} className="mx-auto mb-4" style={{ color: "#B7C9BB" }} />
              <h2 className="buyer-display text-2xl font-bold text-slate-800">No Orders Placed</h2>
              <p className="mt-2 text-sm text-slate-500">You haven't initiated checkout requests on any harvest products yet.</p>
              <Link to="/products" className="buyer-btn-primary inline-flex mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider">
                Browse Fresh Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="buyer-glass-card rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
                    <div>
                      <h2 className="buyer-display text-xl font-bold text-slate-900">{order.orderNumber}</h2>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Vendor Farm: {order.farmerName || "Organic Partner"}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 font-medium">
                        <CalendarDays size={16} />
                        Ordered: {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </div>
                    </div>

                    <div className="text-left md:text-right w-full md:w-auto">
                      <div className="buyer-mono flex items-center md:justify-end gap-0.5 text-2xl font-extrabold text-slate-900">
                        <IndianRupee size={20} className="text-slate-500" />
                        {order.totalPrice}
                      </div>
                      <span className={`inline-block mt-2.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="buyer-divider mt-6 pt-4 flex justify-between items-center">
                    <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                      <ShoppingBag size={14} /> Containing {order.products?.length || 0} distribution listing item(s)
                    </p>
                    <Link to={`/orders/${order._id}`} className="buyer-view-link flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                      <Eye size={16} /> View Summary
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Machine Lease Bookings Stream Context View */}
        {activeTab === "bookings" && (
          bookings.length === 0 ? (
            <div className="buyer-empty-card rounded-2xl p-12 text-center border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto">
              <Tractor size={60} className="mx-auto mb-4" style={{ color: "#B7C9BB" }} />
              <h2 className="buyer-display text-2xl font-bold text-slate-800">No Heavy Machinery Leased</h2>
              <p className="mt-2 text-sm text-slate-500">Rent programmatic equipment profiles directly onto your active operational parameters.</p>
              <Link to="/machines" className="buyer-btn-primary inline-flex mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider">
                Explore Equipment Hub
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="buyer-glass-card rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm">
                  <div>
                    <img 
                      src={booking.machine?.images?.[0] || booking.machine?.image || "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500"} 
                      alt={booking.machine?.name} 
                      className="w-full h-48 object-cover border-b border-slate-100" 
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h2 className="buyer-display text-xl font-bold text-slate-900">{booking.machine?.name || "Industrial Equipment"}</h2>
                          <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded w-max mt-1.5 capitalize">
                            {booking.machine?.category}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusClass(booking.bookingStatus)}`}>
                          {booking.bookingStatus}
                        </span>
                      </div>

                      <div className="space-y-3 mt-6 border-t border-slate-100/80 pt-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2.5">
                          <CalendarDays size={16} className="text-slate-400" />
                          <span>
                            {new Date(booking.startDate).toLocaleDateString(undefined, { dateStyle: 'short' })} - {new Date(booking.endDate).toLocaleDateString(undefined, { dateStyle: 'short' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock size={16} className="text-slate-400" />
                          <span className="capitalize">Lease Metric Context: {booking.bookingUnit || "Hours"}</span>
                        </div>
                        {booking.farmLocation && (
                          <div className="flex items-center gap-2.5">
                            <MapPin size={16} className="text-slate-400" />
                            <span className="truncate">Target Site: {booking.farmLocation.village}, {booking.farmLocation.district}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="buyer-divider my-4"></div>
                    <div className="flex justify-between items-center gap-4">
                      <div className="buyer-mono flex items-center text-xl font-extrabold text-slate-900">
                        <IndianRupee size={16} className="text-slate-500" />
                        {booking.totalAmount || booking.totalPrice || 0}
                      </div>
                      <Link 
                        to={`/machine-bookings/${booking._id}`} 
                        className="buyer-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase shadow-sm"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BuyerOrder;