import { Leaf, Mail, Phone, MapPin, ArrowRight, ArrowUp } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Light: muted emerald · Dark: muted sage
  const linkCls =
    "text-emerald-700/60 hover:text-emerald-600 dark:text-[#7FA08C] dark:hover:text-emerald-400 transition-colors duration-150 flex items-center gap-1.5 group";

  const colHeader = (label) => (
    <h3 className="font-['Space_Grotesk'] font-semibold text-base mb-6 flex items-center gap-2 text-emerald-950 dark:text-white">
      <span className="block w-1 h-4 rounded-full bg-emerald-500" />
      {label}
    </h3>
  );

  return (
    <footer
      className={`relative font-['Inter'] overflow-hidden
        bg-emerald-50 text-emerald-800/80
        dark:bg-[#071912] dark:text-[#B9CFC0]
        ${darkMode ? "dark" : ""}`}
    >
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full
        bg-emerald-300/20 blur-[100px]
        dark:bg-emerald-700/[0.12]" />
      <div className="pointer-events-none absolute top-1/2 right-[-10%] w-[400px] h-[400px] rounded-full
        bg-emerald-200/25 blur-[120px]
        dark:bg-emerald-500/[0.07]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full
        bg-emerald-300/15 blur-[90px]
        dark:bg-emerald-600/[0.08]" />

      {/* ── Top gradient accent line ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

      {/* ── Newsletter band ── */}
      {!isAuthenticated && (
        <div className="relative px-6 py-14">
          <div className="max-w-5xl mx-auto">
            {/* Glass card */}
            <div className="relative rounded-3xl overflow-hidden px-8 py-10 md:px-14
              bg-white/80 border border-emerald-200/70 shadow-[0_8px_40px_rgba(5,150,105,0.08)]
              dark:bg-[rgba(18,58,39,0.52)] dark:border-emerald-400/[0.14] dark:shadow-none
              backdrop-blur-xl">
              {/* inner glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-60 h-60 rounded-full
                bg-emerald-200/30 blur-3xl
                dark:bg-emerald-400/[0.06]" />

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="max-w-md">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4
                    bg-emerald-100 border border-emerald-300 text-emerald-700
                    dark:bg-emerald-400/10 dark:border-emerald-400/20 dark:text-emerald-400">
                    <Leaf size={12} />
                    NEWSLETTER
                  </div>

                  <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold leading-snug
                    text-emerald-950 dark:text-white">
                    Stay rooted with{" "}
                    <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500 bg-clip-text text-transparent">
                      fresh updates.
                    </span>
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-emerald-700/60 dark:text-[#7FA08C]">
                    Organic tips, seasonal produce alerts, and exclusive offers
                    — straight to your inbox.
                  </p>
                </div>

                <div className="flex w-full lg:w-auto min-w-0 lg:min-w-[420px]
                  shadow-[0_4px_20px_rgba(5,150,105,0.10)] dark:shadow-[0_8px_30px_rgba(5,150,105,0.15)]">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 rounded-l-2xl px-5 py-4 text-sm
                      border border-r-0
                      bg-white border-emerald-200 text-emerald-950 placeholder:text-emerald-400
                      dark:bg-[#0e2d1e] dark:border-emerald-400/20 dark:text-[#F4F9F2] dark:placeholder:text-[#4a7a60]
                      focus:outline-none focus:border-emerald-500
                      dark:focus:border-emerald-400
                      transition-colors duration-150"
                  />
                  <button
                    className="flex items-center gap-2 px-6 py-4 rounded-r-2xl font-semibold text-sm shrink-0 whitespace-nowrap
                      text-white bg-emerald-600 hover:bg-emerald-700
                      dark:text-[#063527] dark:bg-emerald-500 dark:hover:bg-emerald-400
                      active:scale-[0.98] transition-all duration-150"
                  >
                    Subscribe
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main columns ── */}
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center
                shadow-[0_4px_14px_rgba(5,150,105,0.25)] dark:shadow-[0_4px_14px_rgba(5,150,105,0.30)]">
                <Leaf size={18} className="text-white dark:text-[#063527]" />
              </div>
              <span className="font-['Space_Grotesk'] text-xl font-bold
                text-emerald-950 dark:text-white">
                GreenHarvest
              </span>
            </Link>

            <p className="text-sm leading-7 max-w-xs text-emerald-700/60 dark:text-[#7FA08C]">
              Connecting sellers directly with buyers to provide fresh, organic,
              and healthy products while ensuring fair prices for everyone.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-7">
              {[
                { Icon: FaFacebook,  label: "Facebook" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaXTwitter,  label: "X / Twitter" },
                { Icon: FaLinkedin,  label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200
                    bg-emerald-100 border-emerald-200 text-emerald-600
                    hover:bg-emerald-500 hover:text-white hover:border-transparent hover:shadow-[0_4px_12px_rgba(5,150,105,0.25)]
                    dark:bg-[rgba(18,58,39,0.80)] dark:border-emerald-400/10 dark:text-[#7FA08C]
                    dark:hover:bg-emerald-500 dark:hover:text-[#063527] dark:hover:border-transparent"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            {colHeader("Quick Links")}
            <ul className="space-y-3.5">
              {[
                { to: "/",             label: "Home" },
                { to: "/market-place", label: "Marketplace" },
                { to: "/about",        label: "About Us" },
                { to: "/contact",      label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkCls}>
                    <span className="w-1 h-1 rounded-full bg-emerald-400/50 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buyer */}
          <div>
            {colHeader("For Buyers")}
            <ul className="space-y-3.5">
              {[
                { to: "/market-place", label: "Browse Products" },
                { to: "/orders",       label: "My Orders" },
                { to: "/cart",         label: "Shopping Cart" },
                { to: "/register",     label: "Become a Member" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkCls}>
                    <span className="w-1 h-1 rounded-full bg-emerald-400/50 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            {colHeader("Contact")}
            <div className="space-y-5">
              {[
                {
                  Icon: MapPin,
                  content: (
                    <>
                      Indore, Madhya Pradesh
                      <br />
                      India
                    </>
                  ),
                },
                { Icon: Phone, content: "+91 XXXXX XXXXX" },
                { Icon: Mail,  content: "support@greenharvest.com" },
              ].map(({ Icon, content }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 border
                    bg-emerald-100 border-emerald-200 text-emerald-600
                    dark:bg-[rgba(18,58,39,0.90)] dark:border-emerald-400/15 dark:text-emerald-400">
                    <Icon size={14} />
                  </div>
                  <p className="text-sm leading-relaxed text-emerald-700/60 dark:text-[#7FA08C]">
                    {content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Gradient divider ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-center text-emerald-600/50 dark:text-[#4a7a60]">
          © {new Date().getFullYear()} GreenHarvest. Empowering sellers.
          Delivering freshness.
        </p>

        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms & Conditions", "Support"].map((label) => (
            <Link
              key={label}
              to="#"
              className="text-xs transition-colors duration-150
                text-emerald-700/60 hover:text-emerald-600
                dark:text-[#7FA08C] dark:hover:text-emerald-400"
            >
              {label}
            </Link>
          ))}

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-2 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200
              bg-emerald-100 border-emerald-200 text-emerald-600
              hover:bg-emerald-500 hover:text-white hover:border-transparent
              dark:bg-[rgba(18,58,39,0.80)] dark:border-emerald-400/15 dark:text-[#7FA08C]
              dark:hover:bg-emerald-500 dark:hover:text-[#063527] dark:hover:border-transparent"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
