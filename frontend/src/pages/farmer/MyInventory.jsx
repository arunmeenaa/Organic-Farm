import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Package, IndianRupee, Boxes, Trash2, Tractor, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

import { getMyProducts, changeProductStatus } from "../../services/product.service";
import { getMyMachines, deleteMachine } from "../../services/machine.service";

// ── Animated Pill Toggle ──────────────────────────────────────────────────────
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

// ── Reusable Row ──────────────────────────────────────────────────────────────
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

// ── Empty State ───────────────────────────────────────────────────────────────
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
    <Link
      to={link}
      className="inline-flex mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-150"
    >
      {linkLabel}
    </Link>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Inventory = () => {
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
      toast.error(err.response?.data?.message || "Failed to load inventory assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleProductStatus = async (id, currentStatus) => {
    try {
      const targetStatus = currentStatus === "active" ? "inactive" : "active";
      await changeProductStatus(id, { status: targetStatus });
      toast.success("Product operational status modified");
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: targetStatus } : p))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to alter state");
    }
  };

  const handleMachineDelete = async (id) => {
    if (!window.confirm("Are you absolutely sure you want to remove this equipment profile?")) return;
    try {
      await deleteMachine(id);
      toast.success("Machinery decommissioned and deleted successfully");
      setMachines((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to drop machine asset");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-emerald-50 dark:bg-gray-950">
        <p className="text-emerald-700 dark:text-emerald-400 font-semibold text-lg tracking-wide animate-pulse">
          Optimizing Farmer Hub Ecosystem...
        </p>
      </div>
    );
  }

  return (
    <div className="">

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1
              className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Farmer Inventory Hub
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              Manage your commercial harvest goods and rental field equipment concurrently.
            </p>
          </div>

          <Link
            to={activeTab === "products" ? "/farmer/products/add" : "/farmer/machines/add"}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 transition-all duration-150"
          >
            <Plus size={18} />
            Add {activeTab === "products" ? "Product" : "Machine"}
          </Link>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex gap-2  p-1.5 rounded-2xl w-max border border-slate-200/40 dark:border-gray-700/40 mb-8 backdrop-blur-sm">
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

        {/* ── Products Grid ── */}
        {activeTab === "products" && (
          products.length === 0 ? (
            <EmptyState
              icon={<Package size={64} className="mx-auto text-slate-300 dark:text-slate-600" />}
              title="No Fresh Crops Listed"
              desc="Kickstart your regional sales by cataloging your primary organic produce output."
              link="/farmer/products/add"
              linkLabel="Add First Product"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className=" backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-200"
                >
                  <div>
                    <img
                      src={product.images?.[0] || "https://images.unsplash.com/photo-1610348725531-843dff14a9da?w=500"}
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
                          label="Total Stock Available"
                          value={`${product.quantity} units`}
                        />
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-gray-700 pt-3">
                          <span className="font-medium text-slate-600 dark:text-slate-400">
                            Live Visibility Status
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

                  {/* Card Footer */}
                  <div className="p-6 pt-0 flex items-center gap-3">
                    <Link
                      to={`/farmer/products/edit/${product._id}`}
                      className="flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase border border-emerald-500/25 dark:border-emerald-700/40 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
                    >
                      <Pencil size={13} /> Edit
                    </Link>

                    {/* Enhanced Pill Toggle */}
                    <div className="flex flex-col items-center gap-1">
                      <ToggleSwitch
                        active={product.status === "active"}
                        onToggle={() => handleProductStatus(product._id, product.status)}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {product.status === "active" ? "Disable" : "Enable"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* ── Machines Grid ── */}
        {activeTab === "machines" && (
          machines.length === 0 ? (
            <EmptyState
              icon={<Tractor size={64} className="mx-auto text-slate-300 dark:text-slate-600" />}
              title="No Fleet Equipment Listed"
              desc="Generate passive revenue streams by leasing out idle tractors or harvesting rigs."
              link="/farmer/machines/add"
              linkLabel="List Your Machinery"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {machines.map((machine) => (
                <div
                  key={machine._id}
                  className=" backdrop-blur-md border border-white/60 dark:border-gray-700/50 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-200"
                >
                  <div>
                    <img
                      src={machine.images?.[0] || machine.image || "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500"}
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
                        Model Ref: {machine.modelNumber || "Heavy Utility"}
                      </p>

                      <div className="mt-5 space-y-3.5">
                        <Row
                          icon={<IndianRupee size={15} />}
                          label="Rental Rate"
                          value={`₹${machine.pricePerHour || machine.price}/hr`}
                        />
                        <Row
                          icon={<ShieldAlert size={15} />}
                          label="Engine Condition"
                          value={machine.condition || "Excellent"}
                        />
                        <div className="flex justify-between items-center text-sm border-t border-slate-100 dark:border-gray-700 pt-3">
                          <span className="font-medium text-slate-600 dark:text-slate-400">
                            Operational Availability
                          </span>
                          <span
                            className={`font-bold uppercase text-xs tracking-wide ${
                              machine.isAvailable !== false
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-500 dark:text-amber-400"
                            }`}
                          >
                            {machine.isAvailable !== false ? "Ready to Rent" : "On Field / Booked"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 flex gap-3">
                    <Link
                      to={`/farmer/machine/edit/${machine._id}`}
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
          )
        )}

      </div>
    </div>
  );
};

export default Inventory;