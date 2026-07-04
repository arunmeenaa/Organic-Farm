import { useEffect, useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { getProducts } from "../../services/product.service";
import ProductCard from "./ProductCard";

// Shared design tokens with Navbar/Hero/Categories/FeaturedProducts/Dashboard:
// forest green + harvest marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-rule { background: #E7A83C; }

    .fd-filter-panel {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-radius: 12px;
    }

    .fd-input {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      color: #23281F;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-input:focus {
      outline: none;
      border-color: #1E3527;
      box-shadow: 0 0 0 3px rgba(30, 53, 39, 0.08);
    }
    .fd-input::placeholder { color: #A6A08E; }

    .fd-empty {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-radius: 16px;
    }

    .fd-skel-card {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
    }
    .fd-skel {
      background: linear-gradient(90deg, #EFEBDD 25%, #F6F4EC 37%, #EFEBDD 63%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.4s ease infinite;
      border-radius: 8px;
    }
    @keyframes fd-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }

    .fd-page-btn {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      color: #1E3527;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .fd-page-btn:hover:not(:disabled) {
      background: #1E3527;
      color: #F6F4EC;
      border-color: #1E3527;
    }
    .fd-page-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .fd-page-label {
      color: #4A5147;
    }
  `}</style>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts({
        search: debouncedSearch,
        category,
        minPrice,
        maxPrice,
        page,
        limit: 12,
      });

      setProducts(data.products || []);

      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.totalProducts,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category, minPrice, maxPrice, page]);

  return (
    <div className="fd-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="mb-8">
          <div className="fd-rule w-12 h-1 rounded-full mb-5" />
          <h1 className="fd-display text-4xl font-semibold" style={{ color: "#1E3527" }}>
            Fresh Organic Products
          </h1>
          <p className="mt-2" style={{ color: "#8A8578" }}>
            {pagination.totalProducts} products available
          </p>
        </div>

        {/* Filters */}

        <div className="fd-filter-panel shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Filter size={20} style={{ color: "#8A5A16" }} />
            <h2 className="font-semibold text-lg" style={{ color: "#1E3527" }}>
              Filters
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "#A6A08E" }}
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="fd-input w-full rounded-xl py-3 pl-11 pr-4"
              />
            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="fd-input rounded-xl px-4 py-3"
            >
              <option value="">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Dairy">Dairy</option>
              <option value="Spices">Spices</option>
            </select>

            {/* Min Price */}

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
              className="fd-input rounded-xl px-4 py-3"
            />

            {/* Max Price */}

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
              className="fd-input rounded-xl px-4 py-3"
            />
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="fd-skel-card rounded-2xl p-4">
                <div className="fd-skel h-52"></div>
                <div className="fd-skel mt-4 h-4"></div>
                <div className="fd-skel mt-3 h-4 w-2/3"></div>
                <div className="fd-skel mt-6 h-10"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="fd-empty text-center py-20">
            <div className="text-6xl mb-5">🌱</div>

            <h2 className="fd-display text-2xl font-semibold" style={{ color: "#1E3527" }}>
              No Products Found
            </h2>

            <p className="mt-3" style={{ color: "#8A8578" }}>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Products */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={pagination.currentPage === 1}
                className="fd-page-btn flex items-center gap-2 px-5 py-2 rounded-xl font-medium"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <span className="fd-page-label fd-mono font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={
                  pagination.currentPage === pagination.totalPages ||
                  pagination.totalPages === 0
                }
                className="fd-page-btn flex items-center gap-2 px-5 py-2 rounded-xl font-medium"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;