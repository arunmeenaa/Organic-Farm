import { ArrowRight, ShoppingBag, Sprout, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100">

      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-green-300/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <Sprout size={16} />
              Fresh • Organic • Direct From Farmers
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">

              Buy Fresh
              <span className="block text-green-600">
                Organic Food
              </span>

              Straight From Farmers

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">

              Discover fresh vegetables, fruits, grains and dairy products
              sourced directly from trusted farmers. No middlemen, fair prices,
              and farm-fresh quality delivered to your doorstep.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-4 text-white font-semibold shadow-lg transition hover:bg-green-700"
              >
                <ShoppingBag size={20} />
                Shop Now
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-green-600 px-7 py-4 font-semibold text-green-700 transition hover:bg-green-50"
              >
                Become a Seller
                <ArrowRight size={18} />
              </Link>

            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-6">

              <div>
                <h2 className="text-3xl font-bold text-green-700">
                  500+
                </h2>

                <p className="mt-1 text-gray-600">
                  Farmers
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-700">
                  1500+
                </h2>

                <p className="mt-1 text-gray-600">
                  Products
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-green-700">
                  20K+
                </h2>

                <p className="mt-1 text-gray-600">
                  Customers
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="relative flex justify-center">

            {/* Main Image */}

            <img
              src="/hero.png"
              alt="Organic Farming"
              className="w-full max-w-xl drop-shadow-2xl"
            />

            {/* Floating Card */}

            <div className="absolute left-0 top-10 rounded-2xl bg-white p-5 shadow-xl">

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-green-100 p-3">
                  🌱
                </div>

                <div>

                  <h3 className="font-bold">
                    100% Organic
                  </h3>

                  <p className="text-sm text-gray-500">
                    Chemical Free
                  </p>

                </div>

              </div>

            </div>

            {/* Floating Rating */}

            <div className="absolute right-0 bottom-16 rounded-2xl bg-white p-5 shadow-xl">

              <div className="flex items-center gap-3">

                <Star
                  size={22}
                  fill="#facc15"
                  className="text-yellow-400"
                />

                <div>

                  <h3 className="font-bold">
                    4.9 Rating
                  </h3>

                  <p className="text-sm text-gray-500">
                    Trusted by Buyers
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;