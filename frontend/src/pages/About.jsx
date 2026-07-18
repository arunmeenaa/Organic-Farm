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
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <ShoppingBasket size={24} className="text-emerald-700 dark:text-emerald-400" />,
    title: "Direct-to-Buyer Marketplace",
    description:
      "Bypass middlemen entirely. sellers list crops directly, ensuring maximum earnings for growers and fresh yields for buyers.",
  },
  {
    icon: <Bot size={24} className="text-emerald-700 dark:text-emerald-400" />,
    title: "AI Agronomist Assistant",
    description:
      "Instant, localized guidance on soil enrichment, eco-friendly pest controls, and native organic farming techniques.",
  },
  {
    icon: <CloudSun size={24} className="text-emerald-700 dark:text-emerald-400" />,
    title: "Hyper-Local Weather Insights",
    description:
      "Advanced micro-climate tracking to help agriculturalists map out precise sowing, watering, and harvest schedules.",
  },
  {
    icon: <Tractor size={24} className="text-emerald-700 dark:text-emerald-400" />,
    title: "100% Sustainable Focus",
    description:
      "A platform explicitly structured to scale chemical-free farming, ecological diversity, and regenerative agriculture.",
  },
];

const techStack = [
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Gemini AI",
  "OpenWeather API",
  "Tailwind CSS",
  "JWT Auth",
];

const stats = [
  { value: "0%", label: "Middlemen commission" },
  { value: "24/7", label: "AI agronomist access" },
  { value: "100%", label: "Chemical-free listings" },
];

