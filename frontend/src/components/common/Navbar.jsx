import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Leaf,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const { totalItems } = useCart();

  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileMenu(false);
    setMobileMenu(false);
    navigate("/", { replace: true });
  };
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);
  const activeClass =
    "text-green-700 font-semibold border-b-2 border-green-600";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={
              !isAuthenticated
                ? "/"
                : user?.role === "buyer"
                  ? "/buyer/dashboard"
                  : "/farmer/dashboard"
            }
            className="flex items-center gap-2 text-2xl font-bold text-green-700"
          >
            <Leaf size={32} />
            <span>Organic Farm</span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink
              to={
                !isAuthenticated
                  ? "/"
                  : user?.role === "buyer"
                    ? "/buyer/dashboard"
                    : "/farmer/dashboard"
              }
              className={({ isActive }) =>
                isActive ? activeClass : "hover:text-green-700"
              }
            >
              Home
            </NavLink>

            {isAuthenticated && user?.role === "buyer" && (
              <>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  My Orders
                </NavLink>
              </>
            )}

            {isAuthenticated && user?.role === "farmer" && (
              <>
                <NavLink
                  to="/farmer/products"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  My Products
                </NavLink>

                <NavLink
                  to="/farmer/products/add"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  Add Product
                </NavLink>

                <NavLink
                  to="/farmer/orders"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  Orders
                </NavLink>
              </>
            )}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeClass : "hover:text-green-700"
              }
            >
              About
            </NavLink>
          </nav>

          {/* Search */}

          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
            <Search size={18} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search organic products..."
              className="bg-transparent outline-none w-full px-3"
            />
          </div>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-5">
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-green-700 font-medium">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                {user?.role === "buyer" && (
                  <Link to="/cart" className="relative">
                    <ShoppingCart size={24} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}

                <div className="relative">
                  <button
                    onClick={() => setProfileMenu(!profileMenu)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold uppercase">
                      {user?.name?.trim()?.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-left">
                      <p className="font-medium">{user?.name}</p>

                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role}
                      </p>
                    </div>

                    <ChevronDown size={18} />
                  </button>

                  {profileMenu && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border">
                      <Link
                        to={
                          user?.role === "buyer"
                            ? "/buyer/profile"
                            : "/farmer/profile"
                        }
                        onClick={() => setProfileMenu(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                      >
                        <User size={18} />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100 text-red-500"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden"
          >
            {mobileMenu ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}

      {mobileMenu && (
        <div className="lg:hidden bg-white border-t">
          <div className="p-5 flex flex-col gap-5">
            <Link
              to={
                !isAuthenticated
                  ? "/"
                  : user?.role === "buyer"
                    ? "/buyer/dashboard"
                    : "/farmer/dashboard"
              }
            >
              Home
            </Link>

            {!isAuthenticated && (
              <>
                <Link to="/products" onClick={() => setMobileMenu(false)}>
                  Products
                </Link>
                <Link to="/about" onClick={() => setMobileMenu(false)}>
                  About
                </Link>
                <Link to="/login" onClick={() => setMobileMenu(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenu(false)}>
                  Register
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === "buyer" && (
              <>
                <NavLink
                  to="/buyer/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  Dashboard
                </NavLink>
                <Link to="/products" onClick={() => setMobileMenu(false)}>
                  Products
                </Link>
                <Link to="/orders" onClick={() => setMobileMenu(false)}>
                  My Orders
                </Link>
                <Link to="/cart" onClick={() => setMobileMenu(false)}>
                  Cart
                </Link>
                <Link to="/buyer/profile" onClick={() => setMobileMenu(false)}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

            {isAuthenticated && user?.role === "farmer" && (
              <>
                <NavLink
                  to="/farmer/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  Dashboard
                </NavLink>
                <Link
                  to="/farmer/products"
                  onClick={() => setMobileMenu(false)}
                >
                  My Products
                </Link>

                <Link
                  to="/farmer/products/add"
                  onClick={() => setMobileMenu(false)}
                >
                  Add Product
                </Link>
                <Link to="/farmer/orders" onClick={() => setMobileMenu(false)}>
                  Orders
                </Link>
                <Link to="/farmer/profile" onClick={() => setMobileMenu(false)}>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
