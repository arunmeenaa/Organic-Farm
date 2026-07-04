import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

// Shared design tokens with Navbar/Hero/Categories/FeaturedProducts/Products/Dashboard:
// forest green + harvest marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-card { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-product-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .fd-product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 36px -18px rgba(30, 53, 39, 0.35);
      border-color: #DDD6C4;
    }

    .fd-product-media { overflow: hidden; }
    .fd-product-media img { transition: transform 0.4s ease; }
    .fd-product-card:hover .fd-product-media img { transform: scale(1.05); }

    .fd-category-chip {
      background: rgba(231, 168, 60, 0.16);
      color: #8A5A16;
    }

    .fd-farmer-text { color: #8A8578; }

    .fd-price { color: #1E3527; }

    .fd-stock-text { color: #4A5147; }

    .fd-view-btn {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-view-btn:hover { background: #2F5233; }
    .fd-view-btn:active { transform: scale(0.98); }
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

        <h2 className="text-xl font-semibold mt-3" style={{ color: "#23281F" }}>
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