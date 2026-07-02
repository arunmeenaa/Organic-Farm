import {
  Package,
  ShoppingBag,
  IndianRupee,
  Plus,
  Eye,
  Clock,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: 18,
    icon: <Package size={30} />,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Orders",
    value: 42,
    icon: <ShoppingBag size={30} />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Revenue",
    value: "₹18,500",
    icon: <IndianRupee size={30} />,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const recentProducts = [
  {
    id: 1,
    name: "Organic Tomato",
    price: "₹40/kg",
    stock: 80,
    status: "Active",
  },
  {
    id: 2,
    name: "Fresh Carrot",
    price: "₹60/kg",
    stock: 35,
    status: "Active",
  },
  {
    id: 3,
    name: "Potato",
    price: "₹30/kg",
    stock: 0,
    status: "Inactive",
  },
];

const recentOrders = [
  {
    id: "#ORD1001",
    buyer: "Rahul Sharma",
    amount: "₹850",
    status: "Placed",
  },
  {
    id: "#ORD1002",
    buyer: "Ankit Verma",
    amount: "₹450",
    status: "Packed",
  },
  {
    id: "#ORD1003",
    buyer: "Priya Singh",
    amount: "₹1200",
    status: "Delivered",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Farmer Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back! Here's an overview of your farm.
            </p>

          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
            <Plus size={20} />
            Add Product
          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow"
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

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Products */}

          <div className="bg-white rounded-2xl shadow">

            <div className="p-6 border-b">

              <h2 className="text-2xl font-semibold">
                Recent Products
              </h2>

            </div>

            <div className="divide-y">

              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {product.price}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-medium">
                      Stock: {product.stock}
                    </p>

                    <span
                      className={`text-sm ${
                        product.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Orders */}

          <div className="bg-white rounded-2xl shadow">

            <div className="p-6 border-b">

              <h2 className="text-2xl font-semibold">
                Recent Orders
              </h2>

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
                      {order.buyer}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
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

        </div>

        {/* Quick Actions */}

        <div className="mt-10 bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">

            <button className="bg-green-600 text-white rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-green-700">
              <Plus size={20} />
              Add Product
            </button>

            <button className="bg-blue-600 text-white rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-blue-700">
              <Eye size={20} />
              View Products
            </button>

            <button className="bg-yellow-500 text-white rounded-xl p-5 flex items-center justify-center gap-2 hover:bg-yellow-600">
              <Clock size={20} />
              Manage Orders
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;