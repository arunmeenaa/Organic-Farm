import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProducts } from "../../services/product.service";
import { getMachines } from "../../services/machine.service";
import ProductCard from "../../components/product/ProductCard";
import MachineCard from "../../components/machine/MachineCard";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .mkt-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .mkt-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .mkt-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .mkt-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .mkt-filter-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .mkt-input {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid #DCEBDD;
      color: #0F2E22;
      transition: all 0.15s ease;
    }
    .mkt-input:focus {
      outline: none;
      border-color: #059669;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
    }

    .mkt-empty-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .mkt-skel-card {
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    .mkt-skel {
      background: linear-gradient(90deg, #E3EFE4 25%, #F4F9F2 37%, #E3EFE4 63%);
      background-size: 400% 100%;
      animation: mkt-shimmer 1.4s ease infinite;
      border-radius: 12px;
    }
    @keyframes mkt-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }

    .mkt-page-btn {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid #DCEBDD;
      color: #065F46;
      transition: all 0.15s ease;
    }
    .mkt-page-btn:hover:not(:disabled) {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: white;
      border-color: transparent;
    }
  `}</style>
);

const machineCategories = [
  "All",
  "Tractor",
  "Harvester",
  "Rotavator",
  "Cultivator",
  "Seeder",
  "Sprayer",
  "Drone",
];
const productCategories = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Spices",
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'machines'
  const [loading, setLoading] = useState(true);

  // Products Data Layer State
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [debouncedProductSearch, setDebouncedProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [productPage, setProductPage] = useState(1);
  const [productPagination, setProductPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });

  // Machinery Data Layer State
  const [machines, setMachines] = useState([]);
  const [machineSearch, setMachineSearch] = useState("");
  const [machineCategory, setMachineCategory] = useState("All");
  const [rentalType, setRentalType] = useState("all");

  // Debounce Product Search Streams
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedProductSearch(productSearch);
      setProductPage(1);
    }, 450);
    return () => clearTimeout(timer);
  }, [productSearch]);

  // Master Data Query Dispatches
  const fetchMarketplaceContent = async () => {
    try {
      setLoading(true);
      if (activeTab === "products") {
        const { data } = await getProducts({
          search: debouncedProductSearch,
          category: productCategory === "All" ? "" : productCategory,
          minPrice,
          maxPrice,
          page: productPage,
          limit: 12,
        });
        setProducts(data.products || []);
        setProductPagination({
          currentPage: data.currentPage || 1,
          totalPages: data.totalPages || 1,
          totalProducts: data.totalProducts || 0,
        });
      } else {
        const { data } = await getMachines();
        setMachines(data.machines || []);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          `Failed to gather dynamic ${activeTab} data`,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceContent();
  }, [
    activeTab,
    debouncedProductSearch,
    productCategory,
    minPrice,
    maxPrice,
    productPage,
  ]);

  // Machinery In-Memory Filter Pipelines
  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      const matchSearch = m.name
        ?.toLowerCase()
        .includes(machineSearch.toLowerCase());
      const matchCategory =
        machineCategory === "All" || m.category === machineCategory;
      const matchRental = rentalType === "all" || m.rentalType === rentalType;
      return matchSearch && matchCategory && matchRental;
    });
  }, [machines, machineSearch, machineCategory, rentalType]);

  return (
    <div className="mkt-root min-h-screen pb-16">
      <FontImport />

      {/* Dynamic Main Stage Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/50 pb-6 mb-8 gap-4">
          <div>
            <h1 className="mkt-display mkt-title-gradient text-4xl font-extrabold tracking-tight">
              {activeTab === "products"
                ? "Fresh Organic Marketplace"
                : "Agricultural Equipment Hub"}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {activeTab === "products"
                ? `Discover ${productPagination.totalProducts} completely natural organic crop batches direct from farms.`
                : `Explore ${filteredMachines.length} machinery listings ready for immediate operations deployment.`}
            </p>
          </div>

          {/* Active Navigation Workspace Swappers */}
          <div className="flex gap-2.5 bg-slate-200/50 p-1.5 rounded-2xl w-max border border-slate-200/30">
            <button
              onClick={() => {
                setActiveTab("products");
                setMachineSearch("");
              }}
              className={`px-5 py-2 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "products"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🌱 Crops & Produce
            </button>
            <button
              onClick={() => {
                setActiveTab("machines");
                setProductSearch("");
              }}
              className={`px-5 py-2 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "machines"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🚜 Farm Machinery
            </button>
          </div>
        </div>

        {/* Unified Parametric Filtering Controller block */}
        <div className="mkt-filter-panel shadow-sm p-5 rounded-2xl mb-8">
          <div className="flex items-center gap-2 mb-4 text-emerald-900">
            <SlidersHorizontal size={18} className="text-amber-600" />
            <h2 className="font-bold text-sm uppercase tracking-wider">
              Search Filters
            </h2>
          </div>

          {activeTab === "products" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search harvest produce..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="mkt-input w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium placeholder-slate-400"
                />
              </div>

              <select
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value);
                  setProductPage(1);
                }}
                className="mkt-input rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
              >
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Min Price (₹)"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setProductPage(1);
                }}
                className="mkt-input rounded-xl px-4 py-3 text-sm font-medium"
              />

              <input
                type="number"
                placeholder="Max Price (₹)"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setProductPage(1);
                }}
                className="mkt-input rounded-xl px-4 py-3 text-sm font-medium"
              />
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search dynamic fleet listings..."
                  value={machineSearch}
                  onChange={(e) => setMachineSearch(e.target.value)}
                  className="mkt-input w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium placeholder-slate-400"
                />
              </div>

              <select
                value={machineCategory}
                onChange={(e) => setMachineCategory(e.target.value)}
                className="mkt-input rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
              >
                {machineCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Equipment" : cat}
                  </option>
                ))}
              </select>

              <select
                value={rentalType}
                onChange={(e) => setRentalType(e.target.value)}
                className="mkt-input rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="all">All Service Frameworks</option>
                <option value="machine_only">Machine Profile Only</option>
                <option value="with_operator">
                  Inclusive of Field Operator
                </option>
              </select>
            </div>
          )}
        </div>

        {/* Main Content Presentation Matrix Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(activeTab === "products" ? 8 : 6)].map((_, index) => (
              <div
                key={index}
                className="mkt-skel-card rounded-3xl p-4 flex flex-col justify-between h-[380px]"
              >
                <div>
                  <div className="mkt-skel h-48 w-full"></div>
                  <div className="mkt-skel mt-5 h-5 w-3/4"></div>
                  <div className="mkt-skel mt-2.5 h-4 w-1/2"></div>
                </div>
                <div className="mkt-skel h-11 w-full mt-6"></div>
              </div>
            ))}
          </div>
        ) : activeTab === "products" ? (
          products.length === 0 ? (
            <div className="mkt-empty-card text-center py-20 rounded-3xl border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto">
              <div className="text-5xl mb-4">🌾</div>
              <h2 className="mkt-display text-2xl font-bold text-slate-800">
                No Harvest Batches Found
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                We couldn't track active products matching your specific
                metrics.
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Products Context Pagination Footer */}
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setProductPage((p) => p - 1)}
                  disabled={productPagination.currentPage === 1}
                  className="mkt-page-btn flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <span className="mkt-mono font-bold text-sm text-slate-600">
                  {productPagination.currentPage} /{" "}
                  {productPagination.totalPages}
                </span>
                <button
                  onClick={() => setProductPage((p) => p + 1)}
                  disabled={
                    productPagination.currentPage ===
                      productPagination.totalPages ||
                    productPagination.totalPages === 0
                  }
                  className="mkt-page-btn flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </>
          )
        ) : filteredMachines.length === 0 ? (
          <div className="mkt-empty-card text-center py-20 rounded-3xl border border-dashed border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="mkt-display text-2xl font-bold text-slate-800">
              No Machinery Uncovered
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              No rental machinery fits the current category or service
              combination parameters.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMachines.map((machine) => (
              <MachineCard key={machine._id} machine={machine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
