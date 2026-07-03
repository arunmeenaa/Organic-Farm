import {
  ClipboardCheck,
  CheckCircle,
  Package,
  Truck,
  Home,
  XCircle,
} from "lucide-react";

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
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-3">
        <XCircle className="text-red-600" size={28} />
        <div>
          <h3 className="font-semibold text-red-700">
            Order Cancelled
          </h3>

          <p className="text-sm text-red-600">
            This order has been cancelled.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-semibold mb-8">
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
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                />
              )}

              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                  completed
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <Icon size={22} />
              </div>

              <p
                className={`mt-3 text-sm font-medium ${
                  completed
                    ? "text-green-700"
                    : "text-gray-500"
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