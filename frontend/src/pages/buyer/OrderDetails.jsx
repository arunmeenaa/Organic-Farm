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
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Order not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow">
          {/* Header */}

          <div className="border-b p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{order.orderNumber}</h1>

              <p className="text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full capitalize">
              {order.orderStatus}
            </span>
          </div>

          {/* Information */}

          <div className="grid md:grid-cols-3 gap-6 p-6 border-b">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User size={18} />
                <h3 className="font-semibold">Farmer</h3>
              </div>

              <p>{order.farmerName}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} />
                <h3 className="font-semibold">Order Date</h3>
              </div>

              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard size={18} />
                <h3 className="font-semibold">Payment</h3>
              </div>

              <p>{order.paymentMethod}</p>
              <p className="capitalize text-sm text-gray-500">
                {order.paymentStatus}
              </p>
            </div>
          </div>

          {/* Products */}

          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-5">Ordered Products</h2>

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
                      <h3 className="font-semibold">{item.productName}</h3>

                      <p className="text-gray-500">
                        ₹{item.priceAtPurchase} × {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">₹{item.itemTotal}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-b">
            <OrderStatusTimeline status={order.orderStatus} />
          </div>
          {/* Address */}

          <div className="p-6 border-b">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} />
              <h2 className="text-xl font-semibold">Delivery Address</h2>
            </div>

            <p>{order.deliveryAddress.fullName}</p>
            <p>{order.deliveryAddress.phone}</p>
            <p>{order.deliveryAddress.addressLine}</p>
            <p>
              {order.deliveryAddress.city}, {order.deliveryAddress.state}
            </p>
            <p>{order.deliveryAddress.pincode}</p>
          </div>

          {/* Total */}

          <div className="p-6">
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>
            <div>
              {order.orderStatus === "placed" && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition"
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
