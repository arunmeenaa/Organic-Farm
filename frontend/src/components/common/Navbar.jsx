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

// Same direction as Dashboard / About / Farmer Profile: glassmorphism,
// indigo → emerald gradient accents, Space Grotesk wordmark, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-nav { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-wordmark { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-wordmark-gradient {
      background: linear-gradient(90deg, #4338CA, #059669);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .fd-header {
      background: rgba(245, 246, 250, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(99, 102, 241, 0.14);
    }

    .fd-link {
      position: relative;
      color: #5B5A87;
      transition: color 0.15s ease;
    }
    .fd-link:hover { color: #1E1B4B; }
    .fd-link::after {
      content: "";
      position: absolute;
      left: 0;
      right: 100%;
      bottom: -6px;
      height: 2px;
      background: linear-gradient(90deg, #6366F1, #10B981);
      transition: right 0.2s ease;
      border-radius: 2px;
    }
    .fd-link:hover::after { right: 0; }

    .fd-link-active {
      color: #1E1B4B;
      font-weight: 600;
    }
    .fd-link-active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px;
      height: 2px;
      background: linear-gradient(90deg, #6366F1, #10B981);
      border-radius: 2px;
    }

    .fd-search {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #E0E1EC;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-search:focus-within {
      border-color: #6366F1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
    }

    .fd-btn-primary {
      background: linear-gradient(90deg, #4F46E5, #059669);
      color: white;
      box-shadow: 0 10px 22px -10px rgba(79, 70, 229, 0.5);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(79, 70, 229, 0.6); }
    .fd-btn-primary:active { transform: translateY(0); }

    .fd-avatar {
      background: conic-gradient(from 180deg, #6366F1, #10B981, #F59E0B, #6366F1);
      padding: 2px;
    }
    .fd-avatar-inner {
      background: linear-gradient(135deg, #6366F1, #4F46E5);
      color: white;
    }

    .fd-cart-badge {
      background: #F59E0B;
      color: #1E1B4B;
    }

    .fd-dropdown {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 20px 40px -18px rgba(79, 70, 229, 0.3);
    }
    .fd-dropdown-item {
      transition: background 0.15s ease;
    }
    .fd-dropdown-item:hover { background: rgba(99, 102, 241, 0.08); }

    .fd-mobile-drawer {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid rgba(99, 102, 241, 0.14);
    }
    .fd-mobile-link {
      color: #1E1B4B;
      transition: color 0.15s ease;
    }
    .fd-mobile-link:hover { color: #4F46E5; }
  `}</style>
);

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
  const activeClass = "fd-link fd-link-active";
  const linkClass = "fd-link py-1";

  return (
    <>
      <FontImport />
      <header className="fd-nav sticky top-0 z-50 fd-header">
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
              className="fd-wordmark fd-wordmark-gradient flex items-center gap-2 text-2xl font-bold"
            >
              <Leaf size={30} style={{ color: "#10B981" }} />
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
                  isActive ? activeClass : linkClass
                }
              >
                Home
              </NavLink>

              {isAuthenticated && user?.role === "buyer" && (
                <>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive ? activeClass : linkClass
                    }
                  >
                    Products
                  </NavLink>

                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      isActive ? activeClass : linkClass
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
                      isActive ? activeClass : linkClass
                    }
                  >
                    My Products
                  </NavLink>

                  <NavLink
                    to="/farmer/products/add"
                    className={({ isActive }) =>
                      isActive ? activeClass : linkClass
                    }
                  >
                    Add Product
                  </NavLink>

                  <NavLink
                    to="/farmer/orders"
                    className={({ isActive }) =>
                      isActive ? activeClass : linkClass
                    }
                  >
                    Orders
                  </NavLink>
                </>
              )}

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeClass : linkClass
                }
              >
                About
              </NavLink>
            </nav>

            {/* Search */}

            <div className="fd-search hidden md:flex items-center rounded-full px-4 py-2 w-80">
              <Search size={18} style={{ color: "#A3A4C2" }} />

              <input
                type="text"
                placeholder="Search organic products..."
                className="bg-transparent outline-none w-full px-3 text-sm"
                style={{ color: "#1E1B4B" }}
              />
            </div>

            {/* Right Side */}

            <div className="hidden lg:flex items-center gap-5">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="font-medium"
                    style={{ color: "#4F46E5" }}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="fd-btn-primary px-5 py-2 rounded-xl font-medium"
                  >
                    Register
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <>
                  {user?.role === "buyer" && (
                    <Link to="/cart" className="relative" style={{ color: "#1E1B4B" }}>
                      <ShoppingCart size={24} />
                      {totalItems > 0 && (
                        <span className="fd-cart-badge absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
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
                      <div className="fd-avatar w-10 h-10 rounded-full">
                        <div className="fd-avatar-inner w-full h-full rounded-full flex items-center justify-center font-bold uppercase text-sm">
                          {user?.name?.trim()?.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      <div className="text-left">
                        <p className="font-medium text-sm" style={{ color: "#1E1B4B" }}>
                          {user?.name}
                        </p>

                        <p className="text-xs capitalize" style={{ color: "#8B8CA0" }}>
                          {user?.role}
                        </p>
                      </div>

                      <ChevronDown size={18} style={{ color: "#8B8CA0" }} />
                    </button>

                    {profileMenu && (
                      <div className="fd-dropdown absolute right-0 mt-3 w-52 rounded-xl overflow-hidden">
                        <Link
                          to={
                            user?.role === "buyer"
                              ? "/buyer/profile"
                              : "/farmer/profile"
                          }
                          onClick={() => setProfileMenu(false)}
                          className="fd-dropdown-item flex items-center gap-2 px-4 py-3"
                          style={{ color: "#1E1B4B" }}
                        >
                          <User size={18} />
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="fd-dropdown-item flex items-center gap-2 px-4 py-3 w-full"
                          style={{ color: "#E11D48" }}
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
              style={{ color: "#4F46E5" }}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}

        {mobileMenu && (
          <div className="fd-mobile-drawer lg:hidden">
            <div className="p-5 flex flex-col gap-5">
              <Link
                className="fd-mobile-link font-medium"
                to={
                  !isAuthenticated
                    ? "/"
                    : user?.role === "buyer"
                      ? "/buyer/dashboard"
                      : "/farmer/dashboard"
                }
                onClick={() => setMobileMenu(false)}
              >
                Home
              </Link>

              {!isAuthenticated && (
                <>
                  <Link
                    to="/products"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/about"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/login"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="fd-btn-primary text-center rounded-xl px-5 py-2 font-medium"
                    onClick={() => setMobileMenu(false)}
                  >
                    Register
                  </Link>
                </>
              )}

              {isAuthenticated && user?.role === "buyer" && (
                <>
                  <NavLink
                    to="/buyer/dashboard"
                    className={({ isActive }) =>
                      isActive ? activeClass : "fd-mobile-link"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <Link
                    to="/products"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Products
                  </Link>
                  <Link
                    to="/orders"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/cart"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Cart
                  </Link>
                  <Link
                    to="/buyer/profile"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left font-medium"
                    style={{ color: "#E11D48" }}
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
                      isActive ? activeClass : "fd-mobile-link"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <Link
                    to="/farmer/products"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    My Products
                  </Link>

                  <Link
                    to="/farmer/products/add"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/farmer/orders"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/farmer/profile"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left font-medium"
                    style={{ color: "#E11D48" }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;