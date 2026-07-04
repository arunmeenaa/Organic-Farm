import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProductById, getProducts } from "../../services/product.service";
import { getProductReviews } from "../../services/review.service";
import ReviewsList from "../reviews/ReviewList"
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductReviews from "../reviews/ProductReviews";
import RelatedProducts from "./RelatedProducts";

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }

    .fd-product-panel {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
    }

    .fd-skel {
      background: linear-gradient(90deg, #EFEBDD 25%, #F6F4EC 37%, #EFEBDD 63%);
      background-size: 400% 100%;
      animation: fd-shimmer 1.4s ease infinite;
      border-radius: 12px;
    }
    @keyframes fd-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }

    .fd-not-found {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      border-radius: 20px;
    }
  `}</style>
);

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

  if (loading) {
    return (
      <div className="fd-root min-h-screen">
        <FontImport />
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="fd-skel h-[28rem] w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fd-root min-h-screen">
        <FontImport />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="fd-not-found text-center py-20">
            <h2
              className="fd-display text-3xl font-semibold"
              style={{ color: "#1E3527" }}
            >
              Product Not Found
            </h2>

            <p className="mt-3" style={{ color: "#8A8578" }}>
              The product you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fd-root min-h-screen">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Product */}

        <div className="fd-product-panel grid lg:grid-cols-2 gap-12 rounded-3xl shadow-sm p-8">
          <ProductGallery images={product.images} />

          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        {/* Reviews */}

        <ReviewsList productId={product._id} />

        {/* Related Products */}

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
