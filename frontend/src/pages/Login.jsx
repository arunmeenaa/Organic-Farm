import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Leaf,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sprout,
  Users,
  ShoppingBasket,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
// import { loginUser } from "../services/auth.service"; // Ensure this is used or removed if using useAuth instead
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    if (user?.role === "buyer") {
      navigate("/buyer/dashboard", { replace: true });
    } else if (user?.role === "farmer") {
      navigate("/farmer/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loggedInUser = await login({
        email: formData.email,
        password: formData.password,
      });

      toast.success(`Welcome back, ${loggedInUser?.name || "User"}!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9F2] dark:bg-[#0A120E] transition-colors duration-300 font-['Inter',_sans-serif] relative overflow-hidden">
      {/* Decorative Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_10%_0%,rgba(5,150,105,0.12),transparent),_radial-gradient(ellipse_55%_45%_at_90%_20%,rgba(132,204,22,0.12),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_10%_0%,rgba(16,185,129,0.08),transparent),_radial-gradient(ellipse_55%_45%_at_90%_20%,rgba(132,204,22,0.06),transparent)]" />
      </div>

      {/* ── Home button ── */}
      <div className="relative z-20 px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
            bg-white/70 dark:bg-emerald-950/40 
            backdrop-blur-md 
            border border-emerald-900/10 dark:border-emerald-800/50
            text-emerald-700 dark:text-emerald-300 text-sm font-medium
            hover:bg-white dark:hover:bg-emerald-900/60 
            hover:shadow-[0_4px_16px_-4px_rgba(5,150,105,0.20)] dark:hover:shadow-[0_4px_16px_-4px_rgba(16,185,129,0.15)]
            hover:-translate-y-0.5 transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Home
        </Link>
      </div>

      <div className="relative max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">
        {/* ── Left Section ── */}
        <div className="hidden lg:flex flex-col justify-center px-14 relative z-10 pb-20">
          {/* Logo */}
          <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
            <div className="p-2.5 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-600/20 dark:border-emerald-500/30">
              <Leaf size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50">
              Organic Farm
            </h1>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mt-10 px-3 py-1.5 rounded-full bg-emerald-600/10 dark:bg-emerald-500/20 border border-emerald-600/20 dark:border-emerald-500/30 w-fit text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <Sprout size={14} />
            <span>Field to cart, made simple</span>
          </div>

          <h2 className="mt-6 text-6xl font-extrabold leading-[1.05] tracking-tight text-emerald-950 dark:text-emerald-50">
            Welcome back.
          </h2>

          <p className="mt-6 text-lg text-emerald-900/60 dark:text-emerald-100/70 leading-8 max-w-xl">
            Buy fresh organic products directly from trusted farmers or manage
            your farm business from one modern platform.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-6 mt-14">
            {[
              { Icon: Sprout, value: "500+", label: "Farmers" },
              { Icon: ShoppingBasket, value: "1500+", label: "Products" },
              { Icon: Users, value: "20K+", label: "Buyers" },
            ].map(({ Icon, value, label }) => (
              <div
                key={label}
                className="bg-white/70 dark:bg-emerald-950/40 backdrop-blur-xl border border-emerald-900/5 dark:border-emerald-800/30 rounded-2xl shadow-[0_12px_24px_-12px_rgba(5,150,105,0.20)] dark:shadow-none p-6 hover:-translate-y-1 transition-transform"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <Icon size={18} />
                </div>
                <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                  {value}
                </h3>
                <p className="text-emerald-900/50 dark:text-emerald-200/60 mt-1 text-sm font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Section ── */}
        <div className="flex items-center justify-center px-6 py-12 relative z-10 pb-24">
          <div className="w-full max-w-md bg-white/80 dark:bg-[#121E18]/80 backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] rounded-3xl shadow-[0_25px_60px_-15px_rgba(5,150,105,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-8">
            {/* Mobile-only logo */}
            <div className="flex lg:hidden items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400 mb-6">
              <Leaf size={28} />
              <span className="text-xl font-bold text-emerald-950 dark:text-emerald-50">
                Organic Farm
              </span>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50">
                Login
              </h2>
              <p className="mt-3 text-emerald-900/50 dark:text-emerald-100/60">
                Sign in to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}
              <div>
                <label className="font-medium text-emerald-950 dark:text-emerald-200 text-sm">
                  Email
                </label>
                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 dark:border-emerald-700/50 bg-white/60 dark:bg-emerald-900/20 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 dark:focus-within:border-emerald-400/50 transition-all">
                  <Mail className="text-emerald-900/30 dark:text-emerald-100/40 shrink-0" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/30 dark:placeholder:text-emerald-100/30"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="font-medium text-emerald-950 dark:text-emerald-200 text-sm">
                  Password
                </label>
                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 dark:border-emerald-700/50 bg-white/60 dark:bg-emerald-900/20 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 dark:focus-within:border-emerald-400/50 transition-all">
                  <Lock className="text-emerald-900/30 dark:text-emerald-100/40 shrink-0" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 dark:text-emerald-50 placeholder:text-emerald-900/30 dark:placeholder:text-emerald-100/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-emerald-900/30 dark:text-emerald-100/40 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shrink-0"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember me / Forgot password */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-emerald-900/60 dark:text-emerald-200/70 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-emerald-900/20 dark:border-emerald-700/50 bg-white dark:bg-emerald-900/20 text-emerald-600 focus:ring-emerald-500/40 dark:focus:ring-emerald-500/40 dark:checked:bg-emerald-500"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600/90 dark:hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all rounded-xl text-white py-4 font-semibold
                  flex justify-center items-center gap-2
                  shadow-[0_12px_24px_-8px_rgba(5,150,105,0.45)] dark:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.25)]
                  hover:shadow-[0_16px_32px_-8px_rgba(5,150,105,0.60)] dark:hover:shadow-[0_16px_32px_-8px_rgba(16,185,129,0.35)]
                  hover:-translate-y-0.5"
              >
                {loading ? "Signing In…" : "Login"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-emerald-900/50 dark:text-emerald-200/60">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;