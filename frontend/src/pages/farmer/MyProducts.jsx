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

// Matches Navbar/Hero: glassmorphism over an emerald → lime gradient mesh,
// Space Grotesk display type, amber accent for the toggle-off state.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .mp-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .mp-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .mp-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .mp-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .mp-add-btn {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .mp-add-btn:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
    .mp-add-btn:active { transform: translateY(0); }

    .mp-empty {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .mp-card {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .mp-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -18px rgba(6, 95, 70, 0.3);
    }

    .mp-row-icon { color: #065F46; }

    .mp-status-active { color: #059669; }
    .mp-status-inactive { color: #D97706; }

    .mp-edit-btn {
      border: 1px solid rgba(5, 150, 105, 0.25);
      color: #065F46;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .mp-edit-btn:hover { background: rgba(5, 150, 105, 0.08); border-color: rgba(5, 150, 105, 0.4); }

    .mp-toggle-active {
      background: linear-gradient(90deg, #F59E0B, #D97706);
      color: white;
      transition: transform 0.15s ease;
    }
    .mp-toggle-active:hover { transform: translateY(-1px); }

    .mp-toggle-inactive {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      transition: transform 0.15s ease;
    }
    .mp-toggle-inactive:hover { transform: translateY(-1px); }
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
            <h1 className="mp-display mp-title-gradient text-4xl font-bold">
              My Products
            </h1>

            <p className="mt-2" style={{ color: "#7A8D82" }}>
              Manage all your listed products.
            </p>
          </div>

          <Link
            to="/farmer/products/add"
            className="mp-add-btn px-5 py-3 rounded-xl flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mp-empty rounded-3xl p-20 text-center">
            <Package size={70} className="mx-auto" style={{ color: "#B7C9BB" }} />

            <h2 className="mp-display text-3xl font-semibold mt-5" style={{ color: "#0F2E22" }}>
              No Products Yet
            </h2>

            <p className="mt-3" style={{ color: "#7A8D82" }}>
              Start selling by adding your first product.
            </p>

            <Link
              to="/farmer/products/add"
              className="mp-add-btn inline-flex mt-8 px-6 py-3 rounded-xl font-semibold"
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
                  <h2 className="mp-display text-2xl font-semibold" style={{ color: "#0F2E22" }}>
                    {product.name}
                  </h2>

                  <p className="mt-2" style={{ color: "#7A8D82" }}>
                    {product.category}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between" style={{ color: "#1E2A22" }}>
                      <span className="mp-row-icon flex items-center gap-2">
                        <IndianRupee size={18} />
                        Price
                      </span>

                      <span className="mp-mono font-semibold">
                        ₹{product.price}/{product.unit}
                      </span>
                    </div>

                    <div className="flex justify-between" style={{ color: "#1E2A22" }}>
                      <span className="mp-row-icon flex items-center gap-2">
                        <Boxes size={18} />
                        Stock
                      </span>

                      <span className="mp-mono font-semibold">{product.quantity}</span>
                    </div>

                    <div className="flex justify-between" style={{ color: "#1E2A22" }}>
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