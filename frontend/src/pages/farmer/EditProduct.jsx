import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package,
  Boxes,
  IndianRupee,
  FileText,
  Upload,
  X,
  Save,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProductById, updateProduct } from "../../services/product.service";

const categories = [
  "Vegetables",
  "Fruits",
  "Grains",
  "Pulses",
  "Dairy",
  "Spices",
  "Herbs",
  "Seeds",
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    unit: "kg",
    status: "active",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);

      const product = data.product;

      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      });

      setExistingImages(product.images || []);
    } catch (err) {
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImages = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("unit", formData.unit);
      data.append("status", formData.status);

      data.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((image) => {
        data.append("images", image);
      });

      await updateProduct(id, data);

      toast.success("Product updated successfully");

      navigate("/farmer/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  // Shared input-wrapper styling (border, focus ring) so every icon+input
  // pair below looks consistent — pure Tailwind, no custom class needed.
  const inputWrap =
    "flex border border-slate-200 rounded-xl px-4 transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10";
  const fieldInput = "w-full px-4 py-4 outline-none bg-transparent text-slate-800 placeholder:text-slate-400";
  const label = "font-semibold block mb-2 text-slate-800";
  const selectCls =
    "w-full border border-slate-200 rounded-xl p-4 text-slate-800 outline-none transition-colors focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3 text-slate-500">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    // No background class here on purpose — the page background is already
    // handled globally in index.css, so this just sits on top of it.
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-lime-50 p-8">
          <h1 className="text-4xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-slate-500 mt-2">
            Update your product information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label className={label}>Product Name</label>

            <div className={inputWrap}>
              <Package className="mt-4 text-slate-400" size={20} />

              <input
                className={fieldInput}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={label}>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={selectCls}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={label}>Unit</label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className={selectCls}
              >
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
                <option value="piece">Piece</option>
                <option value="litre">Litre</option>
                <option value="bundle">Bundle</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={label}>Price</label>

              <div className={inputWrap}>
                <IndianRupee className="mt-4 text-slate-400" size={20} />

                <input
                  type="number"
                  className={fieldInput}
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className={label}>Quantity</label>

              <div className={inputWrap}>
                <Boxes className="mt-4 text-slate-400" size={20} />

                <input
                  type="number"
                  className={fieldInput}
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={label}>Description</label>

            <div className={inputWrap}>
              <FileText className="mt-4 text-slate-400" size={20} />

              <textarea
                rows={5}
                className={`${fieldInput} resize-none`}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className={label}>Current Images</label>

            {existingImages.length === 0 ? (
              <p className="text-sm text-slate-400 italic">
                No existing images.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden border border-slate-200 group"
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className={label}>Upload New Images</label>

            <label className="border-2 border-dashed border-slate-200 rounded-2xl h-44 flex flex-col justify-center items-center cursor-pointer text-slate-500 transition-colors hover:border-emerald-400 hover:bg-emerald-50/50">
              <Upload size={40} className="text-emerald-500" />

              <p className="mt-3 font-medium">Click to Upload</p>
              <p className="text-sm text-slate-400">JPG, PNG, WEBP</p>

              <input type="file" multiple hidden onChange={handleImages} />
            </label>

            {newImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {newImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden border border-slate-200 group"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Was `ap-btn-save`, a class that was never defined anywhere in
              this file — the button had no background/text color and would
              have rendered essentially invisible. Replaced with real
              Tailwind utility classes. */}
          <button
            type="submit"
            disabled={updating}
            className={`px-8 py-3 rounded-xl flex items-center gap-2 font-semibold text-white
              bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-600/20
              transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg`}
          >
            {updating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={20} />
                Update Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;