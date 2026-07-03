import { useState } from "react";
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
  // Replace with Auth Context
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileMenu(false);
    navigate("/");
  };

  const activeClass =
    "text-green-700 font-semibold border-b-2 border-green-600";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-green-700"
          >
            <Leaf size={32} />
            <span>Organic Farm</span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/"
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
                  to="/my-products"
                  className={({ isActive }) =>
                    isActive ? activeClass : "hover:text-green-700"
                  }
                >
                  My Products
                </NavLink>

                <NavLink
                  to="/add-product"
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
                      {user?.name?.charAt(0)}
                    </div>

                    <span className="font-medium">{user?.name}</span>

                    <ChevronDown size={18} />
                  </button>

                  {profileMenu && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border">
                      <Link
                        to="/profile"
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
            <Link to="/">Home</Link>

            {!isAuthenticated && (
              <>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {isAuthenticated && user?.role === "buyer" && (
              <>
                <Link to="/products">Products</Link>
                <Link to="/orders">My Orders</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/profile">Profile</Link>
              </>
            )}

            {isAuthenticated && user?.role === "farmer" && (
              <>
                <Link to="/my-products">My Products</Link>
                <Link to="/add-product">Add Product</Link>
                <Link to="/farmer/orders">Orders</Link>
                <Link to="/profile">Profile</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
