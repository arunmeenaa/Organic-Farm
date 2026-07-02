import { ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Tomato",
    price: 40,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Fresh Carrot",
    price: 55,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Green Cabbage",
    price: 35,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1615485291234-9fbc65025f89?w=600",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Fresh Corn",
    price: 25,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600",
    rating: 4.8,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>
            <h2 className="text-4xl font-bold">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-2">
              Hand-picked fresh products
            </p>
          </div>

          <button className="text-green-600 font-semibold">
            View All →
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:-translate-y-2 transition duration-300"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between items-center">

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    {item.rating}
                  </div>

                </div>

                <p className="mt-4 text-2xl font-bold text-green-700">
                  ₹{item.price}
                  <span className="text-gray-500 text-base">
                    /{item.unit}
                  </span>
                </p>

                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturedProducts;