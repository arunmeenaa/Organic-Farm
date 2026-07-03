import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

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

    // TODO:
    // await placeOrder({
    //   deliveryAddress: {
    //     fullName: formData.fullName,
    //     phone: formData.phone,
    //     addressLine: formData.addressLine,
    //     city: formData.city,
    //     state: formData.state,
    //     pincode: formData.pincode,
    //   },
    //   paymentMethod: formData.paymentMethod,
    // });

    console.log(formData);

    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Delivery Form */}

          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-2 bg-white rounded-2xl shadow p-8 space-y-6"
          >
            <h2 className="text-2xl font-semibold">
              Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="font-medium">
                  Full Name
                </label>

                <div className="relative mt-2">
                  <User
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium">
                  Phone
                </label>

                <div className="relative mt-2">
                  <Phone
                    className="absolute left-3 top-3.5 text-gray-400"
                    size={18}
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

            </div>

            <div>
              <label className="font-medium">
                Address
              </label>

              <textarea
                rows={3}
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
                className="w-full border rounded-xl mt-2 p-4 outline-none resize-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div>
                <label className="font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl mt-2 p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl mt-2 p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl mt-2 p-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

            </div>

            <div>

              <h2 className="text-2xl font-semibold mb-4">
                Payment Method
              </h2>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />

                <Truck className="text-green-600" />

                <span>Cash on Delivery</span>

              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 mt-4 opacity-50 cursor-not-allowed">

                <input
                  type="radio"
                  disabled
                />

                <CreditCard className="text-gray-500" />

                <span>UPI (Coming Soon)</span>

              </label>

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
            >
              Place Order
            </button>

          </form>

          {/* Order Summary */}

          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">

            <h2 className="text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.quantity} × ₹{item.product.price}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}

            </div>

            <hr className="my-6" />

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
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