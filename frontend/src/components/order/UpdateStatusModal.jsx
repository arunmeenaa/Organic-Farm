import { X } from "lucide-react";

const statusFlow = {
  placed: "accepted",
  accepted: "packed",
  packed: "shipped",
  shipped: "delivered",
};

const UpdateStatusModal = ({
  open,
  onClose,
  status,
  onUpdate,
}) => {
  if (!open) return null;

  const nextStatus = statusFlow[status];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-md p-8">

        <div className="flex justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Update Status
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <p className="mb-8">
          Change order status to
          <strong className="capitalize">
            {" "}
            {nextStatus}
          </strong>
          ?
        </p>

        <div className="flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-3"
          >
            Cancel
          </button>

          <button
            onClick={() => onUpdate(nextStatus)}
            className="flex-1 bg-green-600 text-white rounded-xl py-3"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
};

export default UpdateStatusModal;