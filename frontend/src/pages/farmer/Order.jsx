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

// Matches Navbar/Hero/MyProducts: glassmorphism over an emerald → lime
// gradient mesh, Space Grotesk display type, status pills recolored to the
// shared palette instead of the old rainbow of blue/indigo/yellow/purple.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .or-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .or-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .or-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .or-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .or-search {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .or-search:focus-within {
      border-color: #059669;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.12);
    }

    .or-filter-btn {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      color: #4B6357;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .or-filter-btn:hover { background: rgba(5, 150, 105, 0.08); }
    .or-filter-active {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      border: 1px solid transparent;
    }

    .or-empty {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .or-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .or-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }

    .or-status-placed { background: rgba(5, 150, 105, 0.1); color: #065F46; }
    .or-status-accepted { background: rgba(132, 204, 22, 0.16); color: #4D7C0F; }
    .or-status-packed { background: rgba(245, 158, 11, 0.16); color: #B45309; }
    .or-status-shipped { background: rgba(13, 148, 136, 0.14); color: #0F766E; }
    .or-status-delivered { background: rgba(5, 150, 105, 0.16); color: #047857; }
    .or-status-cancelled { background: rgba(225, 29, 72, 0.1); color: #E11D48; }
    .or-status-default { background: #E7E9E4; color: #4B6357; }

    .or-divider { border-top: 1px solid rgba(5, 150, 105, 0.14); }

    .or-view-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.15s ease;
    }
    .or-view-btn:hover { transform: translateY(-1px); }
  `}</style>
);

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
  placed: "or-status-placed",
  accepted: "or-status-accepted",
  packed: "or-status-packed",
  shipped: "or-status-shipped",
  delivered: "or-status-delivered",
  cancelled: "or-status-cancelled",
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
      <div className="or-root min-h-screen flex items-center justify-center">
        <FontImport />
        Loading orders...
      </div>
    );
  }

  return (
    <div className="or-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="mb-8">
          <h1 className="or-display or-title-gradient text-4xl font-bold">
            Farmer Orders
          </h1>

          <p className="mt-2" style={{ color: "#7A8D82" }}>
            Manage all incoming customer orders.
          </p>
        </div>

        {/* Search */}

        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-4" style={{ color: "#8FA895" }} />

          <input
            type="text"
            placeholder="Search by order number or buyer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="or-search w-full rounded-xl pl-12 pr-4 py-3"
            style={{ color: "#0F2E22" }}
          />
        </div>

        {/* Filters */}

        <div className="flex gap-3 overflow-x-auto mb-8">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full whitespace-nowrap font-medium ${
                filter === item ? "or-filter-active" : "or-filter-btn"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Empty */}

        {filteredOrders.length === 0 && (
          <div className="or-empty rounded-2xl p-16 text-center">
            <Package size={70} className="mx-auto" style={{ color: "#B7C9BB" }} />

            <h2 className="or-display text-3xl font-semibold mt-5" style={{ color: "#0F2E22" }}>
              No Orders Found
            </h2>

            <p className="mt-2" style={{ color: "#7A8D82" }}>
              There are no orders matching your search.
            </p>
          </div>
        )}

        {/* Orders */}

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="or-card rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="or-display font-bold text-xl" style={{ color: "#0F2E22" }}>
                    {order.orderNumber}
                  </h2>

                  <div className="flex items-center gap-2 mt-2" style={{ color: "#7A8D82" }}>
                    <User size={16} />
                    {order.buyer?.name}
                  </div>

                  <div className="flex items-center gap-2 mt-2" style={{ color: "#7A8D82" }}>
                    <Calendar size={16} />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize font-medium ${
                    statusColors[order.orderStatus] || "or-status-default"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="or-divider my-5"></div>

              <div className="space-y-2">
                {order.products.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between"
                    style={{ color: "#4B6357" }}
                  >
                    <span>{item.productName}</span>
                    <span>
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="or-divider my-5"></div>

              <div className="flex justify-between items-center">
                <div
                  className="or-mono flex items-center gap-1 text-2xl font-bold"
                  style={{ color: "#0F2E22" }}
                >
                  <IndianRupee size={22} />
                  {order.totalPrice}
                </div>

                <Link
                  to={`/farmer/orders/${order._id}`}
                  className="or-view-btn px-5 py-2 rounded-lg font-semibold"
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