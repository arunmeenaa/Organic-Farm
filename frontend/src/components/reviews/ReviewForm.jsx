import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
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

  // Controls whether the form is open. A first-time review opens the form
  // right away; an existing review starts collapsed behind an edit icon.
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (alreadyReviewed) {
        await updateReview(reviewId, {
          rating,
          comment,
        });
        notify.success("Review updated successfully");
      } else {
        const { data } = await createReview({
          productId,
          orderId,
          rating,
          comment,
        });
        setAlreadyReviewed(true);
        setReviewId(data.review._id);
        notify.success("Review submitted successfully");
      }

      // Collapse back to the read-only summary after a successful save.
      setIsEditing(false);
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
        const { data } = await getMyReview(productId);
        if (data.review) {
          setAlreadyReviewed(true);
          setReviewId(data.review._id);
          setRating(data.review.rating);
          setComment(data.review.comment);
        } else {
          // No existing review yet, so open the form for a first submission.
          setIsEditing(true);
        }
      } catch (err) {
        console.log(err);
        // If the lookup fails, still let the person write a review.
        setIsEditing(true);
      }
    };
    fetchMyReview();
  }, [productId]);

  // Already reviewed and not currently editing: show a compact summary
  // with an edit icon instead of the open form.
  if (alreadyReviewed && !isEditing) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Your Review</h2>
            <StarRating rating={rating} setRating={() => {}} readOnly />
            {comment && (
              <p className="text-gray-600 mt-3 leading-6">{comment}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit review"
            className="shrink-0 border rounded-xl p-2 hover:bg-gray-100"
          >
            <Pencil size={18} />
          </button>
        </div>
      </div>
    );
  }

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

      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl"
        >
          {alreadyReviewed ? "Update Review" : "Submit Review"}
        </button>

        {alreadyReviewed && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="border px-6 py-3 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;