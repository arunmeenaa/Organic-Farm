import { ArrowRight, ShoppingBag, Sprout, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Shared design tokens with Navbar/Dashboard: forest green + harvest
// marigold on warm parchment, Fraunces for display type, Inter for body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-hero { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-hero-field {
      background:
        radial-gradient(ellipse 60% 50% at 15% 20%, rgba(231, 168, 60, 0.16), transparent),
        radial-gradient(ellipse 55% 45% at 85% 80%, rgba(30, 53, 39, 0.10), transparent);
    }

    .fd-furrow {
      position: absolute;
      inset: 0;
      opacity: 0.5;
      background-image: repeating-linear-gradient(
        100deg,
        transparent 0px,
        transparent 46px,
        rgba(30, 53, 39, 0.05) 46px,
        rgba(30, 53, 39, 0.05) 48px
      );
      pointer-events: none;
    }

    .fd-eyebrow {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      color: #8A5A16;
    }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; transform: translateY(-1px); }
    .fd-btn-primary:active { transform: translateY(0); }

    .fd-btn-outline {
      border: 2px solid #1E3527;
      color: #1E3527;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-outline:hover { background: rgba(30, 53, 39, 0.06); transform: translateY(-1px); }

    .fd-stat-num {
      color: #1E3527;
    }

    .fd-image-frame {
      background: linear-gradient(160deg, #E7A83C 0%, #1E3527 100%);
      padding: 6px;
      border-radius: 1.5rem;
    }
    .fd-image-inner {
      background: #F6F4EC;
      border-radius: 1.25rem;
      overflow: hidden;
    }

    .fd-float-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      box-shadow: 0 20px 40px -20px rgba(30, 53, 39, 0.35);
      animation: fd-bob 5s ease-in-out infinite;
    }
    .fd-float-card.fd-delay {
      animation-delay: 1.4s;
    }
    @keyframes fd-bob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .fd-float-card { animation: none; }
    }

    .fd-badge-icon {
      background: rgba(231, 168, 60, 0.18);
    }
  `}</style>
);

const Hero = () => {
  return (
    <section className="fd-hero relative overflow-hidden">
      <FontImport />
      <div className="fd-hero-field absolute inset-0" />
      <div className="fd-furrow" />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}

          <div>
            <span className="fd-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider">
              <Sprout size={16} />
              Fresh · Organic · Direct From Farmers
            </span>

            <h1 className="fd-display mt-6 text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: "#1E3527" }}>
              Buy Fresh
              <span className="block italic" style={{ color: "#B5502E" }}>
                Organic Food
              </span>
              Straight From Farmers
            </h1>

            <p className="mt-6 text-lg leading-8 max-w-xl" style={{ color: "#4A5147" }}>
              Discover fresh vegetables, fruits, grains and dairy products
              sourced directly from trusted farmers. No middlemen, fair prices,
              and farm-fresh quality delivered to your doorstep.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="fd-btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 font-semibold shadow-lg"
              >
                <ShoppingBag size={20} />
                Shop Now
              </Link>

              <Link
                to="/register"
                className="fd-btn-outline inline-flex items-center gap-2 rounded-xl px-7 py-4 font-semibold"
              >
                Become a Seller
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-6 pt-8" style={{ borderTop: "1px solid #E7E2D2" }}>
              <div>
                <h2 className="fd-display fd-stat-num text-3xl font-semibold">500+</h2>
                <p className="mt-1 text-sm uppercase tracking-wide" style={{ color: "#8A8578" }}>
                  Farmers
                </p>
              </div>

              <div>
                <h2 className="fd-display fd-stat-num text-3xl font-semibold">1500+</h2>
                <p className="mt-1 text-sm uppercase tracking-wide" style={{ color: "#8A8578" }}>
                  Products
                </p>
              </div>

              <div>
                <h2 className="fd-display fd-stat-num text-3xl font-semibold">20K+</h2>
                <p className="mt-1 text-sm uppercase tracking-wide" style={{ color: "#8A8578" }}>
                  Customers
                </p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="relative flex justify-center">
            {/* Main Image */}

            <div className="fd-image-frame w-full max-w-xl">
              <div className="fd-image-inner">
                <img
                  src="/hero.png"
                  alt="Organic Farming"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Card */}

            <div className="fd-float-card absolute left-0 top-10 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="fd-badge-icon rounded-full p-3 text-lg">🌱</div>

                <div>
                  <h3 className="font-semibold" style={{ color: "#1E3527" }}>
                    100% Organic
                  </h3>
                  <p className="text-sm" style={{ color: "#8A8578" }}>
                    Chemical Free
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Rating */}

            <div className="fd-float-card fd-delay absolute right-0 bottom-16 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Star size={22} fill="#E7A83C" className="text-transparent" style={{ color: "#E7A83C" }} />

                <div>
                  <h3 className="fd-mono font-semibold" style={{ color: "#1E3527" }}>
                    4.9 Rating
                  </h3>
                  <p className="text-sm" style={{ color: "#8A8578" }}>
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