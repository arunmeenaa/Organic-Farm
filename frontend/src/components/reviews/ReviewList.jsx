import { useEffect, useState } from "react";
import { getProductReviews } from "../../services/review.service";
import ReviewCard from "./ReviewCard";
import { notify } from "../../utils/toast";

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const { data } = await getProductReviews(productId);
      setReviews(data.reviews);
    } catch (err) {
      notify.error(
        err.response?.data?.message || "Failed to load reviews"
      );
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Customer Reviews ({reviews.length})
      </h2>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;