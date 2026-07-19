import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Package,
  IndianRupee,
  Boxes,
  Trash2,
  Tractor,
  ShieldAlert,
  MapPin,
  ClipboardList,
  CalendarDays,
  Expand,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getMyProducts,
  changeProductStatus,
} from "../../services/product.service";
import { getMyMachines, deleteMachine } from "../../services/machine.service";
import { useAuth } from "../../context/AuthContext";
// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────
const ToggleSwitch = ({ active, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${
      active
        ? "bg-emerald-500 shadow-emerald-400/40"
        : "bg-gray-300 dark:bg-gray-600"
    }`}
    aria-label="Toggle status"
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
        active ? "translate-x-8" : "translate-x-1"
      }`}
    />
  </button>
);

const Row = ({ icon, label, value }) => (
  <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-400">
    <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500">
      {icon} {label}
    </span>
    <span
      className="font-bold text-slate-900 dark:text-white"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {value}
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Status badge
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  open: {
    label: "Open",
    classes:
      "bg-blue-50   text-blue-700   dark:bg-blue-900/40   dark:text-blue-300",
  },
  accepted: {
    label: "Accepted",
    classes:
      "bg-green-50  text-green-700  dark:bg-green-900/40  dark:text-green-300",
  },
  in_progress: {
    label: "In Progress",
    classes:
      "bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  },
  completed: {
    label: "Completed",
    classes:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  cancelled: {
    label: "Cancelled",
    classes:
      "bg-red-50    text-red-700    dark:bg-red-900/40    dark:text-red-300",
  },
};

const StatusBadge = ({ status }) => {
  const key = status?.toLowerCase().replace(" ", "_") ?? "open";
  const cfg = STATUS_CONFIG[key] ?? STATUS_CONFIG.open;
  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Urgency indicator
// ─────────────────────────────────────────────────────────────────────────────

const getUrgency = (dateStr) => {
  if (!dateStr) return null;
  const diffMs =
    new Date(dateStr).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return { dot: "🔴", label: "Needed Today" };
  if (diffDays <= 2)
    return {
      dot: "🟠",
      label: `${diffDays} Day${diffDays > 1 ? "s" : ""} Left`,
    };
  if (diffDays <= 5) return { dot: "🟡", label: `${diffDays} Days Left` };
  return { dot: "🟢", label: `${diffDays} Days Left` };
};

const EmptyState = ({ icon, title, desc, link, linkLabel }) => (
  <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-dashed border-slate-300 dark:border-gray-700 rounded-3xl p-16 text-center max-w-xl mx-auto shadow-sm">
    {icon}
    <h2
      className="text-2xl font-bold mt-5 text-slate-800 dark:text-white"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {title}
    </h2>
    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
    {link && (
      <Link
        to={link}
        className="inline-flex mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-150"
      >
        {linkLabel}
      </Link>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

const Inventory = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [machines, setMachines] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productRes, machineRes] = await Promise.all([
        getMyProducts(),
        getMyMachines(),
      ]);

      setProducts(productRes?.data?.products || []);
      setMachines(machineRes?.data?.machines || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Product handlers ───────────────────────────────────────────────────────

  const handleProductStatus = async (id, currentStatus) => {
    const targetStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await changeProductStatus(id, { status: targetStatus });
      toast.success("Product status updated");
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: targetStatus } : p)),
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update product status",
      );
    }
  };

  // ── Machine handlers ───────────────────────────────────────────────────────

  const handleMachineDelete = async (id) => {
    if (!window.confirm("Remove this machinery listing permanently?")) return;
    try {
      await deleteMachine(id);
      toast.success("Machinery removed successfully");
      setMachines((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete machinery");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Loading screen
  // ─────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-lg tracking-wide animate-pulse">
          Loading your dashboard…
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Tab config
  // ─────────────────────────────────────────────────────────────────────────

  const ADD_CONFIG = {
    products: { label: "Add Product", to: "/seller/products/add" },
    machines: { label: "Add Machine", to: "/seller/machines/add" },
  };

  const currentAdd = ADD_CONFIG[activeTab];

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div className=" pb-10 max-w-7xl mx-auto px-6">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1
              className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Seller Inventory
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              Manage products,and machinery
            </p>
          </div>

          {currentAdd.label && (
            <Link
              to={currentAdd.to}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 transition-all duration-150"
            >
              <Plus size={18} />
              {currentAdd.label}
            </Link>
          )}
        </div>

        {/* ── Tab switcher ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl w-max border border-slate-200/40 dark:border-gray-700/40 mb-8 backdrop-blur-sm bg-slate-100/50 dark:bg-white/5">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === "products"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            📦 My Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("machines")}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === "machines"
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🚜 My Machinery ({machines.length})
          </button>
        </div>

        {/* ── Products tab ─────────────────────────────────────────────────── */}
        {activeTab === "products" &&
          (products.length === 0 ? (
            <EmptyState
              icon={
                <Package
                  size={64}
                  className="mx-auto text-slate-300 dark:text-slate-600"
                />
              }
              title="No Products Listed"
              desc="Kickstart your regional sales by cataloging your primary organic produce output."
              link="/seller/products/add"
              linkLabel="Add First Product"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-200"
                >
                  <div>
                    <img
                      src={
                        product.images?.[0] ||
                        "https://images.unsplash.com/photo-1610348725531-843dff14a9da?w=500"
                      }
                      alt={product.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-6">
                      <h2
                        className="text-xl font-bold text-slate-900 dark:text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {product.name}
                      </h2>
                      <span className="inline-block mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/40 px-2.5 py-1 rounded-md capitalize">
                        {product.category}
                      </span>
                      <div className="mt-5 space-y-3.5">
                        <Row
                          icon={<IndianRupee size={15} />}
                          label="Retail Price"
                          value={`₹${product.price} / ${product.unit}`}
                        />
                        <Row
                          icon={<Boxes size={15} />}
                          label="Stock Available"
                          value={`${product.quantity} units`}
                        />
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-gray-700 pt-3">
                          <span className="font-medium text-slate-600 dark:text-slate-400">
                            Visibility Status
                          </span>
                          <span
                            className={`font-bold uppercase text-xs tracking-wide ${
                              product.status === "active"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-500 dark:text-amber-400"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <Link
                      to={`/seller/products/edit/${product._id}`}
                      className="flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase border border-emerald-500/25 dark:border-emerald-700/40 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
                    >
                      <Pencil size={13} /> Edit
                    </Link>
                    <div className="flex flex-col items-center gap-1">
                      <ToggleSwitch
                        active={product.status === "active"}
                        onToggle={() =>
                          handleProductStatus(product._id, product.status)
                        }
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {product.status === "active" ? "Disable" : "Enable"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* ── Machines tab ─────────────────────────────────────────────────── */}
        {activeTab === "machines" &&
          (machines.length === 0 ? (
            <EmptyState
              icon={
                <Tractor
                  size={64}
                  className="mx-auto text-slate-300 dark:text-slate-600"
                />
              }
              title="No Machinery Listed"
              desc="Generate passive revenue by leasing out idle tractors or harvesting rigs."
              link="/seller/machines/add"
              linkLabel="List Your Machinery"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {machines.map((machine) => (
                <div
                  key={machine._id}
                  className="backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-200"
                >
                  <div>
                    <img
                      src={
                        machine.images?.[0] ||
                        machine.image ||
                        "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500"
                      }
                      alt={machine.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-6">
                      <h2
                        className="text-xl font-bold text-slate-900 dark:text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {machine.name}
                      </h2>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                        Model: {machine.modelNumber || "Heavy Utility"}
                      </p>
                      <div className="mt-5 space-y-3.5">
                        <Row
                          icon={<IndianRupee size={15} />}
                          label="Rental Rate"
                          value={`₹${machine.pricePerHour || machine.price}/hr`}
                        />
                        <Row
                          icon={<ShieldAlert size={15} />}
                          label="Condition"
                          value={machine.condition || "Excellent"}
                        />
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-gray-700 pt-3">
                          <span className="font-medium text-slate-600 dark:text-slate-400">
                            Availability
                          </span>
                          <span
                            className={`font-bold uppercase text-xs tracking-wide ${
                              machine.isAvailable !== false
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-500 dark:text-amber-400"
                            }`}
                          >
                            {machine.isAvailable !== false
                              ? "Ready to Rent"
                              : "Booked"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex gap-3">
                    <Link
                      to={`/seller/machine/edit/${machine._id}`}
                      className="flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase border border-emerald-500/25 dark:border-emerald-700/40 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
                    >
                      <Pencil size={13} /> Edit
                    </Link>
                    <button
                      onClick={() => handleMachineDelete(machine._id)}
                      className="flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase border border-red-300/40 dark:border-red-800/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Inventory;
