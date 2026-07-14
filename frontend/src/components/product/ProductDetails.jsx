import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProductById, getProducts } from "../../services/product.service";
import { getProductReviews } from "../../services/review.service";
import ReviewsList from "../reviews/ReviewList";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
 
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await getProductById(id);
      const productData = data.product;

      setProduct(productData);

      // Fetch Related Products
      const relatedRes = await getProducts({
        category: productData.category,
        limit: 4,
      });

      const filtered = relatedRes.data.products.filter(
        (item) => item._id !== productData._id,
      );

      setRelatedProducts(filtered.slice(0, 4));

      // Fetch Reviews
      try {
        const reviewRes = await getProductReviews(id);
        setReviews(reviewRes.data.reviews || []);
      } catch {
        setReviews([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Premium Fluid Canvas Background Mesh supporting Light and Dark modes
  const rootClasses = "min-h-screen";

  const panelClasses = 
    "bg-white/75 dark:bg-[#121E18]/60 backdrop-blur-xl " +
    "border border-white/60 dark:border-white/[0.06] " +
    "shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]";

  // 1. LOADING / SKELETON STATE
  if (loading) {
    return (
      <div className={rootClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-10 space-y-12">
          {/* Main Content Card Skeleton */}
          <div className={`${panelClasses} grid md:grid-cols-2 gap-8 lg:gap-12 rounded-3xl p-6 sm:p-8 animate-pulse`}>
            {/* Gallery Image Skeleton */}
            <div className="aspect-square w-full bg-neutral-200/60 dark:bg-neutral-800/60 rounded-2xl" />
            
            {/* Info Side Skeleton */}
            <div className="flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-4">
                <div className="h-4 w-1/4 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                <div className="h-8 w-3/4 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-4 w-1/2 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                <div className="h-20 w-full bg-neutral-200/40 dark:bg-neutral-800/40 rounded-xl" />
              </div>
              <div className="h-12 w-full bg-neutral-200/70 dark:bg-neutral-800/70 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ERROR / NOT FOUND STATE
  if (!product) {
    return (
      <div className={rootClasses}>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className={`${panelClasses} text-center py-16 px-8 rounded-3xl`}>
            <div className="inline-flex p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-['Space_Grotesk',_sans-serif] text-3xl font-bold text-[#0F2E22] dark:text-[#E4F2EB]">
              Product Not Found
            </h2>
            <p className="mt-3 text-sm text-[#5C6E64] dark:text-[#97A89E] max-w-sm mx-auto">
              The product you're looking for doesn't exist, has been archived, or moved to another link.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. MAIN UI STATE
  return (
    <div className={rootClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Dynamic Product Hero Panel */}
        <main className={`${panelClasses} grid md:grid-cols-2 gap-8 lg:gap-12 rounded-3xl p-6 sm:p-8`}>
          <section aria-label="Product Images">
            <ProductGallery images={product.images} />
          </section>

          <section aria-label="Product Configuration" className="flex flex-col justify-between">
            <ProductInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </section>
        </main>

        {/* Separator Line */}
        <hr className="border-t border-[#E3EFE4] dark:border-[#1E3026] opacity-60" />

        {/* Reviews Section */}
        <section aria-label="Customer Reviews" className="space-y-6">
          <ReviewsList productId={product._id} />
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section aria-label="Related items" className="space-y-6 pt-4">
            <RelatedProducts products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;