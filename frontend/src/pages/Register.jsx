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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <Leaf size={34} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-950">
              Organic Farm
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 mt-10 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 w-fit text-sm font-medium text-amber-700">
            <Sprout size={14} />
            <span>Grow together, sell direct</span>
          </div>

          <h2 className="mt-6 text-6xl font-extrabold leading-[1.05] tracking-tight text-emerald-950">
            Join our marketplace.
          </h2>

          <p className="mt-6 text-lg text-emerald-900/60 leading-8 max-w-xl">
            Connect farmers directly with buyers. Buy fresh organic products or
            grow your farming business by reaching thousands of customers.
          </p>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-emerald-900/5 rounded-2xl p-4 shadow-[0_12px_24px_-16px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                <Sprout size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-emerald-950">
                  Fresh Organic Products
                </h3>
                <p className="text-emerald-900/50 text-sm">
                  Healthy & chemical-free produce.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-emerald-900/5 rounded-2xl p-4 shadow-[0_12px_24px_-16px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-600">
                <Tractor size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-emerald-950">
                  Direct Farmer Marketplace
                </h3>
                <p className="text-emerald-900/50 text-sm">
                  Fair prices with no middlemen.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xl border border-emerald-900/5 rounded-2xl p-4 shadow-[0_12px_24px_-16px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <BrainCircuit size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-emerald-950">
                  AI Farming Assistant
                </h3>
                <p className="text-emerald-900/50 text-sm">
                  Smart recommendations for modern farming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center px-6 py-12 relative z-10">
          <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_25px_60px_-15px_rgba(5,150,105,0.25)] p-8">
            {/* Mobile-only logo */}
            <div className="flex lg:hidden items-center justify-center gap-2 text-emerald-700 mb-6">
              <Leaf size={28} />
              <span className="text-xl font-bold text-emerald-950">Organic Farm</span>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold text-emerald-950">Create Account</h2>
              <p className="mt-3 text-emerald-900/50">Join as Buyer or Farmer</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">
                  Full Name
                </label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <User size={20} className="text-emerald-900/30 shrink-0" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">Email</label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <Mail size={20} className="text-emerald-900/30 shrink-0" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">
                  Phone Number
                </label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <Phone size={20} className="text-emerald-900/30 shrink-0" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">Location</label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <MapPin size={20} className="text-emerald-900/30 shrink-0" />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your city or village"
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">
                  Register As
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full border border-emerald-900/10 bg-white/60 rounded-xl px-4 py-4 outline-none text-emerald-950 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                >
                  <option value="buyer">Buyer</option>
                  <option value="farmer">Farmer</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">Password</label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <Lock size={20} className="text-emerald-900/30 shrink-0" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
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

              {/* Confirm Password */}
              <div>
                <label className="font-medium text-emerald-950 text-sm">
                  Confirm Password
                </label>

                <div className="mt-2 flex items-center gap-2 border border-emerald-900/10 bg-white/60 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500/50 transition-all">
                  <Lock size={20} className="text-emerald-900/30 shrink-0" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full py-4 outline-none bg-transparent text-emerald-950 placeholder:text-emerald-900/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-emerald-900/30 hover:text-emerald-700 transition-colors shrink-0"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-600 to-lime-500 hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 shadow-[0_12px_24px_-8px_rgba(5,150,105,0.5)] hover:shadow-[0_16px_32px_-8px_rgba(5,150,105,0.65)] hover:-translate-y-0.5"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-emerald-900/50">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
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
