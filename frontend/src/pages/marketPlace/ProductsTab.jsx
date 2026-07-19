import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch } from "lucide-react";
import toast from "react-hot-toast";
import { getProducts } from "../../services/product.service";
import ProductCard from "../../components/product/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productCategories, EmptyBox, Pagination } from "./MarketplaceUtils";

const ProductsTab = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [debouncedProductSearch, setDebouncedProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [productPage, setProductPage] = useState(1);
  const [productPagination, setProductPagination] = useState({ currentPage: 1, totalPages: 1, totalProducts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedProductSearch(productSearch); setProductPage(1); }, 450);
    return () => clearTimeout(t);
  }, [productSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts({
          search: debouncedProductSearch,
          category: productCategory === "All" ? "" : productCategory,
          minPrice, maxPrice, page: productPage, limit: 12,
        });
        setProducts(data.products || []);
        setProductPagination({ currentPage: data.currentPage || 1, totalPages: data.totalPages || 1, totalProducts: data.totalProducts || 0 });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [debouncedProductSearch, productCategory, minPrice, maxPrice, productPage]);

  const inputCls = [
    "w-full rounded-xl py-3 px-4 text-sm font-medium outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] placeholder:text-[rgba(167,243,208,0.35)] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] placeholder:text-[rgba(6,95,70,0.30)] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  return (
    <>
      <div className={["p-5 rounded-2xl mb-8 backdrop-blur-[20px]", darkMode ? "bg-white/[0.05] border border-[rgba(52,211,153,0.10)] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.40)]" : "bg-white/50 border border-white/60 shadow-[0_12px_30px_-18px_rgba(5,150,105,0.30)]"].join(" ")}>
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={18} className="text-amber-500" />
          <h2 className={["font-bold text-sm uppercase tracking-wider", darkMode ? "text-[#D1FAE5]" : "text-[#1A3D2B]"].join(" ")}>Search Filters</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className={["absolute left-4 top-1/2 -translate-y-1/2", darkMode ? "text-[rgba(52,211,153,0.40)]" : "text-[rgba(6,95,70,0.35)]"].join(" ")} />
            <input type="text" placeholder="Search harvest produce..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} className={`${inputCls} pl-11`} />
          </div>
          <Select value={productCategory} onValueChange={(v) => { setProductCategory(v); setProductPage(1); }}>
            <SelectTrigger className="w-64"><SelectValue placeholder="🌿 All Categories" /></SelectTrigger>
            <SelectContent>
              {productCategories.map((c) => <SelectItem key={c} value={c}>{c === "All" ? "🌿 All Categories" : c}</SelectItem>)}
            </SelectContent>
          </Select>
          <input type="number" placeholder="Min Price (₹)" value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setProductPage(1); }} className={inputCls} />
          <input type="number" placeholder="Max Price (₹)" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setProductPage(1); }} className={inputCls} />
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={["p-4 flex flex-col justify-between h-[320px] animate-pulse rounded-3xl", darkMode ? "bg-white/[0.05] border border-[rgba(52,211,153,0.08)]" : "bg-white/[0.72] border border-white/60"].join(" ")}>
              <div className={["h-40 w-full rounded-lg", darkMode ? "bg-[rgba(52,211,153,0.08)]" : "bg-[rgba(6,95,70,0.06)]"].join(" ")} />
              <div className={["mt-4 h-4 w-3/4 rounded-lg", darkMode ? "bg-[rgba(52,211,153,0.08)]" : "bg-[rgba(6,95,70,0.06)]"].join(" ")} />
              <div className={["h-10 w-full mt-4 rounded-xl", darkMode ? "bg-[rgba(52,211,153,0.08)]" : "bg-[rgba(6,95,70,0.06)]"].join(" ")} />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyBox darkMode={darkMode} icon={<PackageSearch size={28} />} title="No Harvest Batches Found" sub="No products match your search." />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
          <Pagination darkMode={darkMode} pagination={productPagination} onPrev={() => setProductPage((p) => p - 1)} onNext={() => setProductPage((p) => p + 1)} />
        </>
      )}
    </>
  );
};

export default ProductsTab;