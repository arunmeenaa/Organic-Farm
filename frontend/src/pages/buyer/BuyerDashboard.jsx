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

const stats = [
  {
    title: "Total Orders",
    value: 12,
    icon: <ShoppingBag size={28} />,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Pending Orders",
    value: 3,
    icon: <Truck size={28} />,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Delivered",
    value: 9,
    icon: <CheckCircle size={28} />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Total Spent",
    value: "₹8,450",
    icon: <IndianRupee size={28} />,
    color: "bg-purple-100 text-purple-700",
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
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Buyer Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome back! Track your orders and continue shopping.
            </p>

          </div>

          <Link
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Search size={20} />
            Browse Products
          </Link>

        </div>

        {/* Statistics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
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

          <div className="lg:col-span-2 bg-white rounded-2xl shadow">

            <div className="flex justify-between items-center p-6 border-b">

              <h2 className="text-2xl font-semibold">
                Recent Orders
              </h2>

              <Link
                to="/orders"
                className="text-green-600 font-semibold"
              >
                View All
              </Link>

            </div>

            <div className="divide-y">

              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold">
                      {order.id}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Farmer: {order.farmer}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold">
                      {order.amount}
                    </p>

                    <span className="text-green-600 text-sm">
                      {order.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Quick Actions */}

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl font-semibold mb-5">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <Link
                  to="/products"
                  className="flex items-center justify-between bg-green-50 hover:bg-green-100 rounded-xl p-4"
                >
                  <span className="flex items-center gap-3">
                    <Search />
                    Browse Products
                  </span>

                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 rounded-xl p-4"
                >
                  <span className="flex items-center gap-3">
                    <Package />
                    My Cart
                  </span>

                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center justify-between bg-yellow-50 hover:bg-yellow-100 rounded-xl p-4"
                >
                  <span className="flex items-center gap-3">
                    <Truck />
                    Track Orders
                  </span>

                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3 mb-4">

                <Heart className="text-red-500" />

                <h2 className="text-xl font-semibold">
                  Wishlist
                </h2>

              </div>

              <p className="text-gray-500">
                You have
                <span className="font-bold text-black"> 6 </span>
                saved products.
              </p>

              <Link
                to="/wishlist"
                className="inline-block mt-5 text-green-600 font-semibold"
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