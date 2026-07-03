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

// Shared design tokens with the dashboard: forest green + harvest marigold
// on warm parchment, Fraunces for the wordmark, Inter for UI text.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-nav { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-wordmark { font-family: 'Fraunces', Georgia, serif; }

    .fd-header {
      background: rgba(246, 244, 236, 0.85);
      border-bottom: 1px solid #E7E2D2;
    }

    .fd-link {
      position: relative;
      color: #4A5147;
      transition: color 0.15s ease;
    }
    .fd-link:hover { color: #1E3527; }
    .fd-link::after {
      content: "";
      position: absolute;
      left: 0;
      right: 100%;
      bottom: -6px;
      height: 2px;
      background: #E7A83C;
      transition: right 0.2s ease;
    }
    .fd-link:hover::after { right: 0; }

    .fd-link-active {
      color: #1E3527;
      font-weight: 600;
    }
    .fd-link-active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px;
      height: 2px;
      background: #1E3527;
    }

    .fd-search {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-search:focus-within {
      border-color: #1E3527;
      box-shadow: 0 0 0 3px rgba(30, 53, 39, 0.08);
    }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; }
    .fd-btn-primary:active { transform: scale(0.97); }

    .fd-avatar {
      background: #1E3527;
      color: #F6F4EC;
    }

    .fd-cart-badge {
      background: #E7A83C;
      color: #1E3527;
    }

    .fd-dropdown {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      box-shadow: 0 16px 32px -18px rgba(30, 53, 39, 0.35);
    }
    .fd-dropdown-item {
      transition: background 0.15s ease;
    }
    .fd-dropdown-item:hover { background: #F6F4EC; }

    .fd-mobile-drawer {
      background: #FFFFFF;
      border-top: 1px solid #E7E2D2;
    }
    .fd-mobile-link {
      color: #23281F;
      transition: color 0.15s ease;
    }
    .fd-mobile-link:hover { color: #1E3527; }
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
      <header className="fd-nav sticky top-0 z-50 backdrop-blur-lg fd-header">
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
              className="fd-wordmark flex items-center gap-2 text-2xl font-semibold"
              style={{ color: "#1E3527" }}
            >
              <Leaf size={30} style={{ color: "#E7A83C" }} />
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
              <Search size={18} style={{ color: "#8A8578" }} />

              <input
                type="text"
                placeholder="Search organic products..."
                className="bg-transparent outline-none w-full px-3 text-sm"
              />
            </div>

            {/* Right Side */}

            <div className="hidden lg:flex items-center gap-5">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="font-medium"
                    style={{ color: "#1E3527" }}
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
                    <Link to="/cart" className="relative" style={{ color: "#1E3527" }}>
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
                      <div className="fd-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase">
                        {user?.name?.trim()?.charAt(0).toUpperCase()}
                      </div>

                      <div className="text-left">
                        <p className="font-medium text-sm" style={{ color: "#23281F" }}>
                          {user?.name}
                        </p>

                        <p className="text-xs capitalize" style={{ color: "#8A8578" }}>
                          {user?.role}
                        </p>
                      </div>

                      <ChevronDown size={18} style={{ color: "#8A8578" }} />
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
                          style={{ color: "#23281F" }}
                        >
                          <User size={18} />
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="fd-dropdown-item flex items-center gap-2 px-4 py-3 w-full"
                          style={{ color: "#B5502E" }}
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
              style={{ color: "#1E3527" }}
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
                    style={{ color: "#B5502E" }}
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
                    style={{ color: "#B5502E" }}
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