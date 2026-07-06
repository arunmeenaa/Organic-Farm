import { MapPin, User, ShoppingCart } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { notify } from "../../utils/toast";
import { useAuth } from "../../context/AuthContext";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/Dashboard/Footer/
// BuyerDashboard/Cart/BuyerOrders/Products/ProductCard/ProductDetails:
// emerald → lime gradient accents, Space Grotesk display type.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-info { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-category-chip {
      background: rgba(132, 204, 22, 0.18);
      color: #4D7C0F;
    }

    .fd-price { color: #065F46; }

    .fd-meta-row { color: #4B6357; }

    .fd-description { color: #4B6357; }

    .fd-available-value { color: #065F46; }

    .fd-btn-add {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.1s ease, box-shadow 0.15s ease;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
    }
    .fd-btn-add:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
    .fd-btn-add:active:not(:disabled) { transform: translateY(0); }
    .fd-btn-add:disabled { background: #C9D3CC; color: #8B9B92; box-shadow: none; cursor: not-allowed; }

    .fd-btn-buy {
      border: 2px solid #059669;
      color: #065F46;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-buy:hover:not(:disabled) { background: rgba(5, 150, 105, 0.08); }
    .fd-btn-buy:active:not(:disabled) { transform: scale(0.98); }
    .fd-btn-buy:disabled { border-color: #C9D3CC; color: #8B9B92; cursor: not-allowed; }
  `}</style>
);

const ProductInfo = ({ product, quantity, setQuantity }) => {
  const { isAuthenticated } = useAuth();
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

      <h1 className="fd-display text-4xl font-semibold mt-4" style={{ color: "#0F2E22" }}>
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

      <p className="mt-6 font-semibold" style={{ color: "#0F2E22" }}>
        Available:
        <span className="fd-available-value fd-mono ml-2">{product.quantity}</span>
      </p>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={product.quantity}
      />

      <div className="flex gap-4 mt-8">
  {isAuthenticated ? (
    <>
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
    </>
  ) : (
    <Link
      to="/login"
      className="flex-1 text-center py-4 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white"
    >
      Login to Purchase
    </Link>
  )}
</div>
    </div>
  );
};

export default ProductInfo;