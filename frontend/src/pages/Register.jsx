import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Leaf,
  ArrowRight,
  Phone,
  MapPin,
  Sprout,
  Tractor,
  BrainCircuit,
  ShoppingBag,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "buyer",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        role: formData.role,
        password: formData.password,
      });
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const isseller = formData.role === "seller";

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F0F7F2] dark:bg-[#0A130E] transition-colors duration-300 selection:bg-emerald-200/60 dark:selection:bg-emerald-800/60">

      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-emerald-400/25 dark:bg-emerald-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full bg-lime-400/20 dark:bg-lime-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 right-[12%] w-[280px] h-[280px] rounded-full bg-amber-300/15 dark:bg-amber-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 left-[35%] w-[200px] h-[200px] rounded-full bg-teal-300/10 dark:bg-teal-600/10 blur-[90px]" />

      <div className="relative max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">

        {/* ══ Left panel ════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex flex-col justify-center px-14 relative z-10">

          {/* Brand */}
          <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
            <div className="p-2.5 rounded-2xl bg-white/40 dark:bg-emerald-900/30 backdrop-blur-sm border border-emerald-600/20 dark:border-emerald-700/30 shadow-[0_8px_20px_-8px_rgba(5,150,105,0.3)] dark:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)]">
              <Leaf size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">
              Organic Farm
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 mt-10 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 dark:border-amber-500/20 w-fit text-sm font-medium text-amber-700 dark:text-amber-400 backdrop-blur-sm">
            <Sprout size={14} />
            <span>Grow together, sell direct</span>
          </div>

          <h2 className="mt-6 text-6xl font-extrabold leading-[1.05] tracking-tight text-emerald-950 dark:text-emerald-50">
            Join our<br />marketplace.
          </h2>

          <p className="mt-6 text-lg text-emerald-900/55 dark:text-emerald-100/60 leading-8 max-w-md">
            Connect sellers directly with buyers. Buy fresh organic products or
            grow your farming business by reaching thousands of customers.
          </p>

          {/* Feature cards — glass */}
          <div className="mt-12 space-y-4">
            {[
              {
                icon: <Sprout size={22} />,
                bg:   "bg-emerald-500/10 dark:bg-emerald-500/20",
                fg:   "text-emerald-600 dark:text-emerald-400",
                title:"Fresh Organic Products",
                sub:  "Healthy & chemical-free produce.",
              },
              {
                icon: <Tractor size={22} />,
                bg:   "bg-lime-500/10 dark:bg-lime-500/20",
                fg:   "text-lime-700 dark:text-lime-400",
                title:"Direct seller Marketplace",
                sub:  "Fair prices with no middlemen.",
              },
              {
                icon: <BrainCircuit size={22} />,
                bg:   "bg-amber-500/10 dark:bg-amber-500/20",
                fg:   "text-amber-600 dark:text-amber-400",
                title:"AI Farming Assistant",
                sub:  "Smart recommendations for modern farming.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-4 bg-white/50 dark:bg-[#112117]/50 backdrop-blur-xl border border-white/70 dark:border-emerald-800/40 rounded-2xl p-4 shadow-[0_12px_28px_-16px_rgba(5,150,105,0.2)] dark:shadow-[0_12px_28px_-16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-transform"
              >
                <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${f.bg} ${f.fg}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-950 dark:text-emerald-100">{f.title}</h3>
                  <p className="text-emerald-900/50 dark:text-emerald-100/50 text-sm">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ Right panel — glass form card ═════════════════════════════════ */}
        <div className="flex items-center justify-center px-6 py-12 relative z-10">
          <div className="w-full max-w-lg rounded-3xl p-8
            bg-white/40 dark:bg-[#112117]/60 backdrop-blur-2xl backdrop-saturate-150
            border border-white/60 dark:border-emerald-800/40
            shadow-[0_30px_70px_-20px_rgba(5,150,105,0.28),0_0_0_1px_rgba(255,255,255,0.5)_inset]
            dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]">

            {/* Gloss sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/50 dark:from-white/5 via-white/5 dark:via-transparent to-transparent" />

            <div className="relative z-10">
              {/* Mobile logo */}
              <div className="flex lg:hidden items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400 mb-6">
                <Leaf size={26} />
                <span className="text-xl font-bold text-emerald-950 dark:text-emerald-50">Organic Farm</span>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">Create Account</h2>
                <p className="mt-2 text-sm text-emerald-900/50 dark:text-emerald-100/60">
                  Tell us who you are to get started
                </p>
              </div>

              {/* ── Form ─────────────────────────────────────────────────── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Input field helper */}
                {[
                  { label: "Full Name",     name: "name",     type: "text",  placeholder: "Enter your full name",        Icon: User,  },
                  { label: "Email",         name: "email",    type: "email", placeholder: "Enter your email",            Icon: Mail,  },
                  { label: "Phone Number",  name: "phone",    type: "tel",   placeholder: "Enter your phone number",     Icon: Phone, },
                  { label: "Location",      name: "location", type: "text",  placeholder: "Enter your city or village",  Icon: MapPin,},
                ].map(({ label, name, type, placeholder, Icon }) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-emerald-950 dark:text-emerald-100">{label}</label>
                    <div className="mt-1.5 flex items-center gap-2
                      bg-white/50 dark:bg-emerald-950/40 backdrop-blur-sm
                      border border-white/70 dark:border-emerald-800/50
                      rounded-xl px-4
                      focus-within:ring-2 focus-within:ring-emerald-500/35 dark:focus-within:ring-emerald-500/50
                      focus-within:border-emerald-500/50 dark:focus-within:border-emerald-400/50
                      focus-within:bg-white/70 dark:focus-within:bg-emerald-900/50
                      shadow-[inset_0_1px_4px_rgba(5,150,105,0.06)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)]
                      transition-all">
                      <Icon size={18} className="text-emerald-700/40 dark:text-emerald-100/40 shrink-0" />
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full py-3.5 outline-none bg-transparent text-sm text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/30 dark:placeholder:text-emerald-100/30"
                      />
                    </div>
                  </div>
                ))}

                {/* ── Role toggle ─────────────────────────────────────────── */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-emerald-950 dark:text-emerald-100 mb-3 text-center">
                    I want to join as
                  </p>
                  <div className="relative flex rounded-2xl p-1
                    bg-white/30 dark:bg-emerald-950/40 backdrop-blur-sm border border-white/60 dark:border-emerald-800/50
                    shadow-[inset_0_2px_8px_rgba(5,150,105,0.08)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]">

                    {/* Sliding pill */}
                    <div
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-out
                        bg-gradient-to-r from-emerald-600 to-lime-500 dark:from-emerald-600 dark:to-lime-600
                        shadow-[0_6px_18px_-6px_rgba(5,150,105,0.55)] dark:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.4)]
                        ${isseller ? "left-[calc(50%+4px)]" : "left-1"}`}
                    />

                    {/* Buyer option */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: "buyer" })}
                      className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold z-10 transition-colors duration-300 ${
                        !isseller ? "text-white" : "text-emerald-900/60 dark:text-emerald-100/50 hover:text-emerald-800 dark:hover:text-emerald-100"
                      }`}
                    >
                      <ShoppingBag size={17} />
                      Buyer
                    </button>

                    {/* seller option */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: "seller" })}
                      className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold z-10 transition-colors duration-300 ${
                        isseller ? "text-white" : "text-emerald-900/60 dark:text-emerald-100/50 hover:text-emerald-800 dark:hover:text-emerald-100"
                      }`}
                    >
                      <Tractor size={17} />
                      seller
                    </button>
                  </div>

                  {/* Role description under toggle */}
                  <p className="mt-2.5 text-center text-xs text-emerald-900/45 dark:text-emerald-100/40 min-h-[1.2em] transition-all">
                    {isseller
                      ? "List your produce and reach thousands of organic buyers."
                      : "Discover and buy fresh produce directly from sellers."}
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-emerald-950 dark:text-emerald-100">Password</label>
                  <div className="mt-1.5 flex items-center gap-2
                    bg-white/50 dark:bg-emerald-950/40 backdrop-blur-sm border border-white/70 dark:border-emerald-800/50 rounded-xl px-4
                    focus-within:ring-2 focus-within:ring-emerald-500/35 dark:focus-within:ring-emerald-500/50
                    focus-within:border-emerald-500/50 dark:focus-within:border-emerald-400/50 focus-within:bg-white/70 dark:focus-within:bg-emerald-900/50
                    shadow-[inset_0_1px_4px_rgba(5,150,105,0.06)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] transition-all">
                    <Lock size={18} className="text-emerald-700/40 dark:text-emerald-100/40 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full py-3.5 outline-none bg-transparent text-sm text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/30 dark:placeholder:text-emerald-100/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-emerald-700/40 dark:text-emerald-100/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shrink-0"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="text-sm font-medium text-emerald-950 dark:text-emerald-100">Confirm Password</label>
                  <div className="mt-1.5 flex items-center gap-2
                    bg-white/50 dark:bg-emerald-950/40 backdrop-blur-sm border border-white/70 dark:border-emerald-800/50 rounded-xl px-4
                    focus-within:ring-2 focus-within:ring-emerald-500/35 dark:focus-within:ring-emerald-500/50
                    focus-within:border-emerald-500/50 dark:focus-within:border-emerald-400/50 focus-within:bg-white/70 dark:focus-within:bg-emerald-900/50
                    shadow-[inset_0_1px_4px_rgba(5,150,105,0.06)] dark:shadow-[inset_0_1px_4px_rgba(0,0,0,0.2)] transition-all">
                    <Lock size={18} className="text-emerald-700/40 dark:text-emerald-100/40 shrink-0" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full py-3.5 outline-none bg-transparent text-sm text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/30 dark:placeholder:text-emerald-100/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-emerald-700/40 dark:text-emerald-100/40 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shrink-0"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-lime-500 dark:from-emerald-600 dark:to-lime-600
                    hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all text-white py-4 rounded-xl font-semibold
                    flex justify-center items-center gap-2
                    shadow-[0_12px_28px_-8px_rgba(5,150,105,0.5)] dark:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4)]
                    hover:shadow-[0_16px_36px_-8px_rgba(5,150,105,0.65)] dark:hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.6)]
                    hover:-translate-y-0.5"
                >
                  {loading ? "Creating Account…" : "Create Account"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-emerald-900/50 dark:text-emerald-100/60">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;