import { Link } from "react-router-dom";
import { Home, ShoppingBag, Leaf } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-green-100 shadow-lg mb-8">
          <Leaf className="text-green-600" size={60} />
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-green-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-600 leading-8 max-w-xl mx-auto">
          The page you're looking for doesn't exist or may have been moved.
          Let's help you get back to exploring fresh organic products.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
          >
            <ShoppingBag size={20} />
            Browse Products
          </Link>

        </div>

        {/* Decorative Section */}
        <div className="mt-16 grid grid-cols-3 gap-6">

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="text-4xl">🥕</div>
            <p className="mt-2 font-medium">Fresh Vegetables</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="text-4xl">🍎</div>
            <p className="mt-2 font-medium">Organic Fruits</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-md">
            <div className="text-4xl">🌾</div>
            <p className="mt-2 font-medium">Natural Grains</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NotFound;