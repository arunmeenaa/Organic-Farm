import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Sprout,
  Tractor,
  BrainCircuit,
  Star,
  Quote,
  CheckCircle2,
  Zap,
  Droplets,
  ArrowUpRight,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 },
};

export default function Home() {
  const { darkMode } = useTheme();

  // ── Style tokens ─────────────────────────────────────────────────────────
  const textFg = darkMode ? "text-emerald-50" : "text-[#0F2E22]";
  const textMuted = darkMode ? "text-emerald-300/70" : "text-[#5A7A68]";
  const textPrimary = darkMode ? "text-emerald-400" : "text-emerald-600";
  const textSecond = darkMode ? "text-lime-400" : "text-lime-500";
  const borderColor = darkMode
    ? "border-emerald-100/10"
    : "border-emerald-900/10";

  // font-display
  const fd = "font-['Space_Grotesk']";

  // gradient text (replaces text-gradient class)
  const gradientText = darkMode
    ? "bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-emerald-700 via-green-500 to-lime-400 bg-clip-text text-transparent";

  // glass card (replaces glass-card class)
  const glassCard = darkMode
    ? "bg-[rgba(12,28,20,0.75)] backdrop-blur-xl border border-emerald-100/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.30)]"
    : "bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_-8px_rgba(5,150,105,0.08)]";

  // glass panel (replaces glass-panel class)
  const glassPanel = darkMode
    ? "bg-[rgba(12,28,20,0.55)] backdrop-blur-md border border-emerald-100/10"
    : "bg-white/50 backdrop-blur-md border border-white/30";

  // bg-muted (avatar placeholder bg)
  const bgMuted = darkMode ? "bg-emerald-900/50" : "bg-[#E8F2EC]";
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <main
      className="
    fd-root
    min-h-screen
    w-full
    relative
    overflow-hidden
    selection:bg-emerald-600/20
    selection:text-emerald-600
  "
    >
    
      
      {/* ── HERO ── */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col gap-8 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/20 w-fit text-sm font-medium text-emerald-600">
            <SparkleIcon />
            <span>The future of organic farming is here</span>
          </div>

          <h1
            className={`${fd} text-5xl lg:text-7xl font-bold ${textFg} leading-[1.1] tracking-tight`}
          >
            Fresh produce straight from{" "}
            <span className={gradientText}>field to cart.</span>
          </h1>

          <p
            className={`text-lg lg:text-xl ${textMuted} leading-relaxed max-w-lg`}
          >
            Connect directly with local organic growers. Put an AI agronomist in
            every seller's pocket. Rent farm equipment as easily as ordering
            produce.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              to="/market-place"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-400 text-white font-medium shadow-[0_12px_24px_-8px_rgba(5,150,105,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(5,150,105,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Browse the marketplace
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/register"
              className={`w-full sm:w-auto px-8 py-4 rounded-xl ${glassPanel} ${textFg} font-medium hover:bg-white/80 transition-colors flex items-center justify-center gap-2`}
            >
              List your farm
            </Link>
          </div>

          <div
            className={`flex items-center gap-6 mt-6 pt-6 border-t ${borderColor}`}
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 ${darkMode ? "border-[#0b1a13]" : "border-white"} ${bgMuted} flex items-center justify-center overflow-hidden`}
                >
                  <img
                    src="/seller_portrait.jpg"
                    alt="seller"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className={`text-sm font-medium ${textFg}`}>
                Trusted by 2,000+ sellers
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating Cards Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:w-1/2 relative h-[500px] w-full"
        >
          {/* Main Background Image Card */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-600/10 border border-white/40">
            <img
              src="/farm_hero.jpg"
              alt="Organic Farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2E22]/60 to-transparent mix-blend-multiply" />
          </div>

          {/* AI Insight Floating Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-8 -left-12 lg:-left-16 ${glassCard} rounded-2xl p-4 w-64 shadow-xl z-20`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-600">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h4 className={`${fd} font-semibold text-sm ${textFg}`}>
                  AI Insight
                </h4>
                <p className={`text-xs ${textMuted} mt-1 leading-relaxed`}>
                  Optimal harvest time for your heirloom tomatoes is in 3 days.
                  Soil moisture is at 42%.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Produce Floating Card */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className={`absolute bottom-12 -left-8 ${glassCard} rounded-2xl p-3 w-56 shadow-xl z-20 flex items-center gap-3`}
          >
            <img
              src="/produce_basket.jpg"
              alt="Produce"
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h4 className={`${fd} font-semibold text-sm ${textFg}`}>
                Organic Carrots
              </h4>
              <div className={`text-xs ${textMuted}`}>Valley Farms</div>
              <div className={`${textPrimary} font-semibold text-sm mt-0.5`}>
                $4.50{" "}
                <span className={`text-[10px] ${textMuted} font-normal`}>
                  / bunch
                </span>
              </div>
            </div>
          </motion.div>

          {/* Tractor Floating Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className={`absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-12 ${glassCard} rounded-2xl p-4 w-52 shadow-xl z-20`}
          >
            <img
              src="/tractor.jpg"
              alt="Tractor"
              className="w-full h-24 rounded-lg object-cover mb-3"
            />
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Available
              </span>
              <span className={`text-xs font-semibold ${textFg}`}>
                $120/day
              </span>
            </div>
            <h4 className={`${fd} font-semibold text-sm ${textFg}`}>
              Compact Tractor
            </h4>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        className={`border-y ${borderColor} ${darkMode ? "bg-emerald-900/20 backdrop-blur-md" : "bg-white/40 backdrop-blur-md"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {[
              { label: "Active Farms", value: "2,400+" },
              { label: "Produce Sold", value: "850k lbs" },
              { label: "Equipment Rentals", value: "12,000+" },
              { label: "AI Insights Generated", value: "5.2M" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`${fd} text-3xl lg:text-4xl font-bold ${textFg} mb-2`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm font-medium ${textMuted} uppercase tracking-wider`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2
              className={`${fd} text-3xl lg:text-5xl font-bold ${textFg} mb-6`}
            >
              An ecosystem designed to{" "}
              <span className={gradientText}>nurture growth.</span>
            </h2>
            <p className={`text-lg ${textMuted}`}>
              Whether you're tending the soil or stocking your pantry, we've
              built the tools to make it effortless.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeIn}
              className={`${glassCard} rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center mb-6">
                <Sprout size={24} />
              </div>
              <h3 className={`${fd} text-xl font-bold ${textFg} mb-3`}>
                Direct Marketplace
              </h3>
              <p className={`${textMuted} leading-relaxed`}>
                Cut out the middlemen. Buy hyper-local organic produce directly
                from the sellers who grew it, ensuring peak freshness and fair
                prices.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-[40px] group-hover:bg-emerald-600/10 transition-colors" />
            </motion.div>

            <motion.div
              variants={fadeIn}
              className={`${glassCard} rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform`}
            >
              <div className="w-12 h-12 rounded-2xl bg-lime-500/10 text-lime-500 flex items-center justify-center mb-6">
                <BrainCircuit size={24} />
              </div>
              <h3 className={`${fd} text-xl font-bold ${textFg} mb-3`}>
                AI Agronomist
              </h3>
              <p className={`${textMuted} leading-relaxed`}>
                Smart sensors and machine learning combine to give sellers
                real-time advice on watering, pest control, and harvest timing.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/5 rounded-full blur-[40px] group-hover:bg-lime-500/10 transition-colors" />
            </motion.div>

            <motion.div
              variants={fadeIn}
              className={`${glassCard} rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
                <Tractor size={24} />
              </div>
              <h3 className={`${fd} text-xl font-bold ${textFg} mb-3`}>
                Equipment Sharing
              </h3>
              <p className={`${textMuted} leading-relaxed`}>
                Why buy when you can borrow? Rent idle farm machinery from
                neighbors, reducing capital costs and maximizing community
                utility.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] group-hover:bg-amber-500/10 transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCE & EQUIPMENT ── */}
      <section
        className={`py-24 lg:py-32 border-y ${borderColor} relative ${darkMode ? "bg-emerald-900/10" : "bg-white/50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Produce Row */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="lg:w-1/2"
            >
              <div
                className={`aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border ${borderColor} relative`}
              >
                <img
                  src="/produce_basket.jpg"
                  alt="Fresh Produce"
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-4 right-4 ${glassPanel} px-4 py-2 rounded-full font-medium text-sm ${textFg} flex items-center gap-2`}
                >
                  <CheckCircle2 size={16} className="text-emerald-600" />{" "}
                  Verified Organic
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="lg:w-1/2"
            >
              <h2
                className={`${fd} text-3xl lg:text-4xl font-bold ${textFg} mb-6`}
              >
                Taste the soil, not the supply chain.
              </h2>
              <p className={`text-lg ${textMuted} mb-8 leading-relaxed`}>
                Every listed item tells a story. See exactly when it was
                planted, how it was nourished, and when it was picked. The
                transparent supply chain ensures what lands on your plate is as
                real as it gets.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Harvested within 24 hours of delivery",
                  "Zero synthetic pesticides or fertilizers",
                  "Support local biodiversity and soil health",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-emerald-600/10 rounded text-emerald-600">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className={`${textFg} font-medium`}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/market-place"
                className={`inline-flex items-center gap-2 ${textPrimary} font-semibold hover:text-emerald-700 transition-colors`}
              >
                Explore local produce <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Equipment Row */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="lg:w-1/2"
            >
              <div
                className={`aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border ${borderColor} relative`}
              >
                <img
                  src="/tractor.jpg"
                  alt="Farm Equipment"
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute bottom-4 left-4 ${glassPanel} px-4 py-3 rounded-2xl flex items-center gap-4`}
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div
                      className={`text-xs ${textMuted} font-medium uppercase tracking-wider`}
                    >
                      Available Now
                    </div>
                    <div className={`${fd} font-bold ${textFg}`}>
                      Compact Tractor
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="lg:w-1/2"
            >
              <h2
                className={`${fd} text-3xl lg:text-4xl font-bold ${textFg} mb-6`}
              >
                Heavy machinery, light footprint.
              </h2>
              <p className={`text-lg ${textMuted} mb-8 leading-relaxed`}>
                Access the tools you need to scale your farm without the
                crushing debt. Our peer-to-peer equipment rental network puts
                millions of dollars of farming hardware at your fingertips.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className={`${glassCard} p-5 rounded-2xl`}>
                  <div
                    className={`${fd} text-2xl font-bold ${textPrimary} mb-1`}
                  >
                    -$45k
                  </div>
                  <div className={`text-sm font-medium ${textMuted}`}>
                    Avg. capital saved
                  </div>
                </div>
                <div className={`${glassCard} p-5 rounded-2xl`}>
                  <div
                    className={`${fd} text-2xl font-bold ${textSecond} mb-1`}
                  >
                    100%
                  </div>
                  <div className={`text-sm font-medium ${textMuted}`}>
                    Insured rentals
                  </div>
                </div>
              </div>
              <Link
                to="/market-place"
                className={`inline-flex items-center gap-2 ${textPrimary} font-semibold hover:text-emerald-700 transition-colors`}
              >
                Browse equipment rentals <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AI AGRONOMIST ── (always dark section) */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0F2E22] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/30 via-[#0F2E22] to-[#0F2E22] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/20 w-fit text-sm font-medium text-lime-400 mb-6">
                <BrainCircuit size={16} />
                <span>AI Agronomist</span>
              </div>
              <h2
                className={`${fd} text-3xl lg:text-5xl font-bold text-white mb-6`}
              >
                Your soil has a voice. <br />
                <span className="text-lime-400">We translate it.</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Connect our low-cost soil sensors to the platform, and our AI
                model acts as a world-class agronomist in your pocket. Get
                highly specific alerts on when to water, when to fertilize, and
                how to increase yield while reducing water usage.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                  <Droplets size={24} className="text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">
                      Smart Irrigation
                    </h4>
                    <p className="text-sm text-white/60 mt-1">
                      Saves an average of 40% water usage by only watering when
                      the root zone demands it.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-start gap-4">
                  <Leaf size={24} className="text-lime-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">
                      Disease Prediction
                    </h4>
                    <p className="text-sm text-white/60 mt-1">
                      Correlates local weather data with crop types to predict
                      and prevent blight before it takes hold.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/20 to-emerald-600/20 rounded-3xl blur-2xl transform -rotate-6" />
                <img
                  src="/seller_tech.jpg"
                  alt="seller using tech"
                  className="rounded-3xl relative z-10 border border-white/10 shadow-2xl"
                />
                {/* Moisture card */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-black/40 backdrop-blur-xl border border-white/20 p-5 rounded-2xl w-64">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-medium text-white/80">
                      Moisture Level
                    </span>
                    <span className={`${fd} text-2xl font-bold text-lime-400`}>
                      42%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-lime-400 h-2 rounded-full w-[42%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2
              className={`${fd} text-3xl lg:text-4xl font-bold ${textFg} mb-6`}
            >
              Rooted in community.
            </h2>
            <p className={`text-lg ${textMuted}`}>
              Hear from the sellers and buyers who are changing the local food
              system.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className={`${glassCard} p-8 rounded-3xl relative`}
            >
              <Quote className="absolute top-8 right-8 text-emerald-600/10 w-16 h-16" />
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p
                className={`text-lg ${textFg} font-medium leading-relaxed mb-8 relative z-10`}
              >
                "Before Organic Farm, I was losing 30% of my margin to
                distributors. Now, I sell directly to local families, and the AI
                agronomist helped me increase my yield by 15% this season."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/seller_portrait.jpg"
                  alt="Sarah Jenkins"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className={`font-semibold ${textFg}`}>Sarah Jenkins</div>
                  <div className={`text-sm ${textMuted}`}>
                    Owner, Green Valley Farms
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className={`${glassCard} p-8 rounded-3xl relative`}
            >
              <Quote className="absolute top-8 right-8 text-lime-500/10 w-16 h-16" />
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p
                className={`text-lg ${textFg} font-medium leading-relaxed mb-8 relative z-10`}
              >
                "Renting a tractor for just the three days I needed it saved me
                taking out a massive loan. The platform is seamless, and knowing
                I'm supporting another local seller feels right."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center font-bold text-emerald-600">
                  MR
                </div>
                <div>
                  <div className={`font-semibold ${textFg}`}>Marcus Rivera</div>
                  <div className={`text-sm ${textMuted}`}>
                    First-year Grower
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className={`absolute inset-0 ${darkMode ? "bg-emerald-900/10" : "bg-emerald-600/5"}`}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className={`${fd} text-4xl lg:text-5xl font-bold ${textFg} mb-6`}>
            Ready to join the movement?
          </h2>
          <p className={`text-xl ${textMuted} mb-10 max-w-2xl mx-auto`}>
            Whether you want to source the freshest ingredients or scale your
            agricultural business, your plot in our ecosystem is waiting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-400 text-white font-medium shadow-[0_12px_24px_-8px_rgba(5,150,105,0.4)] hover:shadow-[0_16px_32px_-8px_rgba(5,150,105,0.6)] hover:-translate-y-1 transition-all"
            >
              Create a free account
            </Link>
            <Link
              to="/about"
              className={`w-full sm:w-auto px-8 py-4 rounded-xl ${glassPanel} ${textFg} font-medium hover:bg-white/80 transition-colors`}
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8491 2.57019C11.3503 1.48834 12.6497 1.48834 13.1509 2.57019L14.7176 5.95256C14.9213 6.39223 15.6078 6.59591 16.0474 6.39223L19.4298 4.82558C20.5117 4.32439 21.6506 5.4633 21.1494 6.54515L19.5828 9.92751C19.3791 10.3672 19.5828 11.0537 20.0224 11.2574L23.4048 12.8241C24.4867 13.3253 24.4867 14.6246 23.4048 15.1258L20.0224 16.6925C19.5828 16.8961 19.3791 17.5827 19.5828 18.0224L21.1494 21.4047C21.6506 22.4866 20.5117 23.6255 19.4298 23.1243L16.0474 21.5576C15.6078 21.354 14.9213 21.5576 14.7176 21.9973L13.1509 25.3797C12.6497 26.4615 11.3503 26.4615 10.8491 25.3797L9.28245 21.9973C9.07878 21.5576 8.39223 21.354 7.95256 21.5576L4.57019 23.1243C3.48834 23.6255 2.34943 22.4866 2.85062 21.4047L4.41727 18.0224C4.62094 17.5827 4.41727 16.8961 3.97761 16.6925L0.595237 15.1258C-0.486612 14.6246 -0.486612 13.3253 0.595237 12.8241L3.97761 11.2574C4.41727 11.0537 4.62094 10.3672 4.41727 9.92751L2.85062 6.54515C2.34943 5.4633 3.48834 4.32439 4.57019 4.82558L7.95256 6.39223C8.39223 6.59591 9.07878 6.39223 9.28245 5.95256L10.8491 2.57019Z"
        fill="currentColor"
      />
    </svg>
  );
}
