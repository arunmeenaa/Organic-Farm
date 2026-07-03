import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";

import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, subtotal, loading, updateItem, removeItem, clear } = useCart();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">Loading cart...</div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <ShoppingCart size={90} className="text-gray-300" />

        <h2 className="text-4xl font-bold mt-6">Your Cart is Empty</h2>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>

          <button
            onClick={clear}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
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
                className="bg-white rounded-2xl shadow p-5 flex gap-5"
              >
                <img
                  src={
                    item.product.images?.[0] || "https://placehold.co/150x150"
                  }
                  alt={item.product.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Farmer: {item.product.farmer?.name}
                  </p>

                  <p className="text-green-700 text-xl font-bold mt-3">
                    ₹{item.product.price}
                  </p>

                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateItem(item.product._id, item.quantity - 1)
                      }
                      className="border rounded-full p-2"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateItem(item.product._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.quantity}
                      className="border rounded-full p-2 disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </button>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="ml-auto text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-semibold">
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <Link
              to="/products"
              className="block text-center mt-5 text-green-700"
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
