import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Related Products
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;