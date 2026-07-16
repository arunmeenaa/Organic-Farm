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
  ClipboardList,
  Handshake,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProducts } from "../../services/product.service";
import { getMachines } from "../../services/machine.service";
import { getAllServices } from "../../services/service.service";
import ProductCard from "../../components/product/ProductCard";
import MachineCard from "../../components/machine/MachineCard";
import ServiceCard from "../../pages/service/ServiceCard";
import { useTheme } from "../../context/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ── Static data ─────────────────────────────────────────────────────────── */
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
const serviceCategories = [
  "All",
  "Harvesting",
  "Land Preparation",
  "Ploughing",
  "Seeding",
  "Transplanting",
  "Irrigation",
  "Spraying",
  "Harvesting",
  "Transportation",
  "Threshing",
  "Others",
];

/* ════════════════════════════════════════════════════════════════════════════
   MARKETPLACE — all state, hooks, and data logic unchanged.
   darkMode drives conditional Tailwind classes throughout.
   Now has three tabs: Products, Machines, and Services.
   ════════════════════════════════════════════════════════════════════════════ */
const Marketplace = () => {
  const { darkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);

  // Products state
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

  // Machines state
  const [machines, setMachines] = useState([]);
  const [machineSearch, setMachineSearch] = useState("");
  const [machineCategory, setMachineCategory] = useState("All");
  const [rentalType, setRentalType] = useState("all");

  // Services state
  const [services, setServices] = useState([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategory, setServiceCategory] = useState("All");
  const [servicePriceType, setServicePriceType] = useState("all");

  // Debounce product search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedProductSearch(productSearch);
      setProductPage(1);
    }, 450);
    return () => clearTimeout(timer);
  }, [productSearch]);

  // Fetch data
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
      } else if (activeTab === "machines") {
        const { data } = await getMachines();
        setMachines(data.machines || []);
      } else {
        const { data } = await getAllServices();
        setServices(data.services || []);
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

  // In-memory machine filter
  const filteredMachines = useMemo(
    () =>
      machines.filter((m) => {
        const matchSearch = m.name
          ?.toLowerCase()
          .includes(machineSearch.toLowerCase());
        const matchCategory =
          machineCategory === "All" || m.category === machineCategory;
        const matchRental = rentalType === "all" || m.rentalType === rentalType;
        return matchSearch && matchCategory && matchRental;
      }),
    [machines, machineSearch, machineCategory, rentalType],
  );

  // In-memory service filter (fetched once per tab activation, then
  // narrowed client-side — same approach as the machines tab above).
  const filteredServices = useMemo(
    () =>
      services.filter((s) => {
        const matchSearch = s.title
          ?.toLowerCase()
          .includes(serviceSearch.toLowerCase());

        const matchCategory =
          serviceCategory === "All" || s.category === serviceCategory;

        const matchPriceType =
          servicePriceType === "all" || s.pricingType === servicePriceType;

        return matchSearch && matchCategory && matchPriceType;
      }),
    [services, serviceSearch, serviceCategory, servicePriceType],
  );

  /* ── Shared input className ── */
  const inputCls = [
    "w-full rounded-xl py-3 px-4 text-sm font-medium",
    "outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] placeholder:text-[rgba(167,243,208,0.35)] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] placeholder:text-[rgba(6,95,70,0.30)] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  const selectInputCls = [
    "rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer w-full",
    "outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)] [&>option]:bg-[#0B1A12] [&>option]:text-[#D1FAE5]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  const headerCopy = {
    products: {
      title: "Fresh Organic Marketplace",
      subtitle: `Discover ${productPagination.totalProducts} completely natural organic crop batches direct from farms.`,
    },
    machines: {
      title: "Agricultural Equipment Hub",
      subtitle: `Explore ${filteredMachines.length} machinery listings ready for immediate operations deployment.`,
    },
    services: {
      title: "Farm Services Directory",
      subtitle: `Browse ${filteredServices.length} verified services from experienced local providers.`,
    },
  };

  return (
    <div className="font-sans min-h-screen relative overflow-hidden transition-[background] duration-400 pb-16">
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
      />

      {/* Ambient blob — mkt-blob */}
      <div
        className={[
          "absolute top-[10%] -right-[10%] w-[35%] h-[35%] rounded-full pointer-events-none blur-[120px]",
          darkMode
            ? "bg-[rgba(52,211,153,0.07)]"
            : "bg-[rgba(251,191,36,0.10)]",
        ].join(" ")}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-10">
        {/* ── Header + Tab switcher ── */}
        <div
          className={[
            "flex flex-col md:flex-row md:items-end justify-between border-b pb-6 mb-8 gap-4",
            darkMode
              ? "border-[rgba(52,211,153,0.10)]"
              : "border-[rgba(6,95,70,0.10)]",
          ].join(" ")}
        >
          <div>
            <h1
              className={[
                "text-4xl font-extrabold tracking-tight bg-clip-text text-transparent",
                "font-['Space_Grotesk',ui-sans-serif,sans-serif]",
                darkMode
                  ? "bg-gradient-to-r from-[#34D399] to-[#A3E635]"
                  : "bg-gradient-to-r from-[#065F46] to-[#65A30D]",
              ].join(" ")}
            >
              {headerCopy[activeTab].title}
            </h1>
            <p
              className={[
                "mt-2 text-sm font-medium",
                darkMode
                  ? "text-[rgba(167,243,208,0.55)]"
                  : "text-[rgba(6,95,70,0.55)]",
              ].join(" ")}
            >
              {headerCopy[activeTab].subtitle}
            </p>
          </div>

          {/* Tab switcher — mkt-tab-track */}
          <div
            className={[
              "flex gap-1.5 p-1.5 rounded-2xl w-max shadow-sm backdrop-blur-[12px]",
              darkMode
                ? "bg-white/[0.06] border border-[rgba(52,211,153,0.12)]"
                : "bg-white/60 border border-[rgba(6,95,70,0.10)]",
            ].join(" ")}
          >
            <button
              onClick={() => {
                setActiveTab("products");
                setMachineSearch("");
                setServiceSearch("");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "products"
                  ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-[0_8px_16px_-6px_rgba(5,150,105,0.50)]"
                  : darkMode
                    ? "text-[rgba(167,243,208,0.45)] hover:text-[rgba(167,243,208,0.85)]"
                    : "text-[rgba(6,95,70,0.50)] hover:text-[rgba(6,95,70,0.85)]"
              }`}
            >
              <Sprout size={14} /> Crops &amp; Produce
            </button>
            <button
              onClick={() => {
                setActiveTab("machines");
                setProductSearch("");
                setServiceSearch("");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "machines"
                  ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-[0_8px_16px_-6px_rgba(5,150,105,0.50)]"
                  : darkMode
                    ? "text-[rgba(167,243,208,0.45)] hover:text-[rgba(167,243,208,0.85)]"
                    : "text-[rgba(6,95,70,0.50)] hover:text-[rgba(6,95,70,0.85)]"
              }`}
            >
              <Tractor size={14} /> Farm Machinery
            </button>
            <button
              onClick={() => {
                setActiveTab("services");
                setProductSearch("");
                setMachineSearch("");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all text-xs tracking-wider uppercase ${
                activeTab === "services"
                  ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-[0_8px_16px_-6px_rgba(5,150,105,0.50)]"
                  : darkMode
                    ? "text-[rgba(167,243,208,0.45)] hover:text-[rgba(167,243,208,0.85)]"
                    : "text-[rgba(6,95,70,0.50)] hover:text-[rgba(6,95,70,0.85)]"
              }`}
            >
              <ClipboardList size={14} /> Services
            </button>
          </div>
        </div>

        {/* ── Filter panel — mkt-filter ── */}
        <div
          className={[
            "p-5 rounded-2xl mb-8 backdrop-blur-[20px]",
            darkMode
              ? "bg-white/[0.05] border border-[rgba(52,211,153,0.10)] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.40)]"
              : "bg-white/50 backdrop-blur-xlborder border-white/40 border border-white/60 shadow-[0_12px_30px_-18px_rgba(5,150,105,0.30)]",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={18} className="text-amber-500" />
            <h2
              className={[
                "font-bold text-sm uppercase tracking-wider",
                darkMode ? "text-[#D1FAE5]" : "text-[#1A3D2B]",
              ].join(" ")}
            >
              Search Filters
            </h2>
          </div>

          {activeTab === "products" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className={[
                    "absolute left-4 top-1/2 -translate-y-1/2",
                    darkMode
                      ? "text-[rgba(52,211,153,0.40)]"
                      : "text-[rgba(6,95,70,0.35)]",
                  ].join(" ")}
                />
                <input
                  type="text"
                  placeholder="Search harvest produce..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className={`${inputCls} pl-11`}
                />
              </div>

              {/* Category */}
              <Select
                value={productCategory}
                onValueChange={(value) => {
                  setProductCategory(value);
                  setProductPage(1);
                }}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="🌿 All Categories" />
                </SelectTrigger>

                <SelectContent>
                  {productCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "All" ? "🌿 All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Min price */}
              <input
                type="number"
                placeholder="Min Price (₹)"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setProductPage(1);
                }}
                className={inputCls}
              />

              {/* Max price */}
              <input
                type="number"
                placeholder="Max Price (₹)"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setProductPage(1);
                }}
                className={inputCls}
              />
            </div>
          ) : activeTab === "machines" ? (
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className={[
                    "absolute left-4 top-1/2 -translate-y-1/2",
                    darkMode
                      ? "text-[rgba(52,211,153,0.40)]"
                      : "text-[rgba(6,95,70,0.35)]",
                  ].join(" ")}
                />
                <input
                  type="text"
                  placeholder="Search dynamic fleet listings..."
                  value={machineSearch}
                  onChange={(e) => setMachineSearch(e.target.value)}
                  className={`${inputCls} pl-11`}
                />
              </div>

              {/* Machine category */}
              <select
                value={machineCategory}
                onChange={(e) => setMachineCategory(e.target.value)}
                className={selectInputCls}
              >
                {machineCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Equipment" : cat}
                  </option>
                ))}
              </select>

              {/* Rental type */}
              <select
                value={rentalType}
                onChange={(e) => setRentalType(e.target.value)}
                className={selectInputCls}
              >
                <option value="all">All Service Frameworks</option>
                <option value="machine_only">Machine Profile Only</option>
                <option value="with_operator">
                  Inclusive of Field Operator
                </option>
              </select>
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className={[
                    "absolute left-4 top-1/2 -translate-y-1/2",
                    darkMode
                      ? "text-[rgba(52,211,153,0.40)]"
                      : "text-[rgba(6,95,70,0.35)]",
                  ].join(" ")}
                />
                <input
                  type="text"
                  placeholder="Search available services..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className={`${inputCls} pl-11`}
                />
              </div>

              {/* Service category */}
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className={selectInputCls}
              >
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Service Types" : cat}
                  </option>
                ))}
              </select>

              {/* Pricing model */}
              <select
                value={servicePriceType}
                onChange={(e) => setServicePriceType(e.target.value)}
                className={selectInputCls}
              >
                <option value="all">Any Pricing Model</option>
                <option value="per_hour">Per Hour</option>
                <option value="per_day">Per Day</option>
                <option value="per_acre">Per Acre</option>
                <option value="per_trip">Per Trip</option>
                <option value="per_km">Per Kilometer</option>
                <option value="fixed">Fixed Price</option>
              </select>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        {loading ? (
          /* Skeleton */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(activeTab === "products" ? 8 : 6)].map((_, i) => (
              <div
                key={i}
                className={[
                  "p-4 flex flex-col justify-between h-[380px] animate-pulse rounded-3xl",
                  darkMode
                    ? "bg-white/[0.05] border border-[rgba(52,211,153,0.08)]"
                    : "bg-white/[0.72] border border-white/60",
                ].join(" ")}
              >
                <div>
                  <div
                    className={[
                      "h-48 w-full rounded-lg",
                      darkMode
                        ? "bg-[rgba(52,211,153,0.08)]"
                        : "bg-[rgba(6,95,70,0.06)]",
                    ].join(" ")}
                  />
                  <div
                    className={[
                      "mt-5 h-5 w-3/4 rounded-lg",
                      darkMode
                        ? "bg-[rgba(52,211,153,0.08)]"
                        : "bg-[rgba(6,95,70,0.06)]",
                    ].join(" ")}
                  />
                  <div
                    className={[
                      "mt-2.5 h-4 w-1/2 rounded-lg",
                      darkMode
                        ? "bg-[rgba(52,211,153,0.08)]"
                        : "bg-[rgba(6,95,70,0.06)]",
                    ].join(" ")}
                  />
                </div>
                <div
                  className={[
                    "h-11 w-full mt-6 rounded-xl",
                    darkMode
                      ? "bg-[rgba(52,211,153,0.08)]"
                      : "bg-[rgba(6,95,70,0.06)]",
                  ].join(" ")}
                />
              </div>
            ))}
          </div>
        ) : activeTab === "products" ? (
          products.length === 0 ? (
            <div
              className={[
                "text-center py-20 max-w-xl mx-auto backdrop-blur-[16px] rounded-3xl border-[1.5px] border-dashed",
                darkMode
                  ? "bg-white/[0.04] border-[rgba(52,211,153,0.15)]"
                  : "bg-white/[0.72] border-[rgba(6,95,70,0.14)]",
              ].join(" ")}
            >
              <div
                className={[
                  "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4",
                  darkMode
                    ? "bg-[rgba(52,211,153,0.10)] text-[#34D399]"
                    : "bg-[rgba(5,150,105,0.10)] text-[#059669]",
                ].join(" ")}
              >
                <PackageSearch size={28} />
              </div>
              <h2
                className={[
                  "text-2xl font-bold font-['Space_Grotesk',ui-sans-serif,sans-serif]",
                  darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
                ].join(" ")}
              >
                No Harvest Batches Found
              </h2>
              <p
                className={[
                  "mt-2 text-sm",
                  darkMode
                    ? "text-[rgba(167,243,208,0.50)]"
                    : "text-[rgba(6,95,70,0.50)]",
                ].join(" ")}
              >
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
                  className={[
                    "flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase shadow-sm",
                    "transition-all duration-200 disabled:opacity-[0.38] disabled:cursor-not-allowed",
                    "hover:enabled:bg-gradient-to-r hover:enabled:from-[#059669] hover:enabled:to-[#84CC16]",
                    "hover:enabled:text-white hover:enabled:border-transparent",
                    "hover:enabled:shadow-[0_8px_18px_-6px_rgba(5,150,105,0.45)]",
                    darkMode
                      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.14)] text-[#6EE7B7]"
                      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#065F46]",
                  ].join(" ")}
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <span
                  className={[
                    "font-bold text-sm font-['IBM_Plex_Mono',ui-monospace,monospace]",
                    darkMode
                      ? "text-[rgba(167,243,208,0.55)]"
                      : "text-[rgba(6,95,70,0.60)]",
                  ].join(" ")}
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
                  className={[
                    "flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase shadow-sm",
                    "transition-all duration-200 disabled:opacity-[0.38] disabled:cursor-not-allowed",
                    "hover:enabled:bg-gradient-to-r hover:enabled:from-[#059669] hover:enabled:to-[#84CC16]",
                    "hover:enabled:text-white hover:enabled:border-transparent",
                    "hover:enabled:shadow-[0_8px_18px_-6px_rgba(5,150,105,0.45)]",
                    darkMode
                      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.14)] text-[#6EE7B7]"
                      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#065F46]",
                  ].join(" ")}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </>
          )
        ) : activeTab === "machines" ? (
          filteredMachines.length === 0 ? (
            <div
              className={[
                "text-center py-20 max-w-xl mx-auto backdrop-blur-[16px] rounded-3xl border-[1.5px] border-dashed",
                darkMode
                  ? "bg-white/[0.04] border-[rgba(52,211,153,0.15)]"
                  : "bg-white/[0.72] border-[rgba(6,95,70,0.14)]",
              ].join(" ")}
            >
              <div
                className={[
                  "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4",
                  darkMode
                    ? "bg-[rgba(245,158,11,0.10)] text-[#FCD34D]"
                    : "bg-[rgba(245,158,11,0.10)] text-[#D97706]",
                ].join(" ")}
              >
                <Wrench size={28} />
              </div>
              <h2
                className={[
                  "text-2xl font-bold font-['Space_Grotesk',ui-sans-serif,sans-serif]",
                  darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
                ].join(" ")}
              >
                No Machinery Uncovered
              </h2>
              <p
                className={[
                  "mt-2 text-sm",
                  darkMode
                    ? "text-[rgba(167,243,208,0.50)]"
                    : "text-[rgba(6,95,70,0.50)]",
                ].join(" ")}
              >
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
          )
        ) : filteredServices.length === 0 ? (
          /* Services empty */
          <div
            className={[
              "text-center py-20 max-w-xl mx-auto backdrop-blur-[16px] rounded-3xl border-[1.5px] border-dashed",
              darkMode
                ? "bg-white/[0.04] border-[rgba(52,211,153,0.15)]"
                : "bg-white/[0.72] border-[rgba(6,95,70,0.14)]",
            ].join(" ")}
          >
            <div
              className={[
                "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4",
                darkMode
                  ? "bg-[rgba(52,211,153,0.10)] text-[#34D399]"
                  : "bg-[rgba(5,150,105,0.10)] text-[#059669]",
              ].join(" ")}
            >
              <Handshake size={28} />
            </div>
            <h2
              className={[
                "text-2xl font-bold font-['Space_Grotesk',ui-sans-serif,sans-serif]",
                darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
              ].join(" ")}
            >
              No Services Found
            </h2>
            <p
              className={[
                "mt-2 text-sm",
                darkMode
                  ? "text-[rgba(167,243,208,0.50)]"
                  : "text-[rgba(6,95,70,0.50)]",
              ].join(" ")}
            >
              No listed services match the current category or pricing filters
              yet.
            </p>
          </div>
        ) : (
          /* Services grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
