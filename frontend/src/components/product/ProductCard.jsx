import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CardStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-card    { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono    { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    /* ── Card shell — LIGHT ── */
    .fd-product-card {
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.60);
      transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .fd-product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 36px -18px rgba(6, 95, 70, 0.35);
    }

    /* ── Card shell — DARK ── */
    .pc-dark.fd-product-card {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(52, 211, 153, 0.12);
    }
    .pc-dark.fd-product-card:hover {
      box-shadow: 0 20px 36px -14px rgba(0, 0, 0, 0.50);
      border-color: rgba(52, 211, 153, 0.22);
    }

    /* ── Image zoom ── */
    .fd-product-media { overflow: hidden; }
    .fd-product-media img { transition: transform 0.4s ease; }
    .fd-product-card:hover .fd-product-media img { transform: scale(1.05); }

    /* ── Category chip — LIGHT ── */
    .fd-category-chip {
      background: rgba(132, 204, 22, 0.18);
      color: #4D7C0F;
    }
    /* DARK */
    .pc-dark .fd-category-chip {
      background: rgba(132, 204, 22, 0.14);
      color: #BEF264;
    }

    /* ── Product name — LIGHT ── */
    .fd-product-name { color: #0F2E22; }
    /* DARK */
    .pc-dark .fd-product-name { color: #D1FAE5; }

    /* ── seller text — LIGHT ── */
    .fd-seller-text { color: #7A8D82; }
    /* DARK */
    .pc-dark .fd-seller-text { color: rgba(167, 243, 208, 0.55); }

    /* ── Price — LIGHT ── */
    .fd-price { color: #065F46; }
    /* DARK */
    .pc-dark .fd-price { color: #34D399; }

    /* ── Stock text — LIGHT ── */
    .fd-stock-text { color: #4B6357; }
    /* DARK */
    .pc-dark .fd-stock-text { color: rgba(167, 243, 208, 0.50); }

    /* ── CTA button (same gradient both modes) ── */
    .fd-view-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-view-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 20px -10px rgba(5, 150, 105, 0.55);
    }
    .fd-view-btn:active { transform: translateY(0); }
    .pc-dark .fd-view-btn { color: #fff; }
  `}</style>
);

const ProductCard = ({ product }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`fd-card fd-product-card${darkMode ? " pc-dark" : ""} rounded-2xl overflow-hidden`}>
      <CardStyles />

      {/* Image */}
      <div className="fd-product-media h-56">
        <img
          src={product.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-5">
        <span className="fd-category-chip text-xs px-3 py-1 rounded-full font-medium">
          {product.category}
        </span>

        <h2 className="fd-product-name text-xl font-semibold mt-3">
          {product.name}
        </h2>

        <p className="fd-seller-text mt-2 text-sm">
          seller: {product.seller?.name}
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
