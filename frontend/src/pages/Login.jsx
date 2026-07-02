import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight } from "lucide-react";

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
      navigate("/buyer/dashboard");
    } else if (user?.role === "farmer") {
      navigate("/farmer/dashboard");
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

      toast.success("Login successful");

      if (data.user.role === "buyer") {
        navigate("/buyer/dashboard");
      } else if (data.user.role === "farmer") {
        navigate("/farmer/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
            <Leaf size={40} />

            <h1 className="text-4xl font-bold">Organic Farm</h1>
          </div>

          <h2 className="mt-10 text-6xl font-extrabold leading-tight text-gray-900">
            Welcome Back 👋
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
            Buy fresh organic products directly from trusted farmers or manage
            your farm business from one modern platform.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-14">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-3xl font-bold text-green-600">500+</h3>

              <p className="text-gray-500 mt-2">Farmers</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-3xl font-bold text-green-600">1500+</h3>

              <p className="text-gray-500 mt-2">Products</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-3xl font-bold text-green-600">20K+</h3>

              <p className="text-gray-500 mt-2">Buyers</p>
            </div>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Login</h2>

              <p className="mt-3 text-gray-500">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}

              <div>
                <label className="font-medium">Email</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <Mail className="text-gray-400" size={20} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="font-medium">Password</label>

                <div className="mt-2 flex items-center border rounded-xl px-4">
                  <Lock className="text-gray-400" size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
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

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>

                <Link to="/forgot-password" className="text-green-600">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition rounded-xl text-white py-4 font-semibold flex justify-center items-center gap-2"
              >
                {loading ? "Signing In..." : "Login"}

                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-green-600 font-semibold ml-2"
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
