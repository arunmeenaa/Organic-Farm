import { MapPin, User, ShoppingCart } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { notify } from "../../utils/toast";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-info { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-category-chip {
      background: rgba(231, 168, 60, 0.16);
      color: #8A5A16;
    }

    .fd-price { color: #1E3527; }

    .fd-meta-row { color: #4A5147; }

    .fd-description { color: #4A5147; }

    .fd-available-value { color: #1E3527; }

    .fd-btn-add {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-add:hover:not(:disabled) { background: #2F5233; }
    .fd-btn-add:active:not(:disabled) { transform: scale(0.98); }
    .fd-btn-add:disabled { background: #C9C3B0; cursor: not-allowed; }

    .fd-btn-buy {
      border: 2px solid #1E3527;
      color: #1E3527;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-buy:hover:not(:disabled) { background: rgba(30, 53, 39, 0.06); }
    .fd-btn-buy:active:not(:disabled) { transform: scale(0.98); }
    .fd-btn-buy:disabled { border-color: #C9C3B0; color: #C9C3B0; cursor: not-allowed; }
  `}</style>
);

const ProductInfo = ({ product, quantity, setQuantity }) => {
  const { addItem } = useCart();
  const handleAddToCart = async () => {
    try {
      await addItem(product._id, quantity);

      notify.success("Product added successfully 🌱");
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to add product");
    }
  };
  return (
    <div className="fd-info">
      <FontImport />

      <span className="fd-category-chip px-3 py-1 rounded-full text-sm font-medium">
        {product.category}
      </span>

      <h1 className="fd-display text-4xl font-semibold mt-4" style={{ color: "#1E3527" }}>
        {product.name}
      </h1>

      <p className="fd-price fd-display text-4xl font-semibold mt-5">
        ₹{product.price}
      </p>

      <div className="fd-meta-row mt-6 space-y-2">
        <div className="flex items-center gap-2">
          <User size={18} />
          {product.farmer?.name}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} />
          {product.farmer?.location}
        </div>
      </div>

      <p className="fd-description mt-8 leading-7">{product.description}</p>

      <p className="mt-6 font-semibold" style={{ color: "#23281F" }}>
        Available:
        <span className="fd-available-value fd-mono ml-2">{product.quantity}</span>
      </p>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={product.quantity}
      />

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className="fd-btn-add flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          disabled={product.quantity === 0}
          className="fd-btn-buy flex-1 py-4 rounded-xl font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;