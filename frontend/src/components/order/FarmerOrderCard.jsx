import { Link } from "react-router-dom";
import {
  Calendar,
  IndianRupee,
  User,
} from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct: glassmorphism over an
// emerald → lime gradient accent, Space Grotesk display type.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .foc-card {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .foc-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }
    .foc-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .foc-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .foc-divider { border-top: 1px solid rgba(5, 150, 105, 0.14); }

    .foc-view-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.15s ease;
    }
    .foc-view-btn:hover { transform: translateY(-1px); }
  `}</style>
);

const FarmerOrderCard = ({ order }) => {
  return (
    <div className="foc-card rounded-2xl p-6">
      <FontImport />

      <div className="flex justify-between">
        <div>
          <h2 className="foc-display font-bold text-xl" style={{ color: "#0F2E22" }}>
            {order.orderNumber}
          </h2>

          <div className="flex items-center gap-2 mt-2" style={{ color: "#7A8D82" }}>
            <User size={16} />
            {order.buyer.name}
          </div>

          <div className="flex items-center gap-2 mt-2" style={{ color: "#7A8D82" }}>
            <Calendar size={16} />
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>

        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <div className="foc-divider my-5"></div>

      {order.products.map((item) => (
        <div key={item.product} className="flex justify-between mb-2" style={{ color: "#4B6357" }}>
          <span>{item.productName}</span>

          <span>
            {item.quantity} {item.unit}
          </span>
        </div>
      ))}

      <div className="foc-divider my-5"></div>

      <div className="flex justify-between items-center">
        <div className="foc-mono flex items-center font-bold text-2xl" style={{ color: "#0F2E22" }}>
          <IndianRupee size={20} />
          {order.totalPrice}
        </div>

        <Link
          to={`/farmer/orders/${order._id}`}
          className="foc-view-btn px-5 py-2 rounded-lg font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FarmerOrderCard;