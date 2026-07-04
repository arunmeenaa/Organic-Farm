const styles = {
  placed: { background: "rgba(5, 150, 105, 0.1)", color: "#065F46" },
  accepted: { background: "rgba(132, 204, 22, 0.16)", color: "#4D7C0F" },
  packed: { background: "rgba(245, 158, 11, 0.16)", color: "#B45309" },
  shipped: { background: "rgba(13, 148, 136, 0.14)", color: "#0F766E" },
  delivered: { background: "rgba(5, 150, 105, 0.16)", color: "#047857" },
  cancelled: { background: "rgba(225, 29, 72, 0.1)", color: "#E11D48" },
};

const defaultStyle = { background: "#E7E9E4", color: "#4B6357" };

const OrderStatusBadge = ({ status }) => {
  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-medium capitalize"
      style={styles[status] || defaultStyle}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;