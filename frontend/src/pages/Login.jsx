import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight, Sprout, Users, ShoppingBasket } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/auth.service";
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

      const { data } = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      login({
        token: data.token,
        user: data.user,
      });

      toast.success(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F4F9F2] selection:bg-emerald-200/60">
      {/* Ambient background glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-lime-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-amber-300/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center px-14 relative z-10">
          <div className="flex items-center gap-3 text-emerald-700">
            <div className="p-2.5 rounded-2xl bg-emerald-600/10 border border-emerald-600/20">
              <Leaf size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-950">
              Organic Farm
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 mt-10 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 w-fit text-sm font-medium text-amber-700">
            <Sprout size={14} />
            <span>Field to cart, made simple</span>
          </div>

          <h2 className="mt-6 text-6xl font-extrabold leading-[1.05] tracking-tight text-emerald-950">
            Welcome back.
          </h2>

          <p className="mt-6 text-lg text-emerald-900/60 leading-8 max-w-xl">
            Buy fresh organic products directly from trusted farmers or manage
            your farm business from one modern platform.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-14">
            <div className="bg-white/70 backdrop-blur-xl border border-emerald-900/5 rounded-2xl shadow-[0_12px_24px_-12px_rgba(5,150,105,0.25)] p-6 hover:-translate-y-1 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center mb-3">
                <Sprout size={18} />
              </div>
              <h3 className="text-3xl font-bold text-emerald-700">500+</h3>
              <p className="text-emerald-900/50 mt-1 text-sm font-medium">Farmers</p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-emerald-900/5 rounded-2xl shadow-[0_12px_24px_-12px_rgba(5,150,105,0.25)] p-6 hover:-translate-y-1 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-lime-500/10 text-lime-600 flex items-center justify-center mb-3">
                <ShoppingBasket size={18} />
              </div>
              <h3 className="text-3xl font-bold text-emerald-700">1500+</h3>
              <p className="text-emerald-900/50 mt-1 text-sm font-medium">Products</p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-emerald-900/5 rounded-2xl shadow-[0_12px_24px_-12px_rgba(5,150,105,0.25)] p-6 hover:-translate-y-1 transition-transform">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                <Users size={18} />
              </div>
              <h3 className="text-3xl font-bold text-emerald-700">20K+</h3>
              <p className="text-emerald-900/50 mt-1 text-sm font-medium">Buyers</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center px-6 py-12 relative z-10">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_25px_60px_-15px_rgba(5,150,105,0.25)] p-8">
            {/* Mobile-only logo */}
            <div className="flex lg:hidden items-center justify-center gap-2 text-emerald-700 mb-6">
              <Leaf size={28} />
              <span className="text-xl font-bold text-emerald-950">Organic Farm</span>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-emerald-950">Login</h2>
              <p className="mt-3 text-emerald-900/50">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">Email</label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <Mail className="text-emerald-900/30 shrink-0" size={20} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">Password</label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <Lock className="text-emerald-900/30 shrink-0" size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-emerald-900/30 hover:text-emerald-700 transition-colors shrink-0"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-emerald-900/60 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded border-emerald-900/20 text-emerald-600 focus:ring-emerald-500/40"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all rounded-xl text-white py-4 font-semibold flex justify-center items-center gap-2 shadow-[0_12px_24px_-8px_rgba(5,150,105,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(5,150,105,0.65)] hover:-translate-y-0.5"
              >
                {loading ? "Signing In..." : "Login"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-emerald-900/50">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
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
