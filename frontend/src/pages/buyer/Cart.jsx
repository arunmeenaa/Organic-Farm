import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

const Cart = () => {
  const { cart, subtotal, loading, updateItem, removeItem, clear } = useCart();
  const { darkMode } = useTheme();

  /* ── Shared tokens ── */
  const textPrimary = darkMode ? "text-[#D1FAE5]" : "text-[#0F2E22]";
  const textMuted = darkMode
    ? "text-[rgba(167,243,208,0.55)]"
    : "text-[#7A8D82]";
  const textAccent = darkMode ? "text-emerald-400" : "text-[#065F46]";

  // fd-item-card
  const itemCard = [
    "rounded-2xl p-5 flex gap-5",
    "backdrop-blur-[16px] border-l-[3px] border-l-[#84CC16]",
    "transition-[box-shadow,transform] duration-[180ms]",
    "hover:shadow-[0_16px_28px_-18px_rgba(6,95,70,0.30)] hover:-translate-y-0.5",
    darkMode
      ? "bg-white/[0.05] border border-[rgba(52,211,153,0.10)]"
      : "bg-white/[0.72] border border-white/60",
  ].join(" ");

  // fd-qty-btn
  const qtyBtn = [
    "rounded-full p-2 border transition-[background,border-color,color] duration-150",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "hover:enabled:bg-gradient-to-br hover:enabled:from-[#059669] hover:enabled:to-[#84CC16]",
    "hover:enabled:text-[#063527] hover:enabled:border-transparent",
    darkMode
      ? "border-[rgba(52,211,153,0.25)] text-emerald-300"
      : "border-[#DCEBDD] text-[#065F46]",
  ].join(" ");

  if (loading) {
    return (
      <div
        className={`fd-root max-w-7xl mx-auto py-20 text-center ${textMuted}`}
      >
        Loading cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="fd-root min-h-[70vh] flex flex-col items-center justify-center">
        {/* fd-empty-icon */}
        <ShoppingCart
          size={90}
          className={
            darkMode ? "text-[rgba(52,211,153,0.30)]" : "text-[#B7C9BB]"
          }
        />

        <h2
          className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-4xl font-semibold mt-6 ${textPrimary}`}
        >
          Your Cart is Empty
        </h2>

        <p className={`mt-3 ${textMuted}`}>
          Looks like you haven't added anything yet.
        </p>

        {/* fd-btn-primary-outline */}
        <Link
          to="/products"
          className="mt-8 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#059669] to-[#84CC16] text-[#063527] hover:-translate-y-px transition-transform duration-150"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1
            className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-4xl font-bold ${textPrimary}`}
          >
            Shopping Cart
          </h1>

          {/* fd-clear-btn */}
          <button
            onClick={clear}
            className="flex items-center gap-2 font-medium text-rose-500 hover:text-rose-700 transition-colors duration-150"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.product._id} className={itemCard}>
                <img
                  src={
                    item.product.images?.[0] || "https://placehold.co/150x150"
                  }
                  alt={item.product.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className={`text-2xl font-semibold ${textPrimary}`}>
                    {item.product.name}
                  </h2>

                  <p className={`mt-2 ${textMuted}`}>
                    Farmer: {item.product.farmer?.name}
                  </p>

                  <p
                    className={`font-['Space_Grotesk',ui-sans-serif,sans-serif] text-xl font-semibold mt-3 ${textAccent}`}
                  >
                    ₹{item.product.price}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateItem(item.product._id, item.quantity - 1)
                      }
                      className={qtyBtn}
                    >
                      <Minus size={16} />
                    </button>

                    <span
                      className={`font-['IBM_Plex_Mono',ui-monospace,monospace] font-semibold text-lg ${textPrimary}`}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateItem(item.product._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.quantity}
                      className={qtyBtn}
                    >
                      <Plus size={16} />
                    </button>

                    {/* fd-remove-btn */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="ml-auto font-medium text-rose-500 hover:text-rose-700 transition-colors duration-150"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary — fd-summary-card ── */}
          <div
            className={[
              "rounded-2xl shadow-lg p-8 h-fit sticky top-24",
              darkMode
                ? "bg-gradient-to-b from-[#065F46]/80 to-[#14532D]/80 backdrop-blur-[16px] border border-[rgba(52,211,153,0.12)] text-[#F4F9F2]"
                : "bg-gradient-to-b from-[#065F46] to-[#14532D] text-[#F4F9F2]",
            ].join(" ")}
          >
            <h2 className="font-['Space_Grotesk',ui-sans-serif,sans-serif] text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {/* fd-summary-row */}
              <div className="flex justify-between text-[rgba(244,249,242,0.75)]">
                <span>Subtotal</span>
                <span className="font-['IBM_Plex_Mono',ui-monospace,monospace]">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between text-[rgba(244,249,242,0.75)]">
                <span>Delivery</span>
                <span className="text-[#A3E635]">FREE</span>
              </div>

              {/* fd-summary-divider */}
              <hr className="border-t border-[rgba(244,249,242,0.18)]" />

              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span className="font-['IBM_Plex_Mono',ui-monospace,monospace]">
                  ₹{subtotal}
                </span>
              </div>
            </div>

            {/* fd-checkout-btn */}
            <Link
              to="/checkout"
              className="block w-full mt-8 py-4 rounded-xl font-semibold text-center flex justify-center items-center gap-2 bg-gradient-to-r from-[#84CC16] to-[#A3E635] text-[#14532D] shadow-[0_10px_22px_-10px_rgba(0,0,0,0.30)] hover:-translate-y-px hover:shadow-[0_14px_26px_-10px_rgba(0,0,0,0.35)] active:translate-y-0 transition-[transform,box-shadow] duration-150"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            {/* fd-continue-link */}
            <Link
              to="/products"
              className="block text-center mt-5 text-[rgba(244,249,242,0.85)] hover:text-white transition-colors duration-150"
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
