import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";


const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-card { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-product-card {
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .fd-product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 36px -18px rgba(6, 95, 70, 0.35);
    }

    .fd-product-media { overflow: hidden; }
    .fd-product-media img { transition: transform 0.4s ease; }
    .fd-product-card:hover .fd-product-media img { transform: scale(1.05); }

    .fd-category-chip {
      background: rgba(132, 204, 22, 0.18);
      color: #4D7C0F;
    }

    .fd-farmer-text { color: #7A8D82; }

    .fd-price { color: #065F46; }

    .fd-stock-text { color: #4B6357; }

    .fd-view-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-view-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -10px rgba(5, 150, 105, 0.5); }
    .fd-view-btn:active { transform: translateY(0); }
  `}</style>
);

const ProductCard = ({ product }) => {
  return (
    <div className="fd-card fd-product-card rounded-2xl overflow-hidden">
      <FontImport />

      <div className="fd-product-media h-56">
        <img
          src={
            product.images?.[0] ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <span className="fd-category-chip text-xs px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>

        <h2 className="text-xl font-semibold mt-3" style={{ color: "#0F2E22" }}>
          {product.name}
        </h2>

        <p className="fd-farmer-text mt-2">
          Farmer: {product.farmer?.name}
        </p>

        <div className="flex justify-between items-center mt-5">
          <h3 className="fd-price fd-display text-2xl font-semibold">
            ₹{product.price}
          </h3>

          <span className="fd-stock-text fd-mono text-sm">
            Stock: {product.quantity}
          </span>
        </div>

        <Link
          to={`/products/${product._id}`}
          className="fd-view-btn mt-5 w-full rounded-xl py-3 flex items-center justify-center gap-2 font-medium"
        >
          <ShoppingCart size={18} />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;