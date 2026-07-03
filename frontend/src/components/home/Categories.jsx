import {
  Apple,
  Wheat,
  Leaf,
  Milk,
  Carrot,
  Flower2,
} from "lucide-react";

// Shared design tokens with Hero/Navbar/Dashboard: forest green + harvest
// marigold on warm parchment, Fraunces for display type, Inter for body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-cat-section { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #FFFFFF; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-cat-rule {
      background: #E7A83C;
    }

    .fd-cat-card {
      background: #F6F4EC;
      border: 1px solid #E7E2D2;
      transition: background 0.22s ease, border-color 0.22s ease,
        transform 0.18s ease, box-shadow 0.18s ease;
    }
    .fd-cat-card:hover {
      background: #1E3527;
      border-color: #1E3527;
      transform: translateY(-4px);
      box-shadow: 0 20px 32px -18px rgba(30, 53, 39, 0.45);
    }

    .fd-cat-icon {
      background: rgba(231, 168, 60, 0.16);
      color: #1E3527;
      transition: background 0.22s ease, color 0.22s ease;
    }
    .fd-cat-card:hover .fd-cat-icon {
      background: rgba(231, 168, 60, 0.24);
      color: #E7A83C;
    }

    .fd-cat-title {
      color: #1E3527;
      transition: color 0.22s ease;
    }
    .fd-cat-card:hover .fd-cat-title { color: #F6F4EC; }

    .fd-cat-count {
      color: #8A8578;
      transition: color 0.22s ease;
    }
    .fd-cat-card:hover .fd-cat-count { color: rgba(246, 244, 236, 0.75); }
  `}</style>
);

const categories = [
  {
    title: "Vegetables",
    icon: <Carrot size={32} />,
    products: "120+ Products",
  },
  {
    title: "Fruits",
    icon: <Apple size={32} />,
    products: "80+ Products",
  },
  {
    title: "Grains",
    icon: <Wheat size={32} />,
    products: "65+ Products",
  },
  {
    title: "Dairy",
    icon: <Milk size={32} />,
    products: "30+ Products",
  },
  {
    title: "Herbs",
    icon: <Leaf size={32} />,
    products: "40+ Products",
  },
  {
    title: "Flowers",
    icon: <Flower2 size={32} />,
    products: "20+ Products",
  },
];

const Categories = () => {
  return (
    <section className="fd-cat-section py-20">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="fd-cat-rule w-12 h-1 rounded-full mx-auto mb-5" />
          <h2 className="fd-display text-4xl font-semibold" style={{ color: "#1E3527" }}>
            Browse Categories
          </h2>
          <p className="mt-3" style={{ color: "#8A8578" }}>
            Fresh products from trusted farmers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className="fd-cat-card rounded-3xl p-8 text-center cursor-pointer"
            >
              <div className="fd-cat-icon flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-5">
                {item.icon}
              </div>

              <h3 className="fd-cat-title font-semibold text-lg">
                {item.title}
              </h3>

              <p className="fd-cat-count fd-mono text-sm mt-2">
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