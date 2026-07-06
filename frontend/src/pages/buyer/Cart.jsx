import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";

import { useCart } from "../../context/CartContext";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/Dashboard/Footer/
// BuyerDashboard: glassmorphism over an emerald → lime gradient mesh.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-clear-btn { color: #E11D48; transition: color 0.15s ease; }
    .fd-clear-btn:hover { color: #BE123C; }

    .fd-item-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-left: 3px solid #84CC16;
      transition: box-shadow 0.18s ease, transform 0.18s ease;
    }
    .fd-item-card:hover {
      box-shadow: 0 16px 28px -18px rgba(6, 95, 70, 0.3);
      transform: translateY(-2px);
    }

    .fd-qty-btn {
      border: 1px solid #DCEBDD;
      color: #065F46;
      transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }
    .fd-qty-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #059669, #84CC16);
      color: #063527;
      border-color: transparent;
    }
    .fd-qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .fd-remove-btn { color: #E11D48; transition: color 0.15s ease; }
    .fd-remove-btn:hover { color: #BE123C; }

    .fd-summary-card {
      background: linear-gradient(150deg, #065F46 0%, #14532D 100%);
      color: #F4F9F2;
    }
    .fd-summary-row { color: rgba(244, 249, 242, 0.75); }
    .fd-summary-divider { border-top: 1px solid rgba(244, 249, 242, 0.18); }

    .fd-checkout-btn {
      background: linear-gradient(90deg, #84CC16, #A3E635);
      color: #14532D;
      transition: transform 0.1s ease, box-shadow 0.15s ease;
      box-shadow: 0 10px 22px -10px rgba(0,0,0,0.3);
    }
    .fd-checkout-btn:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(0,0,0,0.35); }
    .fd-checkout-btn:active { transform: translateY(0); }

    .fd-continue-link {
      color: rgba(244, 249, 242, 0.85);
      transition: color 0.15s ease;
    }
    .fd-continue-link:hover { color: #FFFFFF; }

    .fd-empty-icon { color: #B7C9BB; }
    .fd-btn-primary-outline {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.15s ease;
    }
    .fd-btn-primary-outline:hover { transform: translateY(-1px); }
  `}</style>
);

const Cart = () => {
  const { cart, subtotal, loading, updateItem, removeItem, clear } = useCart();

  if (loading) {
    return (
      <div className="fd-root max-w-7xl mx-auto py-20 text-center">
        <FontImport />
        Loading cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="fd-root min-h-[70vh] flex flex-col items-center justify-center">
        <FontImport />
        <ShoppingCart size={90} className="fd-empty-icon" />

        <h2 className="fd-display text-4xl font-semibold mt-6" style={{ color: "#0F2E22" }}>
          Your Cart is Empty
        </h2>

        <p className="mt-3" style={{ color: "#7A8D82" }}>
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="fd-btn-primary-outline mt-8 px-8 py-4 rounded-xl font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="fd-display text-4xl font-bold" style={{ color: "#0F2E22" }}>
            Shopping Cart
          </h1>

          <button
            onClick={clear}
            className="fd-clear-btn flex items-center gap-2 font-medium"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="fd-item-card rounded-2xl p-5 flex gap-5"
              >
                <img
                  src={
                    item.product.images?.[0] || "https://placehold.co/150x150"
                  }
                  alt={item.product.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold" style={{ color: "#0F2E22" }}>
                    {item.product.name}
                  </h2>

                  <p className="mt-2" style={{ color: "#7A8D82" }}>
                    Farmer: {item.product.farmer?.name}
                  </p>

                  <p className="fd-display text-xl font-semibold mt-3" style={{ color: "#065F46" }}>
                    ₹{item.product.price}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateItem(item.product._id, item.quantity - 1)
                      }
                      className="fd-qty-btn rounded-full p-2"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="fd-mono font-semibold text-lg" style={{ color: "#0F2E22" }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateItem(item.product._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.quantity}
                      className="fd-qty-btn rounded-full p-2"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="fd-remove-btn ml-auto font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="fd-summary-card rounded-2xl shadow-lg p-8 h-fit sticky top-24">
            <h2 className="fd-display text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="fd-summary-row flex justify-between">
                <span>Subtotal</span>
                <span className="fd-mono">₹{subtotal}</span>
              </div>

              <div className="fd-summary-row flex justify-between">
                <span>Delivery</span>
                <span style={{ color: "#A3E635" }}>FREE</span>
              </div>

              <hr className="fd-summary-divider" />

              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span className="fd-mono">₹{subtotal}</span>
              </div>
            </div>

            <Link
              className="fd-checkout-btn w-full mt-8 py-4 rounded-xl flex justify-center items-center gap-2 font-semibold"
              to="/checkout"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              className="fd-continue-link block text-center mt-5"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;