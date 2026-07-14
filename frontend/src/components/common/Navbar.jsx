import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Leaf,
  ChevronDown,
  LogOut,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import NotificationDropdown from "../notification/NotificationDropdown";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);

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
      if (window.innerWidth >= 1024) setMobileMenu(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const notifBadgeLabel = unreadCount > 9 ? "9+" : unreadCount;

  // ── Nav underline classes ───────────────────────────────────────────────────
  // Active state uses a bottom border (underline). The border is always
  // reserved (border-b-2 border-transparent) so layout never shifts on toggle.
  // Only color and border-color are transitioned — both are cheap/compositable.
  const navLinkClass = ({ isActive }) =>
    [
      "font-['Inter'] px-3 pt-1.5 pb-1 border-b-2",
      "transition-[color,border-color] duration-150",
      isActive
        ? "font-semibold text-emerald-700 border-emerald-600 dark:text-emerald-300 dark:border-emerald-400"
        : "text-[#4B6357] border-transparent hover:text-emerald-700 hover:border-emerald-300/60 dark:text-emerald-100/70 dark:hover:text-emerald-200 dark:hover:border-emerald-500/40",
    ].join(" ");

  // Mobile variant — left border works better in a vertical list
  const mobileNavLinkClass = ({ isActive }) =>
    [
      "font-['Inter'] px-4 py-2.5 border-l-2",
      "transition-[color,border-color,background-color] duration-150",
      isActive
        ? "font-semibold text-emerald-700 border-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:border-emerald-400 dark:bg-emerald-400/10"
        : "text-[#0F2E22] border-transparent hover:text-emerald-600 hover:border-emerald-300 dark:text-emerald-100 dark:hover:text-emerald-300 dark:hover:border-emerald-600/40",
    ].join(" ");
  // ───────────────────────────────────────────────────────────────────────────

  const themeToggleBtn = (
    <button
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-11 h-11 rounded-[10px]
        text-[#4B6357] bg-emerald-600/10 border border-emerald-600/15
        hover:bg-emerald-600/15 hover:text-emerald-800 hover:rotate-[15deg]
        dark:text-emerald-300 dark:bg-emerald-400/10 dark:border-emerald-400/20
        dark:hover:bg-emerald-400/15 dark:hover:text-emerald-100
        transition-all duration-200"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );

  return (
    <>
      <header className={`font-['Inter']${darkMode ? " dark" : ""}`}>
        <div
          className="
            max-w-7xl mx-auto px-4 rounded-3xl
            bg-white/[0.58] backdrop-blur-2xl border border-white/55
            shadow-[0_12px_40px_rgba(22,163,74,0.08)]
            dark:bg-[#0a140e]/62 dark:border-white/10 dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
            transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-16 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link
                to={homeLink}
                className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl font-bold"
              >
                <Leaf className="h-8 w-8 text-green-500" />
                <span
                  className="text-3xl font-black tracking-tight bg-clip-text text-transparent
                    bg-gradient-to-r from-emerald-700 via-green-500 to-lime-400
                    dark:from-emerald-400 dark:via-green-400 dark:to-lime-300"
                >
                  GreenHarvest
                </span>
              </Link>

              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-2">
                <NavLink to={homeLink} className={navLinkClass}>
                  Home
                </NavLink>

                {(!isAuthenticated || user?.role === "buyer") && (
                  <NavLink to="/market-place" className={navLinkClass}>
                    Market Place
                  </NavLink>
                )}

                {isAuthenticated && user?.role === "buyer" && (
                  <NavLink to="/orders" className={navLinkClass}>
                    My Orders
                  </NavLink>
                )}

                {isAuthenticated && user?.role === "farmer" && (
                  <>
                    <NavLink to="/farmer/inventory" className={navLinkClass}>
                      My Inventory
                    </NavLink>
                    <NavLink to="/farmer/orders" className={navLinkClass}>
                      Orders
                    </NavLink>
                  </>
                )}

              </nav>

              {/* Desktop right actions */}
              <div className="hidden lg:flex items-center gap-4">
                {themeToggleBtn}

                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-5 py-2 rounded-xl font-medium text-[#063527]
                        bg-gradient-to-r from-emerald-600 to-lime-400
                        shadow-[0_10px_22px_-10px_rgba(5,150,105,0.45)]
                        hover:-translate-y-px hover:shadow-[0_14px_26px_-10px_rgba(5,150,105,0.55)]
                        active:translate-y-0 transition-all"
                    >
                      Register
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <>
                    {/* Notifications */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
  e.stopPropagation();
  setNotificationMenu((prev) => !prev);
}}
                        aria-label="Notifications"
                        className="relative text-[#0F2E22] hover:text-emerald-600 dark:text-emerald-100/75 dark:hover:text-emerald-300 transition-colors"
                      >
                        <div
                          className="w-[46px] h-[46px] rounded-2xl flex items-center justify-center
                            bg-white/55 backdrop-blur-lg
                            dark:bg-white/[0.06]
                            hover:-translate-y-[3px] transition-all duration-300"
                        >
                          <Bell size={22} />
                        </div>

                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold bg-rose-600 text-white">
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

                    {/* Cart (buyer only) */}
                    {user?.role === "buyer" && (
                      <Link
                        to="/cart"
                        className="relative flex h-11 w-11 items-center justify-center rounded-2xl
                          bg-white/55 backdrop-blur-xl border border-white/20
                          dark:bg-white/5"
                      >
                        <ShoppingCart size={24} />
                        {totalItems > 0 && (
                          <span className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold bg-amber-500 text-[#0F2E22]">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                    )}

                    {/* Profile dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setProfileMenu(!profileMenu)}
                        className="flex items-center gap-3 rounded-full px-3 py-2 hover:bg-white/10 transition"
                      >
                        <div className="w-10 h-10 rounded-full p-0.5 bg-linear-to-br from-green-700 to-lime-500">
                          <div className="w-full h-full rounded-full flex items-center justify-center font-bold uppercase text-sm text-white bg-gradient-to-br from-emerald-600 to-emerald-800">
                            {user?.name?.trim()?.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sm text-[#0F2E22] dark:text-emerald-100">
                            {user?.name}
                          </p>
                          <p className="text-[11px] capitalize text-[#7A8D82] dark:text-emerald-100/60">
                            {user?.role}
                          </p>
                        </div>
                        <ChevronDown
                          size={18}
                          className="text-[#7A8D82] dark:text-emerald-100/55"
                        />
                      </button>

                      {profileMenu && (
                        <div
                          className="absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden
                            bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-18px_rgba(6,95,70,0.30)]
                            dark:bg-[#0a1810]/95 dark:border-emerald-400/15 dark:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)]"
                        >
                          <Link
                            to="/profile"
                            onClick={() => setProfileMenu(false)}
                            className="flex items-center gap-2 px-4 py-3 text-[#0F2E22] hover:bg-emerald-600/10
                              dark:text-emerald-100 dark:hover:bg-emerald-400/10"
                          >
                            <User size={18} /> Profile
                          </Link>

                          <div className="border-t border-emerald-600/10 dark:border-emerald-400/10" />

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-3 w-full text-left
                              text-rose-600 hover:bg-emerald-600/10
                              dark:text-red-300 dark:hover:bg-emerald-400/10"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile right: theme toggle + notifications + hamburger */}
              <div className="flex items-center gap-3 lg:hidden">
                {themeToggleBtn}

                {isAuthenticated && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
  e.stopPropagation();
  setNotificationMenu((prev) => !prev);
}}
                      aria-label="Notifications"
                      className="relative text-[#0F2E22] dark:text-emerald-100/75"
                    >
                      <Bell size={24} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold bg-rose-600 text-white">
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
                  className="text-emerald-600 dark:text-emerald-400"
                >
                  {mobileMenu ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile drawer */}
          {mobileMenu && (
            <div
              className="lg:hidden border-t border-emerald-600/10 dark:border-emerald-400/10
                bg-white/95 backdrop-blur-xl dark:bg-[#07120d]/97 transition-colors duration-300"
            >
              <div className="p-5 flex flex-col gap-2">
                <NavLink
                  to={homeLink}
                  className={mobileNavLinkClass}
                  onClick={() => setMobileMenu(false)}
                >
                  Home
                </NavLink>

                {(!isAuthenticated || user?.role === "buyer") && (
                  <NavLink
                    to="/market-place"
                    className={mobileNavLinkClass}
                    onClick={() => setMobileMenu(false)}
                  >
                    Market Place
                  </NavLink>
                )}

                {!isAuthenticated && (
                  <>
                    <NavLink
                      to="/login"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Login
                    </NavLink>
                    <Link
                      to="/register"
                      className="text-center rounded-xl px-5 py-2 font-medium text-[#063527]
                        bg-gradient-to-r from-emerald-600 to-lime-400"
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
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      My Orders
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Cart
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-left font-medium px-3 py-2 text-rose-600 dark:text-red-300"
                    >
                      Logout
                    </button>
                  </>
                )}

                {isAuthenticated && user?.role === "farmer" && (
                  <>
                    <NavLink
                      to="/farmer/dashboard"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/farmer/inventory"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      My Inventory
                    </NavLink>
                    <NavLink
                      to="/farmer/orders"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Orders
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className={mobileNavLinkClass}
                      onClick={() => setMobileMenu(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-left font-medium px-3 py-2 text-rose-600 dark:text-red-300"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
