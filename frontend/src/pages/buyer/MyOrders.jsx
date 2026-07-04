import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, CalendarDays, IndianRupee, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { getMyOrders } from "../../services/order.service";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-spinner {
      border: 4px solid #E7E2D2;
      border-top-color: #1E3527;
    }

    .fd-empty { background: #FFFFFF; border: 1px solid #E7E2D2; }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; }

    .fd-order-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      transition: box-shadow 0.18s ease, transform 0.18s ease;
    }
    .fd-order-card:hover {
      box-shadow: 0 16px 28px -18px rgba(30, 53, 39, 0.3);
      transform: translateY(-2px);
    }

    .fd-status-placed { background: rgba(30, 53, 39, 0.08); color: #1E3527; }
    .fd-status-accepted { background: rgba(47, 82, 51, 0.1); color: #2F5233; }
    .fd-status-packed { background: rgba(231, 168, 60, 0.18); color: #8A5A16; }
    .fd-status-shipped { background: rgba(138, 90, 22, 0.12); color: #8A5A16; }
    .fd-status-delivered { background: rgba(30, 53, 39, 0.12); color: #1E3527; }
    .fd-status-cancelled { background: rgba(181, 80, 46, 0.1); color: #B5502E; }
    .fd-status-default { background: #EFEBDD; color: #4A5147; }

    .fd-divider { border-top: 1px solid #E7E2D2; }

    .fd-view-link { color: #8A5A16; transition: color 0.15s ease; }
    .fd-view-link:hover { color: #1E3527; }
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
        <h1 className="fd-display text-4xl font-semibold mb-8" style={{ color: "#1E3527" }}>
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="fd-empty rounded-2xl p-12 text-center">
            <Package size={60} className="mx-auto mb-4" style={{ color: "#C9C3B0" }} />

            <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E3527" }}>
              No Orders Yet
            </h2>

            <p className="mt-2" style={{ color: "#8A8578" }}>
              Start shopping to place your first order.
            </p>

            <Link
              to="/products"
              className="fd-btn-primary inline-block mt-6 px-6 py-3 rounded-xl font-medium"
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
                    <h2 className="fd-display text-xl font-semibold" style={{ color: "#1E3527" }}>
                      {order.orderNumber}
                    </h2>

                    <p className="mt-1" style={{ color: "#8A8578" }}>
                      Farmer: {order.farmerName}
                    </p>

                    <div className="flex items-center gap-2 mt-3" style={{ color: "#8A8578" }}>
                      <CalendarDays size={18} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className="fd-mono flex items-center justify-end gap-1 text-2xl font-semibold"
                      style={{ color: "#1E3527" }}
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
                  <p style={{ color: "#8A8578" }}>
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