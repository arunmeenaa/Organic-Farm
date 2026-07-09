import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Sprout,
  Tractor,
  PackageSearch,
  Wrench,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProducts } from "../../services/product.service";
import { getMachines } from "../../services/machine.service";
import ProductCard from "../../components/product/ProductCard";
import MachineCard from "../../components/machine/MachineCard";

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
    <div
      className="min-h-screen pb-16 relative overflow-hidden"
      style={{
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        background:
          "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent), radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent), #F4F9F2",
      }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-amber-300/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-10">
        {/* Header + Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-emerald-900/10 pb-6 mb-8 gap-4">
          <div>
            <h1
              className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-800 to-lime-600 bg-clip-text text-transparent"
              style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" }}
            >
              {activeTab === "products"
                ? "Fresh Organic Marketplace"
                : "Agricultural Equipment Hub"}
            </h1>
            <p className="mt-2 text-sm font-medium text-emerald-900/50">
              {activeTab === "products"
                ? `Discover ${productPagination.totalProducts} completely natural organic crop batches direct from farms.`
                : `Explore ${filteredMachines.length} machinery listings ready for immediate operations deployment.`}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-1.5 bg-white/60 backdrop-blur-md p-1.5 rounded-2xl w-max border border-emerald-900/10 shadow-sm">
            <button
              onClick={() => {
                setActiveTab("products");
                setMachineSearch("");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-[0_8px_16px_-6px_rgba(5,150,105,0.5)]"
                  : "text-emerald-900/50 hover:text-emerald-900"
              }`}
            >
              <Sprout size={14} /> Crops & Produce
            </button>
            <button
              onClick={() => {
                setActiveTab("machines");
                setProductSearch("");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "machines"
                  ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-[0_8px_16px_-6px_rgba(5,150,105,0.5)]"
                  : "text-emerald-900/50 hover:text-emerald-900"
              }`}
            >
              <Tractor size={14} /> Farm Machinery
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_12px_30px_-18px_rgba(5,150,105,0.35)] p-5 rounded-2xl mb-8">
          <div className="flex items-center gap-2 mb-4 text-emerald-950">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30"
                />
                <input
                  type="text"
                  placeholder="Search harvest produce..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium bg-white/85 border border-emerald-900/10 text-emerald-950 placeholder-emerald-900/30 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              <select
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value);
                  setProductPage(1);
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold bg-white/85 border border-emerald-900/10 text-emerald-900 outline-none cursor-pointer focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
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
                className="rounded-xl px-4 py-3 text-sm font-medium bg-white/85 border border-emerald-900/10 text-emerald-950 placeholder-emerald-900/30 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />

              <input
                type="number"
                placeholder="Max Price (₹)"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setProductPage(1);
                }}
                className="rounded-xl px-4 py-3 text-sm font-medium bg-white/85 border border-emerald-900/10 text-emerald-950 placeholder-emerald-900/30 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30"
                />
                <input
                  type="text"
                  placeholder="Search dynamic fleet listings..."
                  value={machineSearch}
                  onChange={(e) => setMachineSearch(e.target.value)}
                  className="w-full rounded-xl py-3 pl-11 pr-4 text-sm font-medium bg-white/85 border border-emerald-900/10 text-emerald-950 placeholder-emerald-900/30 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              <select
                value={machineCategory}
                onChange={(e) => setMachineCategory(e.target.value)}
                className="rounded-xl px-4 py-3 text-sm font-semibold bg-white/85 border border-emerald-900/10 text-emerald-900 outline-none cursor-pointer focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
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
                className="rounded-xl px-4 py-3 text-sm font-semibold bg-white/85 border border-emerald-900/10 text-emerald-900 outline-none cursor-pointer focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
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

        {/* Content Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(activeTab === "products" ? 8 : 6)].map((_, index) => (
              <div
                key={index}
                className="bg-white/70 border border-white/60 rounded-3xl p-4 flex flex-col justify-between h-[380px] animate-pulse"
              >
                <div>
                  <div className="h-48 w-full rounded-xl bg-emerald-900/5" />
                  <div className="mt-5 h-5 w-3/4 rounded bg-emerald-900/5" />
                  <div className="mt-2.5 h-4 w-1/2 rounded bg-emerald-900/5" />
                </div>
                <div className="h-11 w-full mt-6 rounded-xl bg-emerald-900/5" />
              </div>
            ))}
          </div>
        ) : activeTab === "products" ? (
          products.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-xl border border-dashed border-emerald-900/15 text-center py-20 rounded-3xl shadow-sm max-w-xl mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center mb-4">
                <PackageSearch size={28} />
              </div>
              <h2
                className="text-2xl font-bold text-emerald-950"
                style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" }}
              >
                No Harvest Batches Found
              </h2>
              <p className="mt-2 text-sm text-emerald-900/50">
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

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setProductPage((p) => p - 1)}
                  disabled={productPagination.currentPage === 1}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase bg-white/85 border border-emerald-900/10 text-emerald-800 shadow-sm transition-all hover:not-disabled:bg-gradient-to-r hover:not-disabled:from-emerald-600 hover:not-disabled:to-lime-500 hover:not-disabled:text-white hover:not-disabled:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <span
                  className="font-bold text-sm text-emerald-900/60"
                  style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
                >
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
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase bg-white/85 border border-emerald-900/10 text-emerald-800 shadow-sm transition-all hover:not-disabled:bg-gradient-to-r hover:not-disabled:from-emerald-600 hover:not-disabled:to-lime-500 hover:not-disabled:text-white hover:not-disabled:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </>
          )
        ) : filteredMachines.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl border border-dashed border-emerald-900/15 text-center py-20 rounded-3xl shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
              <Wrench size={28} />
            </div>
            <h2
              className="text-2xl font-bold text-emerald-950"
              style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" }}
            >
              No Machinery Uncovered
            </h2>
            <p className="mt-2 text-sm text-emerald-900/50">
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