const About = () => {
  return (
    <div className="font-['Plus_Jakarta_Sans',_sans-serif] min-h-screen text-[#2D3A2F] dark:text-emerald-50 transition-colors duration-500 selection:bg-emerald-200/60 dark:selection:bg-emerald-800/60 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-stone-200/60 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sprout size={14} /> Cultivating the Future
          </div>

          <h1 className="font-['Fraunces',_serif] text-4xl md:text-6xl font-medium text-stone-900 dark:text-emerald-50 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Bridging the gap between{" "}
            <span className="italic text-emerald-800 dark:text-emerald-400 bg-gradient-to-r from-emerald-600/20 to-emerald-600/20 dark:from-emerald-400/20 dark:to-emerald-400/20 bg-no-repeat [background-position:0_88%] [background-size:100%_0.35em]">
              honest farming
            </span>{" "}
            and intelligent technology.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-stone-600 dark:text-emerald-100/70 leading-relaxed">
            Organic Farm is a next-generation agricultural ecosystem. We empower local growers with
            advanced AI intuition while giving conscious consumers transparent access to pure,
            pesticide-free sustenance.
          </p>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2">
                <div className="font-['Fraunces',_serif] text-2xl md:text-3xl font-medium text-emerald-800 dark:text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-[11px] md:text-xs text-stone-500 dark:text-emerald-100/50 mt-1 leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Earthy Shapes */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-100 dark:bg-emerald-600/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-amber-50 dark:bg-amber-600/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
      </section>

      {/* --- MISSION & MANIFESTO --- */}
      <section className="py-20 md:py-28  transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <span className="text-amber-800 dark:text-amber-500 font-semibold tracking-wider uppercase text-xs">
                Our Purpose
              </span>
              <h2 className="font-['Fraunces',_serif] text-3xl md:text-4xl font-medium text-stone-950 dark:text-emerald-50 mt-2 mb-6">
                A healthier soil, a fairer economy.
              </h2>
              <p className="text-stone-600 dark:text-emerald-100/70 leading-relaxed mb-8">
                Traditional agricultural supply chains are broken. sellers shoulder the heaviest
                risks but take home nominal margins. We are re-engineering this relationship from
                the ground up.
              </p>

              <div className="relative p-6 bg-emerald-900 dark:bg-[#112117] text-stone-100 rounded-2xl shadow-[0_20px_45px_-20px_rgba(6,78,59,0.55)] dark:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] border border-transparent dark:border-emerald-800/40 overflow-hidden">
                <Sparkles className="absolute -top-3 -right-3 text-emerald-700/40 dark:text-emerald-500/20" size={72} />
                <Users className="text-amber-400 mb-4 relative z-10" size={32} />
                <h4 className="font-['Fraunces',_serif] text-xl font-medium mb-2 text-white relative z-10">
                  The Direct Loop
                </h4>
                <p className="text-sm text-emerald-100/80 dark:text-emerald-100/60 leading-relaxed relative z-10">
                  Every purchase on our platform routes funds directly to the agricultural
                  households responsible for harvesting the yield. No exploitation. No hidden
                  trade tariffs.
                </p>
              </div>
            </div>

            {/* Right Column: Pillars Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="group p-8 bg-white dark:bg-[#112117]/50 border border-stone-200/80 dark:border-white/10 rounded-2xl transition-all duration-300 hover:border-amber-300/70 dark:hover:border-amber-500/50 hover:shadow-[0_16px_36px_-20px_rgba(45,58,47,0.15)] dark:hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/20 flex items-center justify-center text-amber-800 dark:text-amber-400 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-emerald-50 mb-2">Decentralized Trade</h3>
                <p className="text-stone-600 dark:text-emerald-100/70 text-sm leading-relaxed">
                  Eliminating traditional middlemen brokers to preserve the fair baseline value of
                  organic crops.
                </p>
              </div>

              <div className="group p-8 bg-white dark:bg-[#112117]/50 border border-stone-200/80 dark:border-white/10 rounded-2xl sm:translate-y-6 transition-all duration-300 hover:border-emerald-300/70 dark:hover:border-emerald-500/50 hover:shadow-[0_16px_36px_-20px_rgba(45,58,47,0.15)] dark:hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-800 dark:text-emerald-400 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Leaf size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-emerald-50 mb-2">Pure Transparency</h3>
                <p className="text-stone-600 dark:text-emerald-100/70 text-sm leading-relaxed">
                  Buyers trace food back to the exact acreage, verified organic credentials, and
                  local soil batch it came from.
                </p>
              </div>

              <div className="group p-8 bg-white dark:bg-[#112117]/50 border border-stone-200/80 dark:border-white/10 rounded-2xl transition-all duration-300 hover:border-emerald-300/70 dark:hover:border-emerald-500/50 hover:shadow-[0_16px_36px_-20px_rgba(45,58,47,0.15)] dark:hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-800 dark:text-emerald-400 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Bot size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-emerald-50 mb-2">AI Agronomy Access</h3>
                <p className="text-stone-600 dark:text-emerald-100/70 text-sm leading-relaxed">
                  Democratizing top-tier botanical and biological crop guidance to independent
                  smallholder farms for free.
                </p>
              </div>

              <div className="group p-8 bg-white dark:bg-[#112117]/50 border border-stone-200/80 dark:border-white/10 rounded-2xl sm:translate-y-6 transition-all duration-300 hover:border-amber-300/70 dark:hover:border-amber-500/50 hover:shadow-[0_16px_36px_-20px_rgba(45,58,47,0.15)] dark:hover:shadow-[0_16px_36px_-20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/20 flex items-center justify-center text-amber-800 dark:text-amber-400 mb-6 transition-transform duration-300 group-hover:scale-110">
                  <Globe size={20} />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-emerald-50 mb-2">Regenerative Future</h3>
                <p className="text-stone-600 dark:text-emerald-100/70 text-sm leading-relaxed">
                  Active emphasis on companion planting, soil carbon capture, and eliminating
                  synthetic residues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE CARDS --- */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-800 dark:text-emerald-400 font-semibold tracking-wider uppercase text-xs">
            Core Offerings
          </span>
          <h2 className="font-['Fraunces',_serif] text-3xl md:text-4xl font-medium text-stone-900 dark:text-emerald-50 mt-2">
            Engineered naturally, optimized digitally
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feat, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-[#112117]/60 border border-stone-200/70 dark:border-white/10 hover:border-emerald-600/30 dark:hover:border-emerald-500/50 rounded-2xl transition-all duration-300 hover:shadow-[0_12px_30px_-15px_rgba(45,58,47,0.1)] dark:hover:shadow-[0_12px_30px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 flex gap-6 items-start"
            >
              <div className="p-3 bg-stone-50 dark:bg-white/5 rounded-xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/20 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors shrink-0">
                {feat.icon}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-emerald-50 text-lg mb-2 flex items-center gap-1">
                  {feat.title}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-stone-400 dark:text-emerald-100/50"
                  />
                </h3>
                <p className="text-stone-600 dark:text-emerald-100/70 text-sm leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-16  border-y border-stone-200/50 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <h3 className="font-['Fraunces',_serif] text-2xl font-medium text-stone-950 dark:text-emerald-50">
                Architectural Integrity
              </h3>
              <p className="text-stone-500 dark:text-emerald-100/60 text-xs mt-2 leading-relaxed">
                Utilizing high-performance frameworks to handle dynamic calculations, weather
                processing, and real-time LLM feedback loops.
              </p>
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-2 md:justify-end">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-emerald-100/80 rounded-lg text-xs font-medium hover:bg-emerald-50 dark:hover:bg-emerald-500/20 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:text-emerald-900 dark:hover:text-emerald-300 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CLOSING/CTA PROSE --- */}
      <section className="py-24 text-center relative px-6  text-black dark:border-t  transition-colors duration-500">
        <div className="max-w-3xl mx-auto relative z-10">
          <Leaf className="mx-auto text-amber-400 mb-6 rotate-12" size={40} />
          <h2 className="font-['Fraunces',_serif] text-3xl md:text-5xl font-medium tracking-tight text-black mb-6">
            Real progress is rooted in the soil.
          </h2>
          <p className="text-black  leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            By marrying artificial intelligence with traditional organic intuition, we aren't just
            building a marketplace—we are constructing a resilient, decentralized agricultural
            lineage for generations to come.
          </p>
        </div>

        {/* Abstract dark organic background shape */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </section>
    </div>
  );
};

export default About;