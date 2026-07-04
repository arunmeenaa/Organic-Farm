import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Package,
  Calendar,
  User,
  IndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";
import { getFarmerOrders } from "../../services/order.service";

const filters = [
  "all",
  "placed",
  "accepted",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

const statusColors = {
  placed: "bg-blue-100 text-blue-700",
  accepted: "bg-indigo-100 text-indigo-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getFarmerOrders();
      setOrders(data.orders);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus =
        filter === "all" || order.orderStatus === filter;

      const keyword = search.toLowerCase();

      const matchSearch =
        order.orderNumber?.toLowerCase().includes(keyword) ||
        order.buyer?.name?.toLowerCase().includes(keyword);

      return matchStatus && matchSearch;
    });
  }, [orders, filter, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Farmer Orders
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all incoming customer orders.
          </p>

        </div>

        {/* Search */}

        <div className="relative mb-6">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by order number or buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-xl pl-12 pr-4 py-3 shadow outline-none"
          />

        </div>

        {/* Filters */}

        <div className="flex gap-3 overflow-x-auto mb-8">

          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                filter === item
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-green-50"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

        </div>

        {/* Empty */}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-16 text-center">

            <Package
              size={70}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-3xl font-bold mt-5">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              There are no orders matching your search.
            </p>

          </div>
        )}

        {/* Orders */}

        <div className="grid lg:grid-cols-2 gap-6">

          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="font-bold text-xl">
                    {order.orderNumber}
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">

                    <User size={16} />

                    {order.buyer?.name}

                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-500">

                    <Calendar size={16} />

                    {new Date(order.createdAt).toLocaleDateString()}

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    statusColors[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>

              </div>

              <div className="border-t my-5"></div>

              <div className="space-y-2">

                {order.products.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between text-gray-600"
                  >
                    <span>
                      {item.productName}
                    </span>

                    <span>
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}

              </div>

              <div className="border-t my-5"></div>

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-1 text-2xl font-bold">

                  <IndianRupee size={22} />

                  {order.totalPrice}

                </div>

                <Link
                  to={`/farmer/orders/${order._id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  View Details
                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Orders;