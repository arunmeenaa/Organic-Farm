import {
  ClipboardCheck,
  CheckCircle,
  Package,
  Truck,
  Home,
  XCircle,
} from "lucide-react";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/sellerOrderCard/
// sellerOrderDetails: glassmorphism, emerald → lime gradient, Space Grotesk.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

    .ost-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .ost-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .ost-cancelled {
      background: rgba(225, 29, 72, 0.08);
      border: 1px solid rgba(225, 29, 72, 0.25);
    }

    .ost-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .ost-track-done { background: linear-gradient(90deg, #059669, #84CC16); }
    .ost-track-pending { background: #DCEBDD; }

    .ost-step-done {
      background: linear-gradient(135deg, #059669, #84CC16);
      color: #063527;
    }
    .ost-step-pending {
      background: #E7E9E4;
      color: #A6B3AA;
    }

    .ost-label-done { color: #065F46; }
    .ost-label-pending { color: #A6B3AA; }
  `}</style>
);

const steps = [
  {
    key: "placed",
    label: "Placed",
    icon: ClipboardCheck,
  },
  {
    key: "accepted",
    label: "Accepted",
    icon: CheckCircle,
  },
  {
    key: "packed",
    label: "Packed",
    icon: Package,
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: Home,
  },
];

const OrderStatusTimeline = ({ status }) => {
  if (status === "cancelled") {
    return (
      <div className="ost-root">
        <FontImport />
        <div className="ost-cancelled rounded-xl p-6 flex items-center gap-3">
          <XCircle style={{ color: "#E11D48" }} size={28} />
          <div>
            <h3 className="font-semibold" style={{ color: "#E11D48" }}>
              Order Cancelled
            </h3>

            <p className="text-sm" style={{ color: "#E11D48" }}>
              This order has been cancelled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="ost-root ost-panel rounded-2xl shadow-sm p-8">
      <FontImport />
      <h2 className="ost-display text-2xl font-semibold mb-8" style={{ color: "#0F2E22" }}>
        Order Progress
      </h2>

      <div className="flex justify-between items-start">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = index <= currentIndex;

          return (
            <div
              key={step.key}
              className="flex-1 flex flex-col items-center relative"
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-1 ${
                    index < currentIndex
                      ? "ost-track-done"
                      : "ost-track-pending"
                  }`}
                />
              )}

              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                  completed ? "ost-step-done" : "ost-step-pending"
                }`}
              >
                <Icon size={22} />
              </div>

              <p
                className={`mt-3 text-sm font-medium ${
                  completed ? "ost-label-done" : "ost-label-pending"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;