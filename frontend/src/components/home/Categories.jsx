import {
  Apple,
  Wheat,
  Leaf,
  Milk,
  Carrot,
  Flower2,
} from "lucide-react";

const categories = [
  {
    title: "Vegetables",
    icon: <Carrot size={36} />,
    products: "120+ Products",
  },
  {
    title: "Fruits",
    icon: <Apple size={36} />,
    products: "80+ Products",
  },
  {
    title: "Grains",
    icon: <Wheat size={36} />,
    products: "65+ Products",
  },
  {
    title: "Dairy",
    icon: <Milk size={36} />,
    products: "30+ Products",
  },
  {
    title: "Herbs",
    icon: <Leaf size={36} />,
    products: "40+ Products",
  },
  {
    title: "Flowers",
    icon: <Flower2 size={36} />,
    products: "20+ Products",
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Browse Categories
          </h2>

          <p className="text-gray-500 mt-3">
            Fresh products from trusted farmers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((item) => (
            <div
              key={item.title}
              className="bg-green-50 rounded-3xl p-8 text-center hover:bg-green-600 hover:text-white transition duration-300 cursor-pointer shadow-sm hover:shadow-xl"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-sm mt-2 opacity-80">
                {item.products}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;