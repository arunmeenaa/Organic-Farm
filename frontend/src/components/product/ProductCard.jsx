import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={
          product.images?.[0] ||
          "https://placehold.co/600x400?text=No+Image"
        }
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {product.category}
        </span>

        <h2 className="text-xl font-semibold mt-3">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          Farmer: {product.farmer?.name}
        </p>

        <div className="flex justify-between items-center mt-5">

          <h3 className="text-2xl font-bold text-green-700">
            ₹{product.price}
          </h3>

          <span className="text-sm">
            Stock: {product.quantity}
          </span>

        </div>

        <Link
          to={`/products/${product._id}`}
          className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;