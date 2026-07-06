import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ reviews }) => {
  return (
    <section className="mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default ReviewsSection;