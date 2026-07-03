import { MapPin, User, ShoppingCart } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { notify } from "../../utils/toast";

const ProductInfo = ({ product, quantity, setQuantity }) => {
  const { addItem } = useCart();
  const handleAddToCart = async () => {
    try {
      await addItem(product._id, quantity);

      notify.success("Product added successfully 🌱");
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to add product");
    }
  };
  return (
    <div>
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
        {product.category}
      </span>

      <h1 className="text-4xl font-bold mt-4">{product.name}</h1>

      <p className="text-4xl text-green-700 font-bold mt-5">₹{product.price}</p>

      <div className="mt-6 space-y-2 text-gray-600">
        <div className="flex items-center gap-2">
          <User size={18} />
          {product.farmer?.name}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} />
          {product.farmer?.location}
        </div>
      </div>

      <p className="mt-8 text-gray-600 leading-7">{product.description}</p>

      <p className="mt-6 font-semibold">
        Available:
        <span className="text-green-700 ml-2">{product.quantity}</span>
      </p>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={product.quantity}
      />

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <button
          disabled={product.quantity === 0}
          className="flex-1 border-2 border-green-600 text-green-700 py-4 rounded-xl hover:bg-green-50 disabled:border-gray-400 disabled:text-gray-400"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
