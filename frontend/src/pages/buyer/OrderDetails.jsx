import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Calendar,
  User,
  MapPin,
  CreditCard,
  IndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";
import { getOrderById } from "../../services/order.service";
import OrderStatusTimeline from "../../components/order/OrderStatusTimeline";
import { cancelOrder } from "../../services/order.service";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-back-link { color: #8A5A16; transition: color 0.15s ease; }
    .fd-back-link:hover { color: #1E3527; }

    .fd-panel { background: #FFFFFF; border: 1px solid #E7E2D2; }
    .fd-section-divider { border-bottom: 1px solid #E7E2D2; }

    .fd-status-pill {
      background: rgba(30, 53, 39, 0.08);
      color: #1E3527;
    }

    .fd-item-total { color: #1E3527; }

    .fd-free-tag { color: #2F5233; }

    .fd-cancel-btn {
      background: #B5502E;
      color: #F6F4EC;
      transition: background 0.15s ease;
    }
    .fd-cancel-btn:hover:not(:disabled) { background: #963f22; }
    .fd-cancel-btn:disabled { opacity: 0.5; }
  `}</style>
);

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cancelling, setCancelling] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const { data } = await getOrderById(id);
      setOrder(data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      setCancelling(true);

      const { data } = await cancelOrder(order._id);

      toast.success(data.message);

      // Refresh order details
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };
  if (loading) {
    return (
      <div className="fd-root min-h-screen flex justify-center items-center">
        <FontImport />
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="fd-root min-h-screen flex justify-center items-center">
        <FontImport />
        Order not found.
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-5xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="fd-back-link flex items-center gap-2 mb-6 font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="fd-panel rounded-2xl shadow-sm">
          {/* Header */}

          <div className="fd-section-divider p-6 flex justify-between items-center">
            <div>
              <h1 className="fd-display text-3xl font-semibold" style={{ color: "#1E3527" }}>
                {order.orderNumber}
              </h1>

              <p className="mt-1" style={{ color: "#8A8578" }}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span className="fd-status-pill px-4 py-2 rounded-full capitalize font-medium">
              {order.orderStatus}
            </span>
          </div>

          {/* Information */}

          <div className="fd-section-divider grid md:grid-cols-3 gap-6 p-6">
            <div>
              <div className="flex items-center gap-2 mb-3" style={{ color: "#1E3527" }}>
                <User size={18} />
                <h3 className="font-semibold">Farmer</h3>
              </div>

              <p style={{ color: "#4A5147" }}>{order.farmerName}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3" style={{ color: "#1E3527" }}>
                <Calendar size={18} />
                <h3 className="font-semibold">Order Date</h3>
              </div>

              <p style={{ color: "#4A5147" }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3" style={{ color: "#1E3527" }}>
                <CreditCard size={18} />
                <h3 className="font-semibold">Payment</h3>
              </div>

              <p style={{ color: "#4A5147" }}>{order.paymentMethod}</p>
              <p className="capitalize text-sm" style={{ color: "#8A8578" }}>
                {order.paymentStatus}
              </p>
            </div>
          </div>

          {/* Products */}

          <div className="fd-section-divider p-6">
            <h2 className="fd-display text-xl font-semibold mb-5" style={{ color: "#1E3527" }}>
              Ordered Products
            </h2>

            <div className="space-y-5">
              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold" style={{ color: "#23281F" }}>
                        {item.productName}
                      </h3>

                      <p style={{ color: "#8A8578" }}>
                        ₹{item.priceAtPurchase} × {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>

                  <p className="fd-item-total fd-mono font-semibold">
                    ₹{item.itemTotal}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="fd-section-divider p-6">
            <OrderStatusTimeline status={order.orderStatus} />
          </div>
          {/* Address */}

          <div className="fd-section-divider p-6">
            <div className="flex items-center gap-2 mb-4" style={{ color: "#1E3527" }}>
              <MapPin size={18} />
              <h2 className="fd-display text-xl font-semibold">
                Delivery Address
              </h2>
            </div>

            <div style={{ color: "#4A5147" }}>
              <p>{order.deliveryAddress.fullName}</p>
              <p>{order.deliveryAddress.phone}</p>
              <p>{order.deliveryAddress.addressLine}</p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state}
              </p>
              <p>{order.deliveryAddress.pincode}</p>
            </div>
          </div>

          {/* Total */}

          <div className="p-6">
            <div className="flex justify-between mb-2" style={{ color: "#4A5147" }}>
              <span>Delivery</span>
              <span className="fd-free-tag font-medium">Free</span>
            </div>

            <div
              className="fd-display flex justify-between text-2xl font-semibold"
              style={{ color: "#1E3527" }}
            >
              <span>Total</span>
              <span className="fd-mono">₹{order.totalPrice}</span>
            </div>
            <div>
              {order.orderStatus === "placed" && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="fd-cancel-btn mt-5 px-6 py-3 rounded-xl font-medium"
                >
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;