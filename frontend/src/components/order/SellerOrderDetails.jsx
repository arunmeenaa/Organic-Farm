import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StatusTimeline from "./OrderStatusTimeline";
import OrderStatusBadge from "./OrderStatusBadge";
import UpdateStatusModal from "./UpdateStatusModal";
import { notify } from "../../utils/toast";
import { getOrderById, updateOrderStatus } from "../../services/order.service";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/sellerOrderCard:
// glassmorphism over an emerald → lime gradient mesh, Space Grotesk display type.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fod-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .fod-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .fod-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .fod-row { border-bottom: 1px solid rgba(5, 150, 105, 0.12); }

    .fod-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fod-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
    .fod-btn-primary:active { transform: translateY(0); }
  `}</style>
);

const sellerOrderDetails = () => {
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const fetchOrder = async () => {
    try {
      const { data } = await getOrderById(id);

      if (!data.order) {
        notify.error("Order not found");
        return;
      }

      setOrder(data.order);
    } catch (err) {
      notify.error(err.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const nextAction = {
    placed: "Accept Order",
    accepted: "Mark as Packed",
    packed: "Mark as Shipped",
    shipped: "Mark as Delivered",
  };
  console.log("Current order state:", order);
  if (!order) {
    return (
      <div className="fod-root min-h-screen flex items-center justify-center">
        <FontImport />
        Loading order...
      </div>
    );
  }
  const handleStatusUpdate = async (status) => {
    try {
      const { data } = await updateOrderStatus(order._id, status);

      notify.success(data.message || "Order updated");

      setShowModal(false);

      fetchOrder();
    } catch (err) {
      console.log(err.response);
      notify.error(err.response?.data?.message || "Failed to update order");
    }
  };

  return (
    <div className="fod-root min-h-screen">
      <FontImport />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="fod-panel rounded-2xl shadow-sm p-8">
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="fod-display text-3xl font-bold" style={{ color: "#0F2E22" }}>
                {order?.orderNumber}
              </h1>

              <p className="mt-2" style={{ color: "#7A8D82" }}>
                Buyer: {order?.buyer?.name}
              </p>
            </div>

            <OrderStatusBadge status={order?.orderStatus} />
          </div>

          <StatusTimeline status={order?.orderStatus} />

          <div className="mt-10">
            <h2 className="fod-display text-2xl font-semibold mb-5" style={{ color: "#0F2E22" }}>
              Products
            </h2>

            {order?.products?.map((item) => (
              <div
                key={item.product}
                className="fod-row flex justify-between py-3"
                style={{ color: "#1E2A22" }}
              >
                <span>{item.productName}</span>

                <span>
                  {item.quantity} {item.unit}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            {order.orderStatus !== "delivered" &&
              order.orderStatus !== "cancelled" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="fod-btn-primary px-8 py-3 rounded-xl font-semibold"
                >
                  {nextAction[order.orderStatus]}
                </button>
              )}
          </div>
        </div>
      </div>

      <UpdateStatusModal
        open={showModal}
        status={order?.orderStatus}
        onClose={() => setShowModal(false)}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default sellerOrderDetails;