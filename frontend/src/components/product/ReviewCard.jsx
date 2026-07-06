import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="border rounded-2xl p-5">

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">
            {review.user?.name}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>

        </div>

        <div className="flex items-center gap-1">

          <Star
            size={18}
            fill="gold"
            color="gold"
          />

          {review.rating}

        </div>

      </div>

      <h4 className="font-semibold mt-4">
        {review.title}
      </h4>

      <p className="text-gray-600 mt-2">
        {review.comment}
      </p>

    </div>
  );
};

export default ReviewCard;