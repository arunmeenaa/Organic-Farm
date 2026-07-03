import {
  Leaf,
  Bot,
  CloudSun,
  ShoppingBasket,
  Tractor,
  Users,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: <ShoppingBasket size={32} />,
    title: "Farmer Marketplace",
    description:
      "Farmers can list and sell fresh organic crops directly to buyers without middlemen.",
  },
  {
    icon: <Bot size={32} />,
    title: "AI Farming Assistant",
    description:
      "Get instant answers for crop management, fertilizers, diseases, irrigation and organic farming practices.",
  },
  {
    icon: <CloudSun size={32} />,
    title: "Weather Updates",
    description:
      "Real-time weather forecasts help farmers make better decisions for planting and harvesting.",
  },
  {
    icon: <Tractor size={32} />,
    title: "Organic Farming",
    description:
      "Encourages sustainable farming by promoting chemical-free and eco-friendly agricultural methods.",
  },
];

const techStack = [
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "ImageKit",
  "JWT Authentication",
  "OpenWeather API",
  "Gemini AI",
  "Tailwind CSS",
];

const About = () => {
  return (
    <div className="bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <Leaf className="mx-auto mb-6" size={70} />

          <h1 className="text-5xl font-bold">
            About Organic Farm
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-green-100">
            Organic Farm is an AI-powered agriculture platform that connects
            farmers and buyers in one digital marketplace. Our goal is to make
            farming smarter, more profitable, and more sustainable through
            modern technology.
          </p>

        </div>
      </section>

      {/* Mission */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              We aim to empower farmers by providing direct access to customers,
              reducing dependency on middlemen, increasing profitability, and
              promoting sustainable organic farming practices. Through AI and
              real-time weather insights, we help farmers make informed
              decisions and improve crop productivity.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex gap-3">
                <CheckCircle className="text-green-600 mt-1" />
                <p>Fair pricing for farmers</p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-600 mt-1" />
                <p>Fresh organic products for buyers</p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-600 mt-1" />
                <p>AI-powered farming guidance</p>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="text-green-600 mt-1" />
                <p>Sustainable agriculture practices</p>
              </div>

            </div>
          </div>

          <div className="bg-green-100 rounded-3xl p-12 text-center">

            <Users
              size={100}
              className="mx-auto text-green-700"
            />

            <h3 className="text-3xl font-bold mt-6">
              Connecting Farmers & Buyers
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              A transparent marketplace where buyers purchase directly from
              farmers while receiving fresh, healthy, and organic products.
            </p>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-green-600 mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Tech Stack */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Technology Stack
          </h2>

          <p className="text-gray-600 mb-10">
            Built using modern web technologies for performance, security and
            scalability.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            {techStack.map((tech) => (
              <span
                key={tech}
                className="bg-green-100 text-green-700 px-5 py-3 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="bg-green-700 text-white py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Why Choose Organic Farm?
          </h2>

          <p className="text-lg leading-8 text-green-100">
            We combine agriculture with artificial intelligence to create a
            platform that benefits both farmers and buyers. Farmers gain better
            market access and useful insights, while buyers receive fresh,
            high-quality organic products directly from trusted sources.
          </p>

        </div>

      </section>
    </div>
  );
};

export default About;