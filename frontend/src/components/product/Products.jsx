import { useEffect, useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { getProducts } from "../../services/product.service";
import ProductCard from "./ProductCard";

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
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Fresh Organic Products
          </h1>

          <p className="text-gray-500 mt-2">
            {pagination.totalProducts} products available
          </p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="text-green-600" size={20} />
            <h2 className="font-semibold text-lg">Filters</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
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
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
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
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow animate-pulse"
              >
                <div className="h-52 bg-gray-200 rounded-xl"></div>

                <div className="mt-4 h-4 bg-gray-200 rounded"></div>

                <div className="mt-3 h-4 bg-gray-200 rounded w-2/3"></div>

                <div className="mt-6 h-10 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow text-center py-20">
            <div className="text-6xl mb-5">🌱</div>

            <h2 className="text-2xl font-bold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
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
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <span className="font-medium">
                Page {pagination.currentPage} of{" "}
                {pagination.totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={
                  pagination.currentPage === pagination.totalPages ||
                  pagination.totalPages === 0
                }
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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