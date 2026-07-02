import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import toast from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, Leaf, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">
        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-center px-14">
          <div className="flex items-center gap-3 text-green-700">
            <Leaf size={42} />
            <h1 className="text-4xl font-bold">Organic Farm</h1>
          </div>

          <h2 className="mt-10 text-6xl font-extrabold leading-tight text-gray-900">
            Join Our Marketplace 🌾
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
            Connect farmers directly with buyers. Buy fresh organic products or
            grow your farming business by reaching thousands of customers.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                🌱
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Fresh Organic Products
                </h3>

                <p className="text-gray-500">
                  Healthy & chemical-free produce.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                🚜
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Direct Farmer Marketplace
                </h3>

                <p className="text-gray-500">Fair prices with no middlemen.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                🤖
              </div>

              <div>
                <h3 className="font-semibold text-lg">AI Farming Assistant</h3>

                <p className="text-gray-500">
                  Smart recommendations for modern farming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Create Account</h2>

              <p className="mt-3 text-gray-500">Join as Buyer or Farmer</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}

              <div>
                <label className="font-medium">Full Name</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <User size={20} className="text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="font-medium">Email</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <Mail size={20} className="text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Phone Number</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Location</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your city or village"
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>
              {/* Role */}

              <div>
                <label className="font-medium">Register As</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-xl px-4 py-4 outline-none"
                >
                  <option value="buyer">Buyer</option>
                  <option value="farmer">Farmer</option>
                </select>
              </div>

              {/* Password */}

              <div>
                <label className="font-medium">Password</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <Lock size={20} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full px-4 py-4 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div>
                <label className="font-medium">Confirm Password</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <Lock size={20} className="text-gray-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full px-4 py-4 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2"
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Already have an account?
                <Link to="/login" className="ml-2 text-green-600 font-semibold">
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
