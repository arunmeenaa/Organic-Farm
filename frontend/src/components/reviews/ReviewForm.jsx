import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { notify } from "../../utils/toast";

import {
  createReview,
  getMyReview,
  updateReview,
} from "../../services/review.service";
const ReviewForm = ({ productId, orderId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (alreadyReviewed) {
        console.log({
          alreadyReviewed,
          reviewId,
          rating,
          comment,
        });
        await updateReview(reviewId, {
          rating,
          comment,
        });

        notify.success("Review updated successfully");
      } else {
        await createReview({
          productId,
          orderId,
          rating,
          comment,
        });
        setAlreadyReviewed(true);
        setReviewId(data.review._id);
        notify.success("Review submitted successfully");
      }
    } catch (err) {
      console.error(err);

      notify.error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchMyReview = async () => {
      try {
        console.log("productId:", productId);
        const { data } = await getMyReview(productId);

        if (data.review) {
          setAlreadyReviewed(true);
          setReviewId(data.review._id);
          setRating(data.review.rating);
          setComment(data.review.comment);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMyReview();
  }, [productId]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 mt-8"
    >
      <h2 className="text-2xl font-semibold mb-5">
        {alreadyReviewed ? "Edit Your Review" : "Write a Review"}
      </h2>

      <StarRating rating={rating} setRating={setRating} />

      <textarea
        rows={4}
        className="w-full mt-5 border rounded-xl p-4"
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        disabled={loading}
        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
      >
        {alreadyReviewed ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
