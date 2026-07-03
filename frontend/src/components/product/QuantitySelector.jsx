import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({
  quantity,
  setQuantity,
  maxQuantity,
}) => {
  return (
    <div className="flex items-center gap-5 mt-6">

      <button
        onClick={() =>
          quantity > 1 && setQuantity(quantity - 1)
        }
        className="w-10 h-10 rounded-full border flex items-center justify-center"
      >
        <Minus size={18} />
      </button>

      <span className="text-xl font-semibold">
        {quantity}
      </span>

      <button
        onClick={() =>
          quantity < maxQuantity &&
          setQuantity(quantity + 1)
        }
        className="w-10 h-10 rounded-full border flex items-center justify-center"
      >
        <Plus size={18} />
      </button>

    </div>
  );
};

export default QuantitySelector;