const colors = {
  placed: "bg-blue-100 text-blue-700",
  accepted: "bg-indigo-100 text-indigo-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;