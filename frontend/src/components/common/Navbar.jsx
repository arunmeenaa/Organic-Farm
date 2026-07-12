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
  Bell,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import NotificationDropdown from "../notification/NotificationDropdown";

// Same glassmorphic approach as Hero, on the emerald → lime gradient system.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-nav { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-wordmark { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-wordmark-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .fd-header {
      background: rgba(244, 249, 242, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(5, 150, 105, 0.14);
    }

    .fd-link {
      position: relative;
      color: #4B6357;
      transition: color 0.15s ease;
    }
    .fd-link:hover { color: #0F2E22; }
    .fd-link::after {
      content: "";
      position: absolute;
      left: 0;
      right: 100%;
      bottom: -6px;
      height: 2px;
      background: linear-gradient(90deg, #059669, #84CC16);
      transition: right 0.2s ease;
      border-radius: 2px;
    }
    .fd-link:hover::after { right: 0; }

    .fd-link-active {
      color: #0F2E22;
      font-weight: 600;
    }
    .fd-link-active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px;
      height: 2px;
      background: linear-gradient(90deg, #059669, #84CC16);
      border-radius: 2px;
    }

    .fd-search {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-search:focus-within {
      border-color: #059669;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.12);
    }

    .fd-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
    .fd-btn-primary:active { transform: translateY(0); }

    .fd-avatar {
      background: conic-gradient(from 180deg, #059669, #84CC16, #F59E0B, #059669);
      padding: 2px;
    }
    .fd-avatar-inner {
      background: linear-gradient(135deg, #059669, #047857);
      color: white;
    }

    .fd-cart-badge {
      background: #F59E0B;
      color: #0F2E22;
    }

    .fd-notif-btn {
      color: #0F2E22;
      transition: color 0.15s ease;
    }
    .fd-notif-btn:hover { color: #059669; }

    .fd-notif-badge {
      background: #E11D48;
      color: #FFFFFF;
    }

    .fd-dropdown {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }
    .fd-dropdown-item {
      transition: background 0.15s ease;
    }
    .fd-dropdown-item:hover { background: rgba(5, 150, 105, 0.08); }

    .fd-mobile-drawer {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid rgba(5, 150, 105, 0.14);
    }
    .fd-mobile-link {
      color: #0F2E22;
      transition: color 0.15s ease;
    }
    .fd-mobile-link:hover { color: #059669; }

    .fd-mobile-notif-row {
      color: #0F2E22;
      border: 1px solid rgba(5, 150, 105, 0.14);
      background: rgba(5, 150, 105, 0.05);
      transition: background 0.15s ease;
    }
    .fd-mobile-notif-row:hover { background: rgba(5, 150, 105, 0.1); }
  `}</style>
);

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);
  const [mobileNotificationMenu, setMobileNotificationMenu] = useState(false);

  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const navigate = useNavigate();

  const homeLink = !isAuthenticated
    ? "/"
    : user?.role === "buyer"
      ? "/buyer/dashboard"
      : "/farmer/dashboard";

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

  const notifBadgeLabel = unreadCount > 9 ? "9+" : unreadCount;

  return (
    <>
      <FontImport />
      <header className="fd-nav sticky top-0 z-50 fd-header">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              to={homeLink}
              className="fd-wordmark fd-wordmark-gradient flex items-center gap-2 text-2xl font-bold"
            >
              <Leaf size={30} style={{ color: "#84CC16" }} />
              <span>GreenHarvest</span>
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden lg:flex items-center gap-8">
              <NavLink
                to={homeLink}
                className={({ isActive }) =>
                  isActive ? activeClass : linkClass
                }
              >
                Home
              </NavLink>

              {(!isAuthenticated || user?.role === "buyer") && (
                <NavLink
                  to="/market-place"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  Market Place
                </NavLink>
              )}

              {isAuthenticated && user?.role === "buyer" && (
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? activeClass : linkClass
                  }
                >
                  My Orders
                </NavLink>
              )}

              {isAuthenticated && user?.role === "farmer" && (
                <>
                  <NavLink
                    to="/farmer/inventory"
                    className={({ isActive }) =>
                      isActive ? activeClass : linkClass
                    }
                  >
                    My Inventory
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
                to="/ai"
                className={({ isActive }) =>
                  isActive ? activeClass : linkClass
                }
              >
                Ai Assistant
              </NavLink>
            </nav>

            

            <div className="hidden lg:flex items-center gap-5">
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="font-medium"
                    style={{ color: "#059669" }}
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
                  <div className="relative">
                    <button
                      onClick={() => setNotificationMenu(!notificationMenu)}
                      className="fd-notif-btn relative"
                      aria-label="Notifications"
                    >
                      <Bell size={22} />

                      {unreadCount > 0 && (
                        <span className="fd-notif-badge absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                          {notifBadgeLabel}
                        </span>
                      )}
                    </button>

                    {notificationMenu && (
                      <NotificationDropdown
                        onClose={() => setNotificationMenu(false)}
                      />
                    )}
                  </div>

                  {user?.role === "buyer" && (
                    <Link
                      to="/cart"
                      className="relative"
                      style={{ color: "#0F2E22" }}
                    >
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
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#0F2E22" }}
                        >
                          {user?.name}
                        </p>

                        <p
                          className="text-xs capitalize"
                          style={{ color: "#7A8D82" }}
                        >
                          {user?.role}
                        </p>
                      </div>

                      <ChevronDown size={18} style={{ color: "#7A8D82" }} />
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
                          style={{ color: "#0F2E22" }}
                        >
                          <User size={18} />
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="fd-dropdown-item flex items-center gap-2 px-4 py-3 w-full"
                          style={{ color: "#DC2626" }}
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

            <div className="flex items-center gap-4 lg:hidden">
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setNotificationMenu(!notificationMenu)}
                    className="fd-notif-btn relative"
                    aria-label="Notifications"
                  >
                    <Bell size={24} />

                    {unreadCount > 0 && (
                      <span className="fd-notif-badge absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                        {notifBadgeLabel}
                      </span>
                    )}
                  </button>

                  {notificationMenu && (
                    <NotificationDropdown
                      onClose={() => setNotificationMenu(false)}
                    />
                  )}
                </div>
              )}

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                style={{ color: "#059669" }}
              >
                {mobileMenu ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenu && (
          <div className="fd-mobile-drawer lg:hidden">
            <div className="p-5 flex flex-col gap-5">
              <Link
                className="fd-mobile-link font-medium"
                to={homeLink}
                onClick={() => setMobileMenu(false)}
              >
                Home
              </Link>

              {(!isAuthenticated || user?.role === "buyer") && (
                <Link
                  to="/market-place"
                  className="fd-mobile-link"
                  onClick={() => setMobileMenu(false)}
                >
                  Market Place
                </Link>
              )}

              {!isAuthenticated && (
                <>
                  <Link
                    to="/ai"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                   Ai Assistant
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
                  <Link
                    to="/ai"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    Ai Assistant
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left font-medium"
                    style={{ color: "#DC2626" }}
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
                    to="/farmer/inventory"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    My Inventory
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
                  <Link
                    to="/about"
                    className="fd-mobile-link"
                    onClick={() => setMobileMenu(false)}
                  >
                    About
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left font-medium"
                    style={{ color: "#DC2626" }}
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
