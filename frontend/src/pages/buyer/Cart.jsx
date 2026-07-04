import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";

import { useCart } from "../../context/CartContext";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-clear-btn { color: #B5502E; transition: color 0.15s ease; }
    .fd-clear-btn:hover { color: #963f22; }

    .fd-item-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-left: 3px solid #E7A83C;
      transition: box-shadow 0.18s ease, transform 0.18s ease;
    }
    .fd-item-card:hover {
      box-shadow: 0 16px 28px -18px rgba(30, 53, 39, 0.3);
      transform: translateY(-2px);
    }

    .fd-qty-btn {
      border: 1px solid #DDD6C4;
      color: #1E3527;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .fd-qty-btn:hover:not(:disabled) {
      background: #1E3527;
      color: #F6F4EC;
      border-color: #1E3527;
    }
    .fd-qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .fd-remove-btn { color: #B5502E; transition: color 0.15s ease; }
    .fd-remove-btn:hover { color: #963f22; }

    .fd-summary-card {
      background: #1E3527;
      color: #F6F4EC;
    }
    .fd-summary-row { color: rgba(246, 244, 236, 0.75); }
    .fd-summary-divider { border-top: 1px solid rgba(246, 244, 236, 0.18); }

    .fd-checkout-btn {
      background: #E7A83C;
      color: #1E3527;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-checkout-btn:hover { background: #F3BC5D; transform: translateY(-1px); }
    .fd-checkout-btn:active { transform: translateY(0); }

    .fd-continue-link {
      color: rgba(246, 244, 236, 0.85);
      transition: color 0.15s ease;
    }
    .fd-continue-link:hover { color: #FFFFFF; }

    .fd-empty-icon { color: #DDD6C4; }
    .fd-btn-primary-outline {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease;
    }
    .fd-btn-primary-outline:hover { background: #2F5233; }
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

        <h2 className="fd-display text-4xl font-semibold mt-6" style={{ color: "#1E3527" }}>
          Your Cart is Empty
        </h2>

        <p className="mt-3" style={{ color: "#8A8578" }}>
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="fd-btn-primary-outline mt-8 px-8 py-4 rounded-xl font-medium"
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
          <h1 className="fd-display text-4xl font-semibold" style={{ color: "#1E3527" }}>
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
                  <h2 className="text-2xl font-semibold" style={{ color: "#23281F" }}>
                    {item.product.name}
                  </h2>

                  <p className="mt-2" style={{ color: "#8A8578" }}>
                    Farmer: {item.product.farmer?.name}
                  </p>

                  <p className="fd-display text-xl font-semibold mt-3" style={{ color: "#1E3527" }}>
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

                    <span className="fd-mono font-semibold text-lg" style={{ color: "#23281F" }}>
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
                <span style={{ color: "#E7A83C" }}>FREE</span>
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