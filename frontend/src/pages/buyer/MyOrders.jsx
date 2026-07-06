import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, CalendarDays, IndianRupee, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { getMyOrders } from "../../services/order.service";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/Dashboard/Footer/
// BuyerDashboard/Cart: glassmorphism over an emerald → lime gradient mesh.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-spinner {
      border: 4px solid #DCEBDD;
      border-top-color: #059669;
    }

    .fd-empty {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .fd-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }

    .fd-order-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: box-shadow 0.18s ease, transform 0.18s ease;
    }
    .fd-order-card:hover {
      box-shadow: 0 16px 28px -18px rgba(6, 95, 70, 0.3);
      transform: translateY(-2px);
    }

    .fd-status-placed { background: rgba(5, 150, 105, 0.1); color: #065F46; }
    .fd-status-accepted { background: rgba(132, 204, 22, 0.16); color: #4D7C0F; }
    .fd-status-packed { background: rgba(245, 158, 11, 0.16); color: #B45309; }
    .fd-status-shipped { background: rgba(13, 148, 136, 0.14); color: #0F766E; }
    .fd-status-delivered { background: rgba(5, 150, 105, 0.16); color: #047857; }
    .fd-status-cancelled { background: rgba(225, 29, 72, 0.1); color: #E11D48; }
    .fd-status-default { background: #E7E9E4; color: #4B6357; }

    .fd-divider { border-top: 1px solid rgba(5, 150, 105, 0.14); }

    .fd-view-link { color: #059669; transition: color 0.15s ease; }
    .fd-view-link:hover { color: #065F46; }
  `}</style>
);

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getMyOrders();
      setOrders(data.orders || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "placed":
        return "fd-status-placed";
      case "accepted":
        return "fd-status-accepted";
      case "packed":
        return "fd-status-packed";
      case "shipped":
        return "fd-status-shipped";
      case "delivered":
        return "fd-status-delivered";
      case "cancelled":
        return "fd-status-cancelled";
      default:
        return "fd-status-default";
    }
  };

  if (loading) {
    return (
      <div className="fd-root min-h-screen flex justify-center items-center">
        <FontImport />
        <div className="fd-spinner h-10 w-10 rounded-full border-4 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="fd-display text-4xl font-bold mb-8" style={{ color: "#0F2E22" }}>
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="fd-empty rounded-2xl p-12 text-center">
            <Package size={60} className="mx-auto mb-4" style={{ color: "#B7C9BB" }} />

            <h2 className="fd-display text-2xl font-semibold" style={{ color: "#0F2E22" }}>
              No Orders Yet
            </h2>

            <p className="mt-2" style={{ color: "#7A8D82" }}>
              Start shopping to place your first order.
            </p>

            <Link
              to="/products"
              className="fd-btn-primary inline-block mt-6 px-6 py-3 rounded-xl font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="fd-order-card rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h2 className="fd-display text-xl font-semibold" style={{ color: "#0F2E22" }}>
                      {order.orderNumber}
                    </h2>

                    <p className="mt-1" style={{ color: "#7A8D82" }}>
                      Farmer: {order.farmerName}
                    </p>

                    <div className="flex items-center gap-2 mt-3" style={{ color: "#7A8D82" }}>
                      <CalendarDays size={18} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className="fd-mono flex items-center justify-end gap-1 text-2xl font-semibold"
                      style={{ color: "#0F2E22" }}
                    >
                      <IndianRupee size={20} />
                      {order.totalPrice}
                    </div>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="fd-divider mt-6 pt-5 flex justify-between items-center">
                  <p style={{ color: "#7A8D82" }}>
                    {order.products.length} item(s)
                  </p>

                  <Link
                    to={`/orders/${order._id}`}
                    className="fd-view-link flex items-center gap-2 font-medium"
                  >
                    <Eye size={18} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;