import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Package, IndianRupee, Boxes, ToggleLeft, ToggleRight, Trash2, Tractor, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

import { getMyProducts, changeProductStatus } from "../../services/product.service";
import { getMyMachines, deleteMachine } from "../../services/machine.service";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .dashboard-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .dash-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .dash-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .dash-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .dash-action-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: white;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .dash-action-btn:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }

    .dash-glass-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .dash-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .dash-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }

    .dash-row-icon { color: #065F46; }
    .dash-status-active { color: #059669; }
    .dash-status-inactive { color: #D97706; }

    .dash-edit-btn {
      border: 1px solid rgba(5, 150, 105, 0.25);
      color: #065F46;
      transition: all 0.15s ease;
    }
    .dash-edit-btn:hover { background: rgba(5, 150, 105, 0.08); border-color: rgba(5, 150, 105, 0.4); }

    .dash-delete-btn {
      border: 1px solid rgba(220, 38, 38, 0.2);
      color: #DC2626;
      transition: all 0.15s ease;
    }
    .dash-delete-btn:hover { background: rgba(220, 38, 38, 0.08); border-color: rgba(220, 38, 38, 0.4); }

    .dash-toggle-btn {
      transition: transform 0.15s ease;
    }
    .dash-toggle-btn:hover { transform: translateY(-1px); }
  `}</style>
);

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'machines'
  const [products, setProducts] = useState([]);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productRes, machineRes] = await Promise.all([
        getMyProducts(),
        getMyMachines()
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
      
      setProducts(prev => 
        prev.map(p => p._id === id ? { ...p, status: targetStatus } : p)
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
      setMachines(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to drop machine asset");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-root min-h-screen flex justify-center items-center text-emerald-800 font-semibold text-lg tracking-wide animate-pulse">
        <FontImport />
        Optimizing Farmer Hub Ecosystem...
      </div>
    );
  }

  return (
    <div className="dashboard-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dynamic Context Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="dash-display dash-title-gradient text-4xl font-extrabold tracking-tight">
              Farmer Inventory Hub
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Manage your commercial harvest goods and rental field equipment concurrently.
            </p>
          </div>

          <Link
            to={activeTab === "products" ? "/farmer/products/add" : "/farmer/machines/add"}
            className="dash-action-btn px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm"
          >
            <Plus size={18} />
            Add {activeTab === "products" ? "Product" : "Machine"}
          </Link>
        </div>

        {/* Global Component Tab Control Slider */}
        <div className="flex gap-3 bg-slate-200/50 p-1.5 rounded-2xl w-max border border-slate-200/30 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === "products"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📦 My Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("machines")}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === "machines"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🚜 My Machinery ({machines.length})
          </button>
        </div>

        {/* Dynamic Products Grid Layer */}
        {activeTab === "products" && (
          products.length === 0 ? (
            <div className="dash-glass-panel rounded-3xl p-16 text-center border border-dashed border-slate-300 max-w-xl mx-auto shadow-sm">
              <Package size={64} className="mx-auto text-slate-300" />
              <h2 className="dash-display text-2xl font-bold mt-5 text-slate-800">No Fresh Crops Listed</h2>
              <p className="mt-2 text-sm text-slate-500">Kickstart your regional sales by cataloging your primary organic produce output.</p>
              <Link to="/farmer/products/add" className="dash-action-btn inline-flex mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase">Add First Product</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product._id} className="dash-card rounded-3xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={product.images?.[0] || "https://images.unsplash.com/photo-1610348725531-843dff14a9da?w=500"} alt={product.name} className="h-56 w-full object-cover" />
                    <div className="p-6">
                      <h2 className="dash-display text-2xl font-bold text-slate-900">{product.name}</h2>
                      <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 w-max px-2.5 py-1 rounded-md mt-2 capitalize">{product.category}</p>
                      
                      <div className="mt-5 space-y-3.5">
                        <div className="flex justify-between text-sm font-medium text-slate-600">
                          <span className="dash-row-icon flex items-center gap-2"><IndianRupee size={16} /> Retail Price</span>
                          <span className="dash-mono font-bold text-slate-900">₹{product.price} / {product.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-slate-600">
                          <span className="dash-row-icon flex items-center gap-2"><Boxes size={16} /> Total Stock Available</span>
                          <span className="dash-mono font-bold text-slate-900">{product.quantity} units</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-slate-600 border-t border-slate-100 pt-3">
                          <span>Live Visibility Status</span>
                          <span className={`font-bold uppercase text-xs tracking-wide ${product.status === "active" ? "dash-status-active" : "dash-status-inactive"}`}>{product.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex gap-3">
                    <Link to={`/farmer/products/edit/${product._id}`} className="dash-edit-btn flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase shadow-sm">
                      <Pencil size={14} /> Edit
                    </Link>
                    <button
                      onClick={() => handleProductStatus(product._id, product.status)}
                      className={`dash-toggle-btn flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase text-white shadow-sm ${
                        product.status === "active" ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {product.status === "active" ? <><ToggleLeft size={16} /> Disable</> : <><ToggleRight size={16} /> Active</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Dynamic Machinery Grid Layer */}
        {activeTab === "machines" && (
          machines.length === 0 ? (
            <div className="dash-glass-panel rounded-3xl p-16 text-center border border-dashed border-slate-300 max-w-xl mx-auto shadow-sm">
              <Tractor size={64} className="mx-auto text-slate-300" />
              <h2 className="dash-display text-2xl font-bold mt-5 text-slate-800">No Fleet Equipment Listed</h2>
              <p className="mt-2 text-sm text-slate-500">Generate passive revenue streams by leasing out idle tractors or harvesting rigs.</p>
              <Link to="/farmer/machines/add" className="dash-action-btn inline-flex mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase">List Your Machinery</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {machines.map((machine) => (
                <div key={machine._id} className="dash-card rounded-3xl overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={machine.images?.[0] || machine.image || "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500"} alt={machine.name} className="h-56 w-full object-cover" />
                    <div className="p-6">
                      <h2 className="dash-display text-2xl font-bold text-slate-900">{machine.name}</h2>
                      <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Model Ref: {machine.modelNumber || "Heavy Utility"}</p>
                      
                      <div className="mt-5 space-y-3.5">
                        <div className="flex justify-between text-sm font-medium text-slate-600">
                          <span className="dash-row-icon flex items-center gap-2"><IndianRupee size={16} /> Rental Rate</span>
                          <span className="dash-mono font-bold text-slate-900">₹{machine.pricePerHour || machine.price}/hr</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-slate-600">
                          <span className="dash-row-icon flex items-center gap-2"><ShieldAlert size={16} /> Engine Condition</span>
                          <span className="font-semibold text-slate-800">{machine.condition || "Excellent"}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-slate-600 border-t border-slate-100 pt-3">
                          <span>Operational Availability</span>
                          <span className={`font-bold uppercase text-xs tracking-wide ${machine.isAvailable !== false ? "dash-status-active" : "dash-status-inactive"}`}>
                            {machine.isAvailable !== false ? "Ready to Rent" : "On Field / Booked"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex gap-3">
                    <Link to={`/farmer/machine/edit/${machine._id}`} className="dash-edit-btn flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase shadow-sm">
                      <Pencil size={14} /> Edit
                    </Link>
                    <button
                      onClick={() => handleMachineDelete(machine._id)}
                      className="dash-delete-btn flex-1 rounded-xl py-3 flex justify-center items-center gap-1.5 font-bold text-xs tracking-wide uppercase shadow-sm"
                    >
                      <Trash2 size={14} /> Delete
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