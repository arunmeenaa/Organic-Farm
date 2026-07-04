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

// A different palette from the rest of the app: deep pine + burnt clay
// on a soft stone background, with a slab serif for a rustic market feel.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .mp-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #EFECE4; }
    .mp-display { font-family: 'Zilla Slab', Georgia, serif; }
    .mp-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .mp-add-btn {
      background: #C4623B;
      color: #FFFFFF;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .mp-add-btn:hover { background: #A94F2E; }
    .mp-add-btn:active { transform: scale(0.98); }

    .mp-empty {
      background: #FFFFFF;
      border: 1px solid #DCD5C6;
    }

    .mp-card {
      background: #FFFFFF;
      border: 1px solid #DCD5C6;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .mp-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 36px -18px rgba(20, 51, 45, 0.35);
    }

    .mp-row-icon { color: #14332D; }

    .mp-status-active { color: #14332D; }
    .mp-status-inactive { color: #C4623B; }

    .mp-edit-btn {
      border: 1px solid #DCD5C6;
      color: #14332D;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .mp-edit-btn:hover { background: #F4F1E9; border-color: #C7BFA9; }

    .mp-toggle-active {
      background: #C4623B;
      color: #FFFFFF;
      transition: background 0.15s ease;
    }
    .mp-toggle-active:hover { background: #A94F2E; }

    .mp-toggle-inactive {
      background: #14332D;
      color: #FFFFFF;
      transition: background 0.15s ease;
    }
    .mp-toggle-inactive:hover { background: #1E4A41; }
  `}</style>
);

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
      <div className="mp-root min-h-screen flex justify-center items-center text-xl">
        <FontImport />
        Loading products...
      </div>
    );
  }

  return (
    <div className="mp-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="mp-display text-4xl font-semibold" style={{ color: "#14332D" }}>
              My Products
            </h1>

            <p className="mt-2" style={{ color: "#8A8272" }}>
              Manage all your listed products.
            </p>
          </div>

          <Link
            to="/farmer/products/add"
            className="mp-add-btn px-5 py-3 rounded-xl flex items-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mp-empty rounded-3xl p-20 text-center">
            <Package size={70} className="mx-auto" style={{ color: "#C7BFA9" }} />

            <h2 className="mp-display text-3xl font-semibold mt-5" style={{ color: "#14332D" }}>
              No Products Yet
            </h2>

            <p className="mt-3" style={{ color: "#8A8272" }}>
              Start selling by adding your first product.
            </p>

            <Link
              to="/farmer/products/add"
              className="mp-add-btn inline-flex mt-8 px-6 py-3 rounded-xl font-medium"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="mp-card rounded-3xl overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="mp-display text-2xl font-semibold" style={{ color: "#14332D" }}>
                    {product.name}
                  </h2>

                  <p className="mt-2" style={{ color: "#8A8272" }}>
                    {product.category}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between" style={{ color: "#2B2B28" }}>
                      <span className="mp-row-icon flex items-center gap-2">
                        <IndianRupee size={18} />
                        Price
                      </span>

                      <span className="mp-mono font-semibold">
                        ₹{product.price}/{product.unit}
                      </span>
                    </div>

                    <div className="flex justify-between" style={{ color: "#2B2B28" }}>
                      <span className="mp-row-icon flex items-center gap-2">
                        <Boxes size={18} />
                        Stock
                      </span>

                      <span className="mp-mono font-semibold">{product.quantity}</span>
                    </div>

                    <div className="flex justify-between" style={{ color: "#2B2B28" }}>
                      <span>Status</span>

                      <span
                        className={`font-semibold capitalize ${
                          product.status === "active"
                            ? "mp-status-active"
                            : "mp-status-inactive"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link
                      to={`/farmer/products/edit/${product._id}`}
                      className="mp-edit-btn flex-1 rounded-xl py-3 flex justify-center items-center gap-2 font-medium"
                    >
                      <Pencil size={18} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleStatus(product._id, product.status)}
                      className={`flex-1 rounded-xl py-3 flex justify-center items-center gap-2 font-medium ${
                        product.status === "active"
                          ? "mp-toggle-active"
                          : "mp-toggle-inactive"
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