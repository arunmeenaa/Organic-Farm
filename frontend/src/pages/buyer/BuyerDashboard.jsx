import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  Heart,
  Search,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-panel {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
    }

    .fd-stat-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-top: 3px solid #1E3527;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .fd-stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -14px rgba(30, 53, 39, 0.35);
    }

    .fd-icon-chip-0 { background: rgba(30, 53, 39, 0.1); color: #1E3527; }
    .fd-icon-chip-1 { background: rgba(231, 168, 60, 0.18); color: #8A5A16; }
    .fd-icon-chip-2 { background: rgba(47, 82, 51, 0.1); color: #2F5233; }
    .fd-icon-chip-3 { background: rgba(181, 80, 46, 0.1); color: #B5502E; }

    .fd-row { border-bottom: 1px solid #EFEBDD; transition: background 0.15s ease; }
    .fd-row:last-child { border-bottom: none; }
    .fd-row:hover { background: #FBFAF4; }

    .fd-link-accent { color: #8A5A16; transition: color 0.15s ease; }
    .fd-link-accent:hover { color: #1E3527; }

    .fd-status-pill { color: #1E3527; }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; }

    .fd-quick-action-0 { background: rgba(30, 53, 39, 0.06); color: #1E3527; transition: background 0.15s ease; }
    .fd-quick-action-0:hover { background: rgba(30, 53, 39, 0.12); }
    .fd-quick-action-1 { background: rgba(231, 168, 60, 0.14); color: #8A5A16; transition: background 0.15s ease; }
    .fd-quick-action-1:hover { background: rgba(231, 168, 60, 0.24); }
    .fd-quick-action-2 { background: rgba(47, 82, 51, 0.08); color: #2F5233; transition: background 0.15s ease; }
    .fd-quick-action-2:hover { background: rgba(47, 82, 51, 0.16); }

    .fd-wishlist-count { color: #1E3527; }
  `}</style>
);

const stats = [
  {
    title: "Total Orders",
    value: 12,
    icon: <ShoppingBag size={28} />,
    color: "fd-icon-chip-0",
  },
  {
    title: "Pending Orders",
    value: 3,
    icon: <Truck size={28} />,
    color: "fd-icon-chip-1",
  },
  {
    title: "Delivered",
    value: 9,
    icon: <CheckCircle size={28} />,
    color: "fd-icon-chip-2",
  },
  {
    title: "Total Spent",
    value: "₹8,450",
    icon: <IndianRupee size={28} />,
    color: "fd-icon-chip-3",
  },
];

const recentOrders = [
  {
    id: "#ORD1001",
    farmer: "Green Farm",
    amount: "₹850",
    status: "Placed",
  },
  {
    id: "#ORD1002",
    farmer: "Nature Organic",
    amount: "₹1200",
    status: "Shipped",
  },
  {
    id: "#ORD1003",
    farmer: "Healthy Crops",
    amount: "₹650",
    status: "Delivered",
  },
];

const BuyerDashboard = () => {
  return (
    <div className="fd-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div>
            <h1 className="fd-display text-4xl font-semibold" style={{ color: "#1E3527" }}>
              Buyer Dashboard
            </h1>

            <p className="mt-2" style={{ color: "#8A8578" }}>
              Welcome back! Track your orders and continue shopping.
            </p>
          </div>

          <Link
            to="/products"
            className="fd-btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>

        {/* Statistics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item) => (
            <div key={item.title} className="fd-stat-card rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p style={{ color: "#8A8578" }}>{item.title}</p>

                  <h2 className="fd-display text-3xl font-semibold mt-2" style={{ color: "#1E3527" }}>
                    {item.value}
                  </h2>
                </div>

                <div className={`p-4 rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}

          <div className="fd-panel lg:col-span-2 rounded-2xl">
            <div
              className="flex justify-between items-center p-6"
              style={{ borderBottom: "1px solid #E7E2D2" }}
            >
              <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E3527" }}>
                Recent Orders
              </h2>

              <Link to="/orders" className="fd-link-accent font-semibold">
                View All
              </Link>
            </div>

            <div>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="fd-row p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold fd-mono text-sm" style={{ color: "#23281F" }}>
                      {order.id}
                    </h3>

                    <p className="text-sm" style={{ color: "#8A8578" }}>
                      Farmer: {order.farmer}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold fd-mono">{order.amount}</p>

                    <span className="fd-status-pill text-sm font-medium">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="space-y-6">
            <div className="fd-panel rounded-2xl p-6">
              <h2 className="fd-display text-xl font-semibold mb-5" style={{ color: "#1E3527" }}>
                Quick Actions
              </h2>

              <div className="space-y-4">
                <Link
                  to="/products"
                  className="fd-quick-action-0 flex items-center justify-between rounded-xl p-4"
                >
                  <span className="flex items-center gap-3">
                    <Search />
                    Browse Products
                  </span>

                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/cart"
                  className="fd-quick-action-1 flex items-center justify-between rounded-xl p-4"
                >
                  <span className="flex items-center gap-3">
                    <Package />
                    My Cart
                  </span>

                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/orders"
                  className="fd-quick-action-2 flex items-center justify-between rounded-xl p-4"
                >
                  <span className="flex items-center gap-3">
                    <Truck />
                    Track Orders
                  </span>

                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="fd-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart style={{ color: "#B5502E" }} />

                <h2 className="fd-display text-xl font-semibold" style={{ color: "#1E3527" }}>
                  Wishlist
                </h2>
              </div>

              <p style={{ color: "#8A8578" }}>
                You have
                <span className="fd-wishlist-count fd-mono font-bold"> 6 </span>
                saved products.
              </p>

              <Link
                to="/wishlist"
                className="fd-link-accent inline-block mt-5 font-semibold"
              >
                View Wishlist →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;