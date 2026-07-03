import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Package,
  IndianRupee,
  Boxes,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getMyProducts,
  changeProductStatus,
} from "../../services/product.service";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getMyProducts();

      setProducts(data.products || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatus = async (id, currentStatus) => {
    try {
      const status = currentStatus === "active" ? "inactive" : "active";

      await changeProductStatus(id, { status });

      toast.success("Product status updated");

      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Products</h1>

            <p className="text-gray-500 mt-2">
              Manage all your listed products.
            </p>
          </div>

          <Link
            to="/farmer/products/add"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-20 text-center">
            <Package size={70} className="mx-auto text-gray-300" />

            <h2 className="text-3xl font-semibold mt-5">No Products Yet</h2>

            <p className="text-gray-500 mt-3">
              Start selling by adding your first product.
            </p>

            <Link
              to="/farmer/products/add"
              className="inline-flex mt-8 bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">{product.name}</h2>

                  <p className="text-gray-500 mt-2">{product.category}</p>

                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <IndianRupee size={18} />
                        Price
                      </span>

                      <span className="font-semibold">
                        ₹{product.price}/{product.unit}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Boxes size={18} />
                        Stock
                      </span>

                      <span className="font-semibold">{product.quantity}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Status</span>

                      <span
                        className={`font-semibold ${
                          product.status === "active"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link
                      to={`/farmer/products/edit/${product._id}`}
                      className="flex-1 border rounded-xl py-3 flex justify-center items-center gap-2 hover:bg-gray-100"
                    >
                      <Pencil size={18} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleStatus(product._id, product.status)}
                      className={`flex-1 rounded-xl py-3 text-white flex justify-center items-center gap-2 ${
                        product.status === "active"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {product.status === "active" ? (
                        <>
                          <ToggleLeft size={18} />
                          Disable
                        </>
                      ) : (
                        <>
                          <ToggleRight size={18} />
                          Activate
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
