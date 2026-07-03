import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getProductById, getProducts } from "../../services/product.service";
import { getProductReviews } from "../../services/review.service";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ReviewsSection from "./ReviewsSection";
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
        (item) => item._id !== productData._id
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
      toast.error(
        err.response?.data?.message || "Failed to fetch product"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold">Product Not Found</h2>

        <p className="text-gray-500 mt-3">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Product */}

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg p-8">
          <ProductGallery images={product.images} />

          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        {/* Reviews */}

        <ReviewsSection reviews={reviews} />

        {/* Related Products */}

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;