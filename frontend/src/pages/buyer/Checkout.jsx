import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, User, CreditCard, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../services/order.service";
import toast from "react-hot-toast";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-panel { background: #FFFFFF; border: 1px solid #E7E2D2; }

    .fd-label { color: #23281F; }

    .fd-input {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      color: #23281F;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-input:focus {
      outline: none;
      border-color: #1E3527;
      box-shadow: 0 0 0 3px rgba(30, 53, 39, 0.08);
    }
    .fd-input-icon { color: #A6A08E; }

    .fd-payment-option {
      border: 1px solid #E7E2D2;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .fd-payment-option:hover { border-color: #DDD6C4; background: #FBFAF4; }
    .fd-payment-disabled {
      border: 1px solid #E7E2D2;
      opacity: 0.5;
    }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; }

    .fd-summary-divider { border-top: 1px solid #E7E2D2; }

    .fd-delivery-note { color: #8A8578; }
  `}</style>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

      navigate("/order-success", {
        state: {
          order: data.order,
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="fd-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="fd-display text-4xl font-semibold mb-8" style={{ color: "#1E3527" }}>
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Form */}

          <form
            onSubmit={handlePlaceOrder}
            className="fd-panel lg:col-span-2 rounded-2xl shadow-sm p-8 space-y-6"
          >
            <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E3527" }}>
              Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="fd-label font-medium">Full Name</label>

                <div className="relative mt-2">
                  <User className="fd-input-icon absolute left-3 top-3.5" size={18} />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="fd-input w-full rounded-xl py-3 pl-10 pr-4"
                  />
                </div>
              </div>

              <div>
                <label className="fd-label font-medium">Phone</label>

                <div className="relative mt-2">
                  <Phone className="fd-input-icon absolute left-3 top-3.5" size={18} />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="fd-input w-full rounded-xl py-3 pl-10 pr-4"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="fd-label font-medium">Address</label>

              <textarea
                rows={3}
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
                className="fd-input w-full rounded-xl mt-2 p-4 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="fd-label font-medium">City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="fd-input w-full rounded-xl mt-2 p-3"
                />
              </div>

              <div>
                <label className="fd-label font-medium">State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="fd-input w-full rounded-xl mt-2 p-3"
                />
              </div>

              <div>
                <label className="fd-label font-medium">Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="fd-input w-full rounded-xl mt-2 p-3"
                />
              </div>
            </div>

            <div>
              <h2 className="fd-display text-2xl font-semibold mb-4" style={{ color: "#1E3527" }}>
                Payment Method
              </h2>

              <label className="fd-payment-option flex items-center gap-3 rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />

                <Truck style={{ color: "#1E3527" }} />

                <span style={{ color: "#23281F" }}>Cash on Delivery</span>
              </label>

              <label className="fd-payment-disabled flex items-center gap-3 rounded-xl p-4 mt-4 cursor-not-allowed">
                <input type="radio" disabled />

                <CreditCard style={{ color: "#8A8578" }} />

                <span style={{ color: "#8A8578" }}>UPI (Coming Soon)</span>
              </label>
            </div>

            <button
              type="submit"
              className="fd-btn-primary w-full py-4 rounded-xl font-semibold"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}

          <div className="fd-panel rounded-2xl shadow-sm p-6 h-fit sticky top-24">
            <h2 className="fd-display text-2xl font-semibold mb-6" style={{ color: "#1E3527" }}>
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <div>
                    <p className="font-medium" style={{ color: "#23281F" }}>
                      {item.product.name}
                    </p>

                    <p className="text-sm" style={{ color: "#8A8578" }}>
                      {item.quantity} × ₹{item.product.price}
                    </p>
                  </div>

                  <p className="fd-mono font-semibold" style={{ color: "#1E3527" }}>
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <hr className="fd-summary-divider my-6" />

            <div className="space-y-3">
              <div className="flex justify-between" style={{ color: "#4A5147" }}>
                <span>Subtotal</span>
                <span className="fd-mono">₹{subtotal}</span>
              </div>

              <div className="flex justify-between" style={{ color: "#4A5147" }}>
                <span>Delivery</span>
                <span style={{ color: "#2F5233" }}>Free</span>
              </div>

              <div className="flex justify-between text-xl font-semibold" style={{ color: "#1E3527" }}>
                <span>Total</span>
                <span className="fd-mono">₹{subtotal}</span>
              </div>
            </div>

            <div className="fd-delivery-note mt-6 flex items-center gap-2 text-sm">
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