import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const location = useLocation();

  const order = location.state?.order;
  useEffect(() => {
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);
  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-lg p-10 text-center"
      >
        <motion.div
          initial={{
            scale: 0,
            rotate: -180,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 180,
          }}
        >
          <CheckCircle2 size={90} className="mx-auto text-green-600 mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium mb-6"
        >
          Order Placed Succesfully
        </motion.div>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with Organic Farm.
        </p>

        <div className="mt-8 bg-green-50 rounded-2xl p-6 text-left">
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Order Number</span>
            <span className="font-semibold">{order.orderNumber}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold">₹{order.totalPrice}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold">{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">Status</span>
            <span className="capitalize text-green-600 font-semibold">
              {order.orderStatus}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mt-6">
          <p className="text-blue-700 font-medium">Estimated Delivery</p>

          <p className="text-gray-600 mt-1">3 - 5 Business Days</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link
            to={`/orders/${order._id}`}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Package size={20} />
            Track Order
          </Link>

          <Link
            to="/products"
            className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
