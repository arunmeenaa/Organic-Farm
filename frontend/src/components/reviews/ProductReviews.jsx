import { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

import {
  createReview,
  getProductReviews,
} from "../../services/review.service";

import toast from "react-hot-toast";

const ProductReviews = ({
  productId,
  orderId,
}) => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchReviews = async () => {
    try {
      const { data } =
        await getProductReviews(productId);

      setReviews(data.reviews);
    } catch {
      toast.error(
        "Failed to load reviews"
      );
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async (
    reviewData
  ) => {
    try {
      setLoading(true);
console.log({
  productId,
  orderId,
  ...reviewData,
});
      await createReview({
        productId,
        orderId,
        ...reviewData,
      });

      toast.success(
        "Review submitted"
      );

      fetchReviews();

    } catch (err) {

      toast.error(
        err.response?.data?.message
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-8">

      <ReviewForm
        onSubmit={submitReview}
        loading={loading}
      />

      <ReviewList reviews={reviews} />

    </div>
  );
};

export default ProductReviews;