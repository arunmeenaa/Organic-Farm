import { useEffect, useRef, useState } from "react";
import {
  Apple,
  Wheat,
  Leaf,
  Milk,
  Carrot,
  Flower2,
  ArrowUpRight,
} from "lucide-react";

// Colorful / modern variant — matches the gradient-and-glass Hero: mesh
// blobs, gradient text, color-coded glass cards. Space Grotesk for display,
// Inter for body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-cat-section {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      position: relative;
      overflow: hidden;
      /* same stops as Hero's base gradient, so the page reads as one
         continuous surface instead of two different section backgrounds */
      background: linear-gradient(180deg, #eaf7e6 0%, #f4fbef 40%, #eef9f4 100%);
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .fd-cat-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      z-index: 0;
      pointer-events: none;
    }
    /* carries the hero's closing gold glow across the seam, instead of
       cutting to green/sky cold */
    .fd-blob-seam { width: 420px; height: 260px; background: #facc15; opacity: 0.28; top: -140px; left: 25%; }
    .fd-blob1 { width: 300px; height: 300px; background: #a3e635; opacity: 0.32; top: 120px; left: -110px; }
    .fd-blob2 { width: 260px; height: 260px; background: #38bdf8; opacity: 0.28; top: 200px; right: -90px; }
    .fd-blob3 { width: 260px; height: 260px; background: #a78bfa; opacity: 0.18; bottom: -140px; left: 44%; }

    .fd-cat-eyebrow {
      color: #0d7a37;
      letter-spacing: 0.14em;
    }

    .fd-cat-title-grad {
      background: linear-gradient(100deg, #16a34a 10%, #38bdf8 55%, #a78bfa 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    @keyframes fdRise {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fd-cat-card {
      background: #ffffffcc;
      backdrop-filter: blur(10px);
      border: 1px solid #ffffff;
      box-shadow: 0 10px 26px rgba(15, 36, 23, 0.08);
      transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s ease;
      opacity: 0;
      animation: fdRise 0.5s ease forwards;
      position: relative;
      overflow: hidden;
    }
    .fd-cat-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--accent-grad);
      opacity: 0;
      transition: opacity 0.25s ease;
      z-index: 0;
    }
    .fd-cat-card:hover,
    .fd-cat-card:focus-visible {
      transform: translateY(-6px);
      box-shadow: 0 22px 40px -14px var(--accent-shadow);
      border-color: transparent;
    }
    .fd-cat-card:hover::before,
    .fd-cat-card:focus-visible::before { opacity: 1; }
    .fd-cat-card:focus-visible {
      outline: 2px solid var(--accent-solid);
      outline-offset: 3px;
    }
    .fd-cat-card:active { transform: translateY(-3px); }

    .fd-cat-corner {
      z-index: 1;
      color: #ffffff;
      opacity: 0;
      transform: translate(-4px, 4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      position: absolute;
      top: 14px;
      right: 14px;
    }
    .fd-cat-card:hover .fd-cat-corner,
    .fd-cat-card:focus-visible .fd-cat-corner {
      opacity: 1;
      transform: translate(0, 0);
    }

    .fd-cat-icon {
      background: var(--accent-soft);
      color: var(--accent-solid);
      transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease;
      position: relative;
      z-index: 1;
    }
    .fd-cat-card:hover .fd-cat-icon,
    .fd-cat-card:focus-visible .fd-cat-icon {
      background: rgba(255,255,255,0.24);
      color: #ffffff;
      transform: scale(1.08) rotate(-4deg);
    }

    .fd-cat-title {
      color: #0f2417;
      transition: color 0.22s ease;
      position: relative;
      z-index: 1;
    }
    .fd-cat-card:hover .fd-cat-title,
    .fd-cat-card:focus-visible .fd-cat-title { color: #ffffff; }

    .fd-cat-count {
      color: var(--accent-solid);
      background: var(--accent-soft);
      transition: color 0.22s ease, background 0.22s ease;
      position: relative;
      z-index: 1;
    }
    .fd-cat-card:hover .fd-cat-count,
    .fd-cat-card:focus-visible .fd-cat-count {
      color: #ffffff;
      background: rgba(255,255,255,0.22);
    }

    .fd-cat-viewall {
      color: #0f2417;
      background: #ffffffcc;
      border: 1px solid #ffffff;
      box-shadow: 0 6px 18px rgba(15, 36, 23, 0.08);
      transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease;
    }
    .fd-cat-viewall:hover {
      background: #ffffff;
      box-shadow: 0 10px 22px rgba(15, 36, 23, 0.12);
      gap: 10px;
    }

    @media (prefers-reduced-motion: reduce) {
      .fd-cat-card { animation: none; opacity: 1; }
      .fd-cat-card, .fd-cat-icon, .fd-cat-corner, .fd-cat-title, .fd-cat-count {
        transition: none;
      }
    }
  `}</style>
);

const categories = [
  {
    title: "Vegetables",
    icon: <Carrot size={32} />,
    count: 120,
    solid: "#16a34a",
    soft: "rgba(22,163,74,0.12)",
    grad: "linear-gradient(135deg, #22c55e, #15803d)",
    shadow: "rgba(22,163,74,0.35)",
  },
  {
    title: "Fruits",
    icon: <Apple size={32} />,
    count: 80,
    solid: "#f97316",
    soft: "rgba(249,115,22,0.12)",
    grad: "linear-gradient(135deg, #fb923c, #ea580c)",
    shadow: "rgba(249,115,22,0.35)",
  },
  {
    title: "Grains",
    icon: <Wheat size={32} />,
    count: 65,
    solid: "#d97706",
    soft: "rgba(217,119,6,0.14)",
    grad: "linear-gradient(135deg, #facc15, #d97706)",
    shadow: "rgba(217,119,6,0.35)",
  },
  {
    title: "Dairy",
    icon: <Milk size={32} />,
    count: 30,
    solid: "#0284c7",
    soft: "rgba(2,132,199,0.12)",
    grad: "linear-gradient(135deg, #38bdf8, #0369a1)",
    shadow: "rgba(2,132,199,0.35)",
  },
  {
    title: "Herbs",
    icon: <Leaf size={32} />,
    count: 40,
    solid: "#0d9488",
    soft: "rgba(13,148,136,0.12)",
    grad: "linear-gradient(135deg, #2dd4bf, #0f766e)",
    shadow: "rgba(13,148,136,0.35)",
  },
  {
    title: "Flowers",
    icon: <Flower2 size={32} />,
    count: 20,
    solid: "#8b5cf6",
    soft: "rgba(139,92,246,0.12)",
    grad: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    shadow: "rgba(139,92,246,0.35)",
  },
];

const Categories = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="fd-cat-section py-20">
      <FontImport />
      <div className="fd-cat-blob fd-blob-seam" />
      <div className="fd-cat-blob fd-blob1" />
      <div className="fd-cat-blob fd-blob2" />
      <div className="fd-cat-blob fd-blob3" />

      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-14">
          <p className="fd-mono fd-cat-eyebrow text-xs font-semibold uppercase mb-4">
            Shop by category
          </p>
          <h2 className="fd-display text-4xl font-bold">
            Browse <span className="fd-cat-title-grad">categories</span>
          </h2>
          <p className="mt-3" style={{ color: "#3d5a45" }}>
            Fresh products from trusted farmers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((item, i) => (
            <div
              key={item.title}
              role="button"
              tabIndex={0}
              aria-label={`Browse ${item.title}, ${item.count}+ products`}
              className="fd-cat-card rounded-3xl p-8 text-center cursor-pointer"
              style={{
                "--accent-solid": item.solid,
                "--accent-soft": item.soft,
                "--accent-grad": item.grad,
                "--accent-shadow": item.shadow,
                ...(inView
                  ? { animationDelay: `${i * 70}ms` }
                  : { animationPlayState: "paused", opacity: 0 }),
              }}
            >
              <ArrowUpRight className="fd-cat-corner" size={18} />

              <div className="fd-cat-icon flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-5">
                {item.icon}
              </div>

              <h3 className="fd-cat-title font-semibold text-lg">
                {item.title}
              </h3>

              <span className="fd-cat-count fd-mono text-xs mt-3 inline-block px-2.5 py-1 rounded-full font-medium">
                {item.count}+ products
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="fd-cat-viewall fd-mono inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full">
            View all categories
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;