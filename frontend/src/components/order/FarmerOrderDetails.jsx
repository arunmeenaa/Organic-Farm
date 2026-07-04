import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StatusTimeline from "./OrderStatusTimeline";
import OrderStatusBadge from "./OrderStatusBadge";
import UpdateStatusModal from "./UpdateStatusModal";
import { notify } from "../../utils/toast";
import { getOrderById, updateOrderStatus } from "../../services/order.service";

const FarmerOrderDetails = () => {
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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{order?.orderNumber}</h1>

              <p className="text-gray-500 mt-2">Buyer: {order?.buyer?.name}</p>
            </div>

            <OrderStatusBadge status={order?.orderStatus} />
          </div>

          <StatusTimeline status={order?.orderStatus} />

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5">Products</h2>

            {order?.products?.map((item) => (
              <div
                key={item.product}
                className="flex justify-between py-3 border-b"
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
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
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

export default FarmerOrderDetails;
