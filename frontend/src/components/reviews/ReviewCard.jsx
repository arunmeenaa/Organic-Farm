import StarRating from "./StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">
            {review.user?.name || "Anonymous User"}
          </h3>

          <p className="text-sm text-gray-500">
            {review.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>

        <StarRating rating={review.rating} readonly />
      </div>

      <p className="mt-4 text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
