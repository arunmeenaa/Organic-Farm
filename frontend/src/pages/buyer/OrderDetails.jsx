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
import { getOrderById, cancelOrder } from "../../services/order.service";
import OrderStatusTimeline from "../../components/order/OrderStatusTimeline";
import ReviewForm from "../../components/reviews/ReviewForm";
import { useTheme } from "../../context/ThemeContext";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
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
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  /* ── Shared tokens ── */
  const textPrimary = darkMode ? "text-[#D1FAE5]" : "text-[#1E3527]";
  const textSub = darkMode ? "text-[rgba(167,243,208,0.70)]" : "text-[#4A5147]";
  const textMuted = darkMode
    ? "text-[rgba(167,243,208,0.50)]"
    : "text-[#8A8578]";

  // fd-panel
  const panelCls = darkMode
    ? "bg-white/[0.05] backdrop-blur-[16px] border border-[rgba(52,211,153,0.10)]"
    : "bg-white border border-[#E7E2D2]";

  // fd-section-divider
  const sectionDivider = darkMode
    ? "border-b border-[rgba(52,211,153,0.10)]"
    : "border-b border-[#E7E2D2]";

  // fd-status-pill
  const statusPill = darkMode
    ? "bg-[rgba(52,211,153,0.12)] text-emerald-300"
    : "bg-[rgba(30,53,39,0.08)] text-[#1E3527]";

  // fd-back-link
  const backLink = darkMode
    ? "text-amber-400 hover:text-emerald-300 transition-colors duration-150"
    : "text-[#8A5A16] hover:text-[#1E3527] transition-colors duration-150";

  if (loading) {
    return (
      <div
        className={`fd-root min-h-screen flex justify-center items-center ${textMuted}`}
      >
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className={`fd-root min-h-screen flex justify-center items-center ${textMuted}`}
      >
        Order not found.
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* fd-back-link */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 font-medium ${backLink}`}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className={`${panelCls} rounded-2xl shadow-sm`}>
          {/* ── Header ── */}
          <div
            className={`${sectionDivider} p-6 flex justify-between items-center`}
          >
            <div>
              <h1
                className={`font-['Fraunces',Georgia,serif] text-3xl font-semibold ${textPrimary}`}
              >
                {order.orderNumber}
              </h1>
              <p className={`mt-1 ${textMuted}`}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* fd-status-pill */}
            <span
              className={`px-4 py-2 rounded-full capitalize font-medium ${statusPill}`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* ── Info grid ── */}
          <div className={`${sectionDivider} grid md:grid-cols-3 gap-6 p-6`}>
            <div>
              <div
                className={`flex items-center gap-2 mb-3 font-semibold ${textPrimary}`}
              >
                <User size={18} />
                <h3>seller</h3>
              </div>
              <p className={textSub}>{order.sellerName}</p>
            </div>

            <div>
              <div
                className={`flex items-center gap-2 mb-3 font-semibold ${textPrimary}`}
              >
                <Calendar size={18} />
                <h3>Order Date</h3>
              </div>
              <p className={textSub}>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <div
                className={`flex items-center gap-2 mb-3 font-semibold ${textPrimary}`}
              >
                <CreditCard size={18} />
                <h3>Payment</h3>
              </div>
              <p className={textSub}>{order.paymentMethod}</p>
              <p className={`capitalize text-sm ${textMuted}`}>
                {order.paymentStatus}
              </p>
            </div>
          </div>

          {/* ── Ordered Products ── */}
          <div className={`${sectionDivider} p-6`}>
            <h2
              className={`font-['Fraunces',Georgia,serif] text-xl font-semibold mb-5 ${textPrimary}`}
            >
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
                      <h3 className={`font-semibold ${textPrimary}`}>
                        {item.productName}
                      </h3>
                      <p className={textMuted}>
                        ₹{item.priceAtPurchase} × {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>

                  {/* fd-item-total fd-mono */}
                  <p
                    className={`font-['IBM_Plex_Mono',ui-monospace,monospace] font-semibold ${textPrimary}`}
                  >
                    ₹{item.itemTotal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Status Timeline ── */}
          <div className={`${sectionDivider} p-6`}>
            <OrderStatusTimeline status={order.orderStatus} />
          </div>

          {/* ── Delivery Address ── */}
          <div className={`${sectionDivider} p-6`}>
            <div className={`flex items-center gap-2 mb-4 ${textPrimary}`}>
              <MapPin size={18} />
              <h2 className="font-['Fraunces',Georgia,serif] text-xl font-semibold">
                Delivery Address
              </h2>
            </div>

            <div className={`space-y-0.5 ${textSub}`}>
              <p>{order.deliveryAddress.fullName}</p>
              <p>{order.deliveryAddress.phone}</p>
              <p>{order.deliveryAddress.addressLine}</p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state}
              </p>
              <p>{order.deliveryAddress.pincode}</p>
            </div>
          </div>

          {/* ── Total & Cancel ── */}
          <div className="p-6">
            <div className={`flex justify-between mb-2 ${textSub}`}>
              <span>Delivery</span>
              {/* fd-free-tag */}
              <span
                className={`font-medium ${darkMode ? "text-emerald-400" : "text-[#2F5233]"}`}
              >
                Free
              </span>
            </div>

            <div
              className={`font-['Fraunces',Georgia,serif] flex justify-between text-2xl font-semibold ${textPrimary}`}
            >
              <span>Total</span>
              <span className="font-['IBM_Plex_Mono',ui-monospace,monospace]">
                ₹{order.totalPrice}
              </span>
            </div>

            {order.orderStatus === "placed" && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className={[
                  "mt-5 px-6 py-3 rounded-xl font-medium transition-colors duration-150",
                  "disabled:opacity-50",
                  darkMode
                    ? "bg-rose-800 hover:enabled:bg-rose-700 text-rose-100"
                    : "bg-[#B5502E] hover:enabled:bg-[#963F22] text-[#F6F4EC]",
                ].join(" ")}
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>
        </div>

        {/* ── Review section ── */}
        {order.orderStatus === "delivered" && (
          <div className="mt-10">
            <h2
              className={`font-['Fraunces',Georgia,serif] text-3xl font-bold mb-6 ${textPrimary}`}
            >
              Rate Your Purchase
            </h2>

            {order.products.map((item) => (
              <ReviewForm
                key={item.product}
                productId={item.product._id}
                orderId={order._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
