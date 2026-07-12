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
import { useAuth } from "../../context/AuthContext";
import { getBuyerDashboard } from "../../services/dashboard.service";
import { useEffect, useState } from "react";
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    
    .fd-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
      radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
      radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
      #F4F9F2;
      }
      .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
      .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      
      .fd-title-gradient {
        background: linear-gradient(90deg, #065F46, #65A30D);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        }
        
        .fd-panel {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          }
          
          .fd-stat-card {
            background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
      }
    .fd-stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px -18px rgba(6, 95, 70, 0.3);
    }
    
    .fd-icon-chip-0 { background: rgba(5, 150, 105, 0.12); color: #059669; }
    .fd-icon-chip-1 { background: rgba(245, 158, 11, 0.16); color: #B45309; }
    .fd-icon-chip-2 { background: rgba(132, 204, 22, 0.16); color: #4D7C0F; }
    .fd-icon-chip-3 { background: rgba(13, 148, 136, 0.14); color: #0F766E; }
    
    .fd-row { border-bottom: 1px solid rgba(5, 150, 105, 0.1); transition: background 0.15s ease; }
    .fd-row:last-child { border-bottom: none; }
    .fd-row:hover { background: rgba(5, 150, 105, 0.04); }
    
    .fd-link-accent { color: #059669; transition: color 0.15s ease; }
    .fd-link-accent:hover { color: #065F46; }
    
    .fd-status-pill { color: #065F46; }
    
    .fd-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .fd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
      
      .fd-quick-action-0 { background: rgba(5, 150, 105, 0.08); color: #065F46; transition: background 0.15s ease; }
      .fd-quick-action-0:hover { background: rgba(5, 150, 105, 0.16); }
      .fd-quick-action-1 { background: rgba(245, 158, 11, 0.12); color: #B45309; transition: background 0.15s ease; }
      .fd-quick-action-1:hover { background: rgba(245, 158, 11, 0.2); }
      .fd-quick-action-2 { background: rgba(132, 204, 22, 0.14); color: #4D7C0F; transition: background 0.15s ease; }
      .fd-quick-action-2:hover { background: rgba(132, 204, 22, 0.22); }
      
      .fd-wishlist-count { color: #059669; }
      `}</style>
);

const BuyerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const { data } = await getBuyerDashboard();

        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fd-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div>
            <h1 className="fd-display fd-title-gradient text-4xl font-bold">
              Buyer Dashboard
            </h1>

            <h1 className="fd-display fd-title-gradient text-4xl font-bold">
              Welcome back, {user?.name ?? "Buyer"} 
            </h1>

            <p className="mt-2" style={{ color: "#7A8D82" }}>
              Track your orders and continue shopping.
            </p>
          </div>

          <Link
            to="/market-place"
            className="fd-btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>

        {/* Statistics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="fd-stat-card rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p style={{ color: "#7A8D82" }}>Total Orders</p>

                <h2
                  className="fd-display text-3xl font-bold mt-2"
                  style={{ color: "#0F2E22" }}
                >
                  {stats?.totalOrders ?? 0}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-green-100">
                <Package />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}

          <div className="fd-panel lg:col-span-2 rounded-2xl">
            <div
              className="flex justify-between items-center p-6"
              style={{ borderBottom: "1px solid rgba(5, 150, 105, 0.14)" }}
            >
              <h2
                className="fd-display text-2xl font-semibold"
                style={{ color: "#0F2E22" }}
              >
                Recent Orders
              </h2>

              <Link to="/orders" className="fd-link-accent font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="fd-row flex items-center justify-between rounded-xl p-5 hover:bg-green-50 transition-colors"
                >
                  {/* Left Section */}
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: "#0F2E22" }}
                    >
                      {order.products[0].productName}
                      {order.products.length > 1 &&
                        ` +${order.products.length - 1} more`}
                    </h3>

                    <p className="text-sm mt-1" style={{ color: "#7A8D82" }}>
                      Order #{order.orderNumber}
                    </p>

                    <p className="text-sm mt-1" style={{ color: "#7A8D82" }}>
                      🌾 Farmer:{" "}
                      <span className="font-medium">{order.farmer?.name}</span>
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="text-right">
                    <h3
                      className="text-xl font-bold fd-mono"
                      style={{ color: "#0F2E22" }}
                    >
                      ₹{order.totalPrice}
                    </h3>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="space-y-6">
            <div className="fd-panel rounded-2xl p-6">
              <h2
                className="fd-display text-xl font-semibold mb-5"
                style={{ color: "#0F2E22" }}
              >
                Quick Actions
              </h2>

              <div className="space-y-4">
                <Link
                  to="/market-place"
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
                <Heart style={{ color: "#E11D48" }} />

                <h2
                  className="fd-display text-xl font-semibold"
                  style={{ color: "#0F2E22" }}
                >
                  Wishlist
                </h2>
              </div>

              <p style={{ color: "#7A8D82" }}>
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
