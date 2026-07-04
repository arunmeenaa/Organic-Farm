import { Link } from "react-router-dom";
import {
  Calendar,
  IndianRupee,
  User,
} from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

const FarmerOrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="font-bold text-xl">
            {order.orderNumber}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <User size={16} />
            {order.buyer.name}
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-500">
            <Calendar size={16} />
            {new Date(order.createdAt).toLocaleDateString()}
          </div>

        </div>

        <OrderStatusBadge status={order.orderStatus} />

      </div>

      <div className="border-t my-5"></div>

      {order.products.map((item) => (
        <div
          key={item.product}
          className="flex justify-between mb-2"
        >
          <span>{item.productName}</span>

          <span>
            {item.quantity} {item.unit}
          </span>
        </div>
      ))}

      <div className="border-t my-5"></div>

      <div className="flex justify-between items-center">

        <div className="flex items-center font-bold text-2xl">
          <IndianRupee size={20} />
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
  );
};

export default FarmerOrderCard;