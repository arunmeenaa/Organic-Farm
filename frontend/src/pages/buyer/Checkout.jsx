import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, User, CreditCard, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { placeOrder } from "../../services/order.service";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await placeOrder({
        deliveryAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine: formData.addressLine,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
      });

      console.log(data);
      toast.success("Order placed successfully");
      navigate("/order-success", { state: { order: data.order } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  /* ── Shared tokens ── */
  const textPrimary = darkMode ? "text-[#D1FAE5]" : "text-[#1E3527]";
  const textSecondary = darkMode
    ? "text-[rgba(167,243,208,0.80)]"
    : "text-[#23281F]";
  const textMuted = darkMode
    ? "text-[rgba(167,243,208,0.50)]"
    : "text-[#8A8578]";
  const textSub = darkMode ? "text-[rgba(167,243,208,0.65)]" : "text-[#4A5147]";

  // fd-panel
  const panelCls = darkMode
    ? "bg-white/[0.05] backdrop-blur-[16px] border border-[rgba(52,211,153,0.10)]"
    : "bg-white border border-[#E7E2D2]";

  // fd-input
  const inputCls = [
    "w-full rounded-xl transition-[border-color,box-shadow] duration-150 outline-none",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] placeholder:text-[rgba(167,243,208,0.30)] focus:border-emerald-400 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.12)]"
      : "bg-white border border-[#E7E2D2] text-[#23281F] focus:border-[#1E3527] focus:shadow-[0_0_0_3px_rgba(30,53,39,0.08)]",
  ].join(" ");

  // fd-input-icon
  const iconCls = darkMode ? "text-[rgba(52,211,153,0.40)]" : "text-[#A6A08E]";

  // fd-label
  const labelCls = `font-medium ${darkMode ? "text-[#D1FAE5]" : "text-[#23281F]"}`;

  // fd-payment-option
  const paymentOption = [
    "flex items-center gap-3 rounded-xl p-4 cursor-pointer border transition-[border-color,background] duration-150",
    darkMode
      ? "border-[rgba(52,211,153,0.15)] hover:border-[rgba(52,211,153,0.30)] hover:bg-white/[0.04]"
      : "border-[#E7E2D2] hover:border-[#DDD6C4] hover:bg-[#FBFAF4]",
  ].join(" ");

  // fd-payment-disabled
  const paymentDisabled = [
    "flex items-center gap-3 rounded-xl p-4 mt-4 cursor-not-allowed border opacity-50",
    darkMode ? "border-[rgba(52,211,153,0.10)]" : "border-[#E7E2D2]",
  ].join(" ");

  // fd-btn-primary
  const btnPrimary = darkMode
    ? "bg-emerald-700 hover:bg-emerald-600 text-white transition-colors duration-150"
    : "bg-[#1E3527] hover:bg-[#2F5233] text-[#F6F4EC] transition-colors duration-150";

  return (
    <div className="fd-root min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1
          className={`font-['Fraunces',Georgia,serif] text-4xl font-semibold mb-8 ${textPrimary}`}
        >
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Delivery Form ── */}
          <form
            onSubmit={handlePlaceOrder}
            className={`${panelCls} lg:col-span-2 rounded-2xl shadow-sm p-8 space-y-6`}
          >
            <h2
              className={`font-['Fraunces',Georgia,serif] text-2xl font-semibold ${textPrimary}`}
            >
              Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Full Name</label>
                <div className="relative mt-2">
                  <User
                    className={`absolute left-3 top-3.5 ${iconCls}`}
                    size={18}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`${inputCls} py-3 pl-10 pr-4`}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Phone</label>
                <div className="relative mt-2">
                  <Phone
                    className={`absolute left-3 top-3.5 ${iconCls}`}
                    size={18}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`${inputCls} py-3 pl-10 pr-4`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Address</label>
              <textarea
                rows={3}
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
                className={`${inputCls} mt-2 p-4 resize-none`}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className={labelCls}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={`${inputCls} mt-2 p-3`}
                />
              </div>

              <div>
                <label className={labelCls}>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={`${inputCls} mt-2 p-3`}
                />
              </div>

              <div>
                <label className={labelCls}>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className={`${inputCls} mt-2 p-3`}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2
                className={`font-['Fraunces',Georgia,serif] text-2xl font-semibold mb-4 ${textPrimary}`}
              >
                Payment Method
              </h2>

              <label className={paymentOption}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                <Truck className={textPrimary} size={18} />
                <span className={textSecondary}>Cash on Delivery</span>
              </label>

              <label className={paymentDisabled}>
                <input type="radio" disabled />
                <CreditCard className={textMuted} size={18} />
                <span className={textMuted}>UPI (Coming Soon)</span>
              </label>
            </div>

            <button
              type="submit"
              className={`${btnPrimary} w-full py-4 rounded-xl font-semibold`}
            >
              Place Order
            </button>
          </form>

          {/* ── Order Summary ── */}
          <div
            className={`${panelCls} rounded-2xl shadow-sm p-6 h-fit sticky top-24`}
          >
            <h2
              className={`font-['Fraunces',Georgia,serif] text-2xl font-semibold mb-6 ${textPrimary}`}
            >
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <div>
                    <p className={`font-medium ${textSecondary}`}>
                      {item.product.name}
                    </p>
                    <p className={`text-sm ${textMuted}`}>
                      {item.quantity} × ₹{item.product.price}
                    </p>
                  </div>
                  <p
                    className={`font-['IBM_Plex_Mono',ui-monospace,monospace] font-semibold ${textPrimary}`}
                  >
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* fd-summary-divider */}
            <hr
              className={`my-6 border-t ${darkMode ? "border-[rgba(52,211,153,0.12)]" : "border-[#E7E2D2]"}`}
            />

            <div className="space-y-3">
              <div className={`flex justify-between ${textSub}`}>
                <span>Subtotal</span>
                <span className="font-['IBM_Plex_Mono',ui-monospace,monospace]">
                  ₹{subtotal}
                </span>
              </div>

              <div className={`flex justify-between ${textSub}`}>
                <span>Delivery</span>
                <span
                  className={darkMode ? "text-emerald-400" : "text-[#2F5233]"}
                >
                  Free
                </span>
              </div>

              <div
                className={`flex justify-between text-xl font-semibold ${textPrimary}`}
              >
                <span>Total</span>
                <span className="font-['IBM_Plex_Mono',ui-monospace,monospace]">
                  ₹{subtotal}
                </span>
              </div>
            </div>

            {/* fd-delivery-note */}
            <div
              className={`mt-6 flex items-center gap-2 text-sm ${textMuted}`}
            >
              <MapPin size={18} />
              Delivering to your provided address
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
