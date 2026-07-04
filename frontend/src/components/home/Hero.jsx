import { ArrowRight, ShoppingBag, Sprout, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Same glassmorphic approach, but swapped to an all-green gradient system
// (emerald → lime, amber accent) that reads as "organic farm" rather than tech/SaaS.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-hero {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 15% 20%, rgba(5, 150, 105, 0.16), transparent),
        radial-gradient(ellipse 55% 45% at 85% 80%, rgba(132, 204, 22, 0.16), transparent),
        radial-gradient(ellipse 45% 35% at 60% 10%, rgba(245, 158, 11, 0.10), transparent),
        #F4F9F2;
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .fd-eyebrow {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      color: #15803D;
    }

    .fd-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 14px 30px -12px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 36px -12px rgba(5, 150, 105, 0.55); }
    .fd-btn-primary:active { transform: translateY(0); }

    .fd-btn-outline {
      border: 2px solid #059669;
      color: #065F46;
      background: rgba(255, 255, 255, 0.5);
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-outline:hover { background: rgba(5, 150, 105, 0.08); transform: translateY(-1px); }

    .fd-stat-num { color: #0F2E22; }

    .fd-image-frame {
      background: linear-gradient(160deg, #059669 0%, #84CC16 100%);
      padding: 6px;
      border-radius: 1.5rem;
    }
    .fd-image-inner {
      background: #F4F9F2;
      border-radius: 1.25rem;
      overflow: hidden;
    }

    .fd-float-card {
      background: rgba(255, 255, 255, 0.78);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 20px 40px -20px rgba(6, 95, 70, 0.35);
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
      background: rgba(132, 204, 22, 0.2);
    }
  `}</style>
);

const Hero = () => {
  return (
    <section className="fd-hero relative overflow-hidden">
      <FontImport />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}

          <div>
            <span className="fd-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider">
              <Sprout size={16} />
              Fresh · Organic · Direct From Farmers
            </span>

            <h1 className="fd-display mt-6 text-5xl md:text-6xl font-bold leading-[1.05]" style={{ color: "#0F2E22" }}>
              Buy Fresh
              <span className="fd-title-gradient block">
                Organic Food
              </span>
              Straight From Farmers
            </h1>

            <p className="mt-6 text-lg leading-8 max-w-xl" style={{ color: "#4B6357" }}>
              Discover fresh vegetables, fruits, grains and dairy products
              sourced directly from trusted farmers. No middlemen, fair prices,
              and farm-fresh quality delivered to your doorstep.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="fd-btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 font-semibold"
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

            <div className="mt-14 grid grid-cols-3 gap-6 pt-8" style={{ borderTop: "1px solid rgba(5, 150, 105, 0.18)" }}>
              <div>
                <h2 className="fd-display fd-stat-num text-3xl font-bold">500+</h2>
                <p className="mt-1 text-sm uppercase tracking-wide" style={{ color: "#7A8D82" }}>
                  Farmers
                </p>
              </div>

              <div>
                <h2 className="fd-display fd-stat-num text-3xl font-bold">1500+</h2>
                <p className="mt-1 text-sm uppercase tracking-wide" style={{ color: "#7A8D82" }}>
                  Products
                </p>
              </div>

              <div>
                <h2 className="fd-display fd-stat-num text-3xl font-bold">20K+</h2>
                <p className="mt-1 text-sm uppercase tracking-wide" style={{ color: "#7A8D82" }}>
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
                  <h3 className="font-semibold" style={{ color: "#0F2E22" }}>
                    100% Organic
                  </h3>
                  <p className="text-sm" style={{ color: "#7A8D82" }}>
                    Chemical Free
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Rating */}

            <div className="fd-float-card fd-delay absolute right-0 bottom-16 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Star size={22} fill="#F59E0B" className="text-transparent" style={{ color: "#F59E0B" }} />

                <div>
                  <h3 className="fd-mono font-semibold" style={{ color: "#0F2E22" }}>
                    4.9 Rating
                  </h3>
                  <p className="text-sm" style={{ color: "#7A8D82" }}>
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