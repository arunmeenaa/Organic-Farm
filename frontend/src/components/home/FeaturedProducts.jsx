import React, { useRef, useState, useEffect } from "react";
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Colorful / modern variant — continues the Hero → Categories color story.
// Space Grotesk for display, Inter for body, per-product accent colors,
// glass cards, gradient CTA.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-fp-section {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, #eef9f4 0%, #f7f5fb 40%, #fef8f2 100%);
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .fd-fp-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      z-index: 0;
      pointer-events: none;
    }
    .fd-fp-blob-seam { width: 380px; height: 240px; background: #a78bfa; opacity: 0.18; top: -120px; left: 40%; }
    .fd-fp-blob1 { width: 280px; height: 280px; background: #fb7185; opacity: 0.16; top: 60px; right: -100px; }
    .fd-fp-blob2 { width: 260px; height: 260px; background: #facc15; opacity: 0.16; bottom: -100px; left: -80px; }

    .fd-fp-eyebrow { color: #0d7a37; letter-spacing: 0.14em; }
    .fd-fp-title-grad {
      background: linear-gradient(100deg, #16a34a 10%, #38bdf8 55%, #a78bfa 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .fd-fp-viewall {
      color: #0f2417;
      background: #ffffffcc;
      border: 1px solid #ffffff;
      box-shadow: 0 6px 18px rgba(15, 36, 23, 0.08);
      transition: background 0.2s ease, gap 0.2s ease, box-shadow 0.2s ease;
    }
    .fd-fp-viewall:hover {
      background: #ffffff;
      box-shadow: 0 10px 22px rgba(15, 36, 23, 0.12);
      gap: 10px;
    }

    .fd-fp-card {
      background: #ffffffcc;
      backdrop-filter: blur(10px);
      border: 1px solid #ffffff;
      box-shadow: 0 10px 26px rgba(15, 36, 23, 0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      position: relative;
      z-index: 1;
      height: 100%;
    }
    .fd-fp-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 40px -16px var(--accent-shadow);
    }

    .fd-fp-media { position: relative; overflow: hidden; }
    .fd-fp-media img {
      transition: transform 0.4s ease;
    }
    .fd-fp-card:hover .fd-fp-media img { transform: scale(1.06); }

    .fd-fp-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      background: var(--accent-grad);
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.02em;
      padding: 5px 12px;
      border-radius: 999px;
    }

    .fd-fp-rating {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(250, 204, 21, 0.16);
      color: #a16207;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
    }

    .fd-fp-price { color: var(--accent-solid); }

    .fd-fp-cta {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      color: #ffffff;
      background: var(--accent-grad);
      border: none;
      box-shadow: 0 8px 20px -6px var(--accent-shadow);
      transition: transform 0.15s ease, box-shadow 0.2s ease;
    }
    .fd-fp-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -6px var(--accent-shadow); }
    .fd-fp-cta:active { transform: translateY(0); }

    /* Hide Scrollbar for Carousel */
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Carousel Navigation Buttons */
    .nav-btn {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      color: #0f2417;
      transition: all 0.2s ease;
      z-index: 10;
    }
    .nav-btn:hover {
      background: #f8fafc;
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
      transform: scale(1.05);
    }
  `}</style>
);

// Expanded product list for a better sliding experience
const products = [
  {
    id: 1,
    name: "Organic tomato",
    price: 40,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
    rating: 4.8,
    tag: "Fresh pick",
    solid: "#dc2626",
    grad: "linear-gradient(135deg, #f87171, #dc2626)",
    shadow: "rgba(220,38,38,0.35)",
  },
  {
    id: 2,
    name: "Fresh carrot",
    price: 55,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600",
    rating: 4.7,
    tag: "Farm direct",
    solid: "#ea580c",
    grad: "linear-gradient(135deg, #fb923c, #ea580c)",
    shadow: "rgba(234,88,12,0.35)",
  },
  {
    id: 3,
    name: "Green cabbage",
    price: 35,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1615485291234-9fbc65025f89?w=600",
    rating: 4.9,
    tag: "Best seller",
    solid: "#15803d",
    grad: "linear-gradient(135deg, #4ade80, #15803d)",
    shadow: "rgba(21,128,61,0.35)",
  },
  {
    id: 4,
    name: "Fresh corn",
    price: 25,
    unit: "piece",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600",
    rating: 4.8,
    tag: "In season",
    solid: "#d97706",
    grad: "linear-gradient(135deg, #facc15, #d97706)",
    shadow: "rgba(217,119,6,0.35)",
  },
  {
    id: 5,
    name: "Red Onion",
    price: 30,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600",
    rating: 4.6,
    tag: "Organic",
    solid: "#9333ea",
    grad: "linear-gradient(135deg, #a855f7, #9333ea)",
    shadow: "rgba(147,51,234,0.35)",
  },
  {
    id: 6,
    name: "Fresh Broccoli",
    price: 60,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600",
    rating: 4.9,
    tag: "Premium",
    solid: "#059669",
    grad: "linear-gradient(135deg, #34d399, #059669)",
    shadow: "rgba(5,150,105,0.35)",
  },
];

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    let interval;
    if (!isHovered && scrollRef.current) {
      interval = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // If we reached the end, loop back to the start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by the width of one card + the gap (32px)
          const cardWidth = scrollRef.current.children[0]?.offsetWidth || 300;
          scrollRef.current.scrollBy({ left: cardWidth + 32, behavior: "smooth" });
        }
      }, 3000); // Slides every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  // Manual navigation handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.offsetWidth || 300;
      scrollRef.current.scrollBy({ left: -(cardWidth + 32), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.offsetWidth || 300;
      scrollRef.current.scrollBy({ left: cardWidth + 32, behavior: "smooth" });
    }
  };

  return (
    <section 
      className="fd-fp-section py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FontImport />
      <div className="fd-fp-blob fd-fp-blob-seam" />
      <div className="fd-fp-blob fd-fp-blob1" />
      <div className="fd-fp-blob fd-fp-blob2" />

      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="fd-mono fd-fp-eyebrow text-xs font-semibold uppercase mb-3">
              Fresh this week
            </p>
            <h2 className="fd-display text-4xl font-bold">
              Featured <span className="fd-fp-title-grad">products</span>
            </h2>
            <p className="mt-2" style={{ color: "#3d5a45" }}>
              Hand-picked fresh products from verified organic farms
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Custom Navigation Arrows */}
            <div className="flex items-center gap-2 mr-4">
              <button onClick={scrollLeft} className="nav-btn" aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={scrollRight} className="nav-btn" aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <button className="fd-fp-viewall fd-mono inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full hidden sm:inline-flex">
              View all
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 pb-8 pt-4 -mt-4 px-2 -mx-2"
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="fd-fp-card rounded-3xl overflow-hidden snap-start flex-shrink-0"
              style={{
                // Responsive widths using calc to account for gaps
                width: "calc(100vw - 3rem)",
                maxWidth: "320px", 
                "--accent-solid": item.solid,
                "--accent-grad": item.grad,
                "--accent-shadow": item.shadow,
              }}
            >
              <div className="fd-fp-media">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />
                <span className="fd-fp-tag">{item.tag}</span>
              </div>

              <div className="p-6 flex flex-col justify-between h-[calc(100%-14rem)]">
                <div>
                  <div className="flex justify-between items-center gap-3">
                    <h3
                      className="fd-display font-semibold text-lg truncate"
                      style={{ color: "#0f2417" }}
                    >
                      {item.name}
                    </h3>

                    <div className="fd-fp-rating flex-shrink-0">
                      <Star size={13} fill="currentColor" />
                      {item.rating}
                    </div>
                  </div>

                  <p className="mt-4 text-2xl font-bold">
                    <span className="fd-fp-price">₹{item.price}</span>
                    <span
                      className="text-base font-medium"
                      style={{ color: "#8a8578" }}
                    >
                      /{item.unit}
                    </span>
                  </p>
                </div>

                <button className="fd-fp-cta mt-6 w-full rounded-xl py-3 flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-4 sm:hidden flex justify-center">
           <button className="fd-fp-viewall fd-mono inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full">
              View all products
              <span aria-hidden="true">→</span>
            </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;