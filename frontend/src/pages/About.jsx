import React from "react";
import {
  Leaf,
  Bot,
  CloudSun,
  ShoppingBasket,
  Tractor,
  Users,
  ArrowUpRight,
  Sprout,
  ShieldCheck,
  Globe
} from "lucide-react";

// Editorial, earthy typography and smooth transitions
const OrganicThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    .of-root { 
      font-family: 'Plus Jakarta Sans', sans-serif; 
      background-color: #FDFBF7; /* Warm Oatmeal Cream */
      color: #2D3A2F; /* Deep Forest Charcoal */
    }
    
    .of-serif { 
      font-family: 'Fraunces', serif; 
    }

    /* Subtle earthy accent graphics */
    .of-grain-bg {
      position: relative;
    }
    .of-grain-bg::before {
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0.02;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `}</style>
);

const features = [
  {
    icon: <ShoppingBasket size={24} className="text-emerald-700" />,
    title: "Direct-to-Buyer Marketplace",
    description: "Bypass middlemen entirely. Farmers list crops directly, ensuring maximum earnings for growers and fresh yields for buyers.",
  },
  {
    icon: <Bot size={24} className="text-emerald-700" />,
    title: "AI Agronomist Assistant",
    description: "Instant, localized guidance on soil enrichment, eco-friendly pest controls, and native organic farming techniques.",
  },
  {
    icon: <CloudSun size={24} className="text-emerald-700" />,
    title: "Hyper-Local Weather Insights",
    description: "Advanced micro-climate tracking to help agriculturalists map out precise sowing, watering, and harvest schedules.",
  },
  {
    icon: <Tractor size={24} className="text-emerald-700" />,
    title: "100% Sustainable Focus",
    description: "A platform explicitly structured to scale chemical-free farming, ecological diversity, and regenerative agriculture.",
  },
];

const techStack = [
  "React", "Node.js", "Express.js", "MongoDB", 
  "Gemini AI", "OpenWeather API", "Tailwind CSS", "JWT Auth"
];

const About = () => {
  return (
    <div className="of-root of-grain-bg min-h-screen selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
      <OrganicThemeStyles />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-stone-200/60">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sprout size={14} /> Cultivating the Future
          </div>
          
          <h1 className="of-serif text-4xl md:text-6xl font-medium text-stone-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Bridging the gap between <span className="italic text-emerald-800 font-serif">honest farming</span> and intelligent technology.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-stone-600 leading-relaxed">
            Organic Farm is a next-generation agricultural ecosystem. We empower local growers with advanced AI intuition while giving conscious consumers transparent access to pure, pesticide-free sustenance.
          </p>
        </div>

        {/* Decorative Earthy Shapes */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      </section>

      {/* --- MISSION & MANIFESTO --- */}
      <section className="py-20 md:py-28 bg-[#F9F6F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-5 sticky top-8">
              <span className="text-amber-800 font-semibold tracking-wider uppercase text-xs">Our Purpose</span>
              <h2 className="of-serif text-3xl md:text-4xl font-medium text-stone-950 mt-2 mb-6">
                A healthier soil, a fairer economy.
              </h2>
              <p className="text-stone-600 leading-relaxed mb-8">
                Traditional agricultural supply chains are broken. Farmers shoulder the heaviest risks but take home nominal margins. We are re-engineering this relationship from the ground up.
              </p>
              
              <div className="p-6 bg-emerald-900 text-stone-100 rounded-2xl shadow-sm">
                <Users className="text-amber-400 mb-4" size={32} />
                <h4 className="of-serif text-xl font-medium mb-2 text-white">The Direct Loop</h4>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  Every purchase on our platform routes funds directly to the agricultural households responsible for harvesting the yield. No exploitation. No hidden trade tariffs.
                </p>
              </div>
            </div>

            {/* Right Column: Pillars Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="p-8 bg-white border border-stone-200/80 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 mb-6">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">Decentralized Trade</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Eliminating traditional middlemen brokers to preserve the fair baseline value of organic crops.</p>
              </div>

              <div className="p-8 bg-white border border-stone-200/80 rounded-2xl sm:translate-y-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 mb-6">
                  <Leaf size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">Pure Transparency</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Buyers trace food back to the exact acreage, verified organic credentials, and local soil batch it came from.</p>
              </div>

              <div className="p-8 bg-white border border-stone-200/80 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 mb-6">
                  <Bot size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">AI Agronomy Access</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Democratizing top-tier botanical and biological crop guidance to independent smallholder farms for free.</p>
              </div>

              <div className="p-8 bg-white border border-stone-200/80 rounded-2xl sm:translate-y-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 mb-6">
                  <Globe size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">Regenerative Future</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Active emphasis on companion planting, soil carbon capture, and eliminating synthetic residues.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURE CARDS --- */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-xs">Core Offerings</span>
          <h2 className="of-serif text-3xl md:text-4xl font-medium text-stone-900 mt-2">
            Engineered naturally, optimized digitally
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feat, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white border border-stone-200/70 hover:border-emerald-600/30 rounded-2xl transition-all duration-300 hover:shadow-[0_12px_30px_-15px_rgba(45,58,47,0.06)] flex gap-6 items-start"
            >
              <div className="p-3 bg-stone-50 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-900 transition-colors shrink-0">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-lg mb-2 flex items-center gap-1">
                  {feat.title} 
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-stone-400" />
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-16 bg-[#FAF8F2] border-t border-b border-stone-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <h3 className="of-serif text-2xl font-medium text-stone-950">Architectural Integrity</h3>
              <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                Utilizing high-performance frameworks to handle dynamic calculations, weather processing, and real-time LLM feedback loops.
              </p>
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-2 md:justify-end">
              {techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg text-xs font-medium hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CLOSING/CTA PROSE --- */}
      <section className="py-24 text-center relative px-6 bg-stone-900 text-stone-100">
        <div className="max-w-3xl mx-auto relative z-10">
          <Leaf className="mx-auto text-amber-400 mb-6 rotate-12" size={40} />
          <h2 className="of-serif text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
            Real progress is rooted in the soil.
          </h2>
          <p className="text-stone-300 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            By marrying artificial intelligence with traditional organic intuition, we aren't just building a marketplace—we are constructing a resilient, decentralized agricultural lineage for generations to come.
          </p>
        </div>
        
        {/* Abstract dark organic background shape */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/svg%3E")` }} />
      </section>
    </div>
  );
};

export default About;