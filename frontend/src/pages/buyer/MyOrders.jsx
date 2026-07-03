import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, CalendarDays, IndianRupee, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { getMyOrders } from "../../services/order.service";

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
        return "bg-blue-100 text-blue-700";
      case "accepted":
        return "bg-indigo-100 text-indigo-700";
      case "packed":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="h-10 w-10 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <Package size={60} className="mx-auto text-gray-400 mb-4" />

            <h2 className="text-2xl font-semibold">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start shopping to place your first order.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">

                  <div>

                    <h2 className="text-xl font-bold">
                      {order.orderNumber}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Farmer: {order.farmerName}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-gray-500">
                      <CalendarDays size={18} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>

                  </div>

                  <div className="text-right">

                    <div className="flex items-center justify-end gap-1 text-2xl font-bold">
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

                <div className="mt-6 border-t pt-5 flex justify-between items-center">

                  <p className="text-gray-500">
                    {order.products.length} item(s)
                  </p>

                  <Link
                    to={`/orders/${order._id}`}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
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