import { useState } from "react";
import { createProduct } from "../../services/product.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Package, Upload, IndianRupee, Boxes, FileText, Loader2, Save, X,
} from "lucide-react";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };

const categories = [
  "Vegetables", "Fruits", "Grains", "Seeds", "Fertilizers",
  "Equipment", "Others", "Pulses", "Spices", "Herbs", "Dairy",
];

// ── Shared primitives (same as AddService) ────────────────────────────────────
const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
    {children}
  </label>
);

const InputWrap = ({ icon, children }) => (
  <div className="flex items-center gap-3 px-4 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
    <span className="text-slate-400 dark:text-slate-500 shrink-0">{icon}</span>
    {children}
  </div>
);

const inputCls = "w-full py-3 outline-none bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500";

const Sel = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 text-slate-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm"
  >
    {children}
  </select>
);

// ── Component ─────────────────────────────────────────────────────────────────
const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages]   = useState([]);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name:        "",
    category:    "",
    price:       "",
    quantity:    "",
    unit:        "kg",
    description: "",
    status:      "active",
  });

  // ── Handlers (unchanged) ──────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const data = new FormData();
      data.append("name",        formData.name);
      data.append("category",    formData.category);
      data.append("price",       formData.price);
      data.append("quantity",    formData.quantity);
      data.append("unit",        formData.unit);
      data.append("description", formData.description);
      data.append("status",      formData.status);
      images.forEach((image) => data.append("images", image));
      await createProduct(data);
      toast.success("Product added successfully");
      navigate("/seller/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen  py-10">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-3xl mx-auto px-6">

        {/* ── Page Title ── */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent"
            style={display}
          >
            Add New Product
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add your fresh organic products to the marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Product Name ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Basic Information
            </h2>

            <div>
              <Label>Product Name</Label>
              <InputWrap icon={<Package size={18} />}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Organic Tomato"
                  className={inputCls}
                />
              </InputWrap>
            </div>

            {/* ── Category & Unit ── */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Sel name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </Sel>
              </div>
              <div>
                <Label>Unit</Label>
                <Sel name="unit" value={formData.unit} onChange={handleChange}>
                  <option value="kg">Kg</option>
                  <option value="gram">Gram</option>
                  <option value="piece">Piece</option>
                  <option value="litre">Litre</option>
                  <option value="dozen">Dozen</option>
                  <option value="bundle">Bundle</option>
                </Sel>
              </div>
            </div>
          </section>

          {/* ── Price & Quantity ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₹)</Label>
                <InputWrap icon={<IndianRupee size={18} />}>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="50"
                    className={inputCls}
                  />
                </InputWrap>
              </div>
              <div>
                <Label>Available Quantity</Label>
                <InputWrap icon={<Boxes size={18} />}>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="100"
                    className={inputCls}
                  />
                </InputWrap>
              </div>
            </div>
          </section>

          {/* ── Description ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Description
            </h2>
            <div>
              <Label>Product Description</Label>
              <div className="flex gap-3 px-4 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
                <FileText size={18} className="text-slate-400 dark:text-slate-500 mt-3.5 shrink-0" />
                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your organic product..."
                  className="w-full py-3 outline-none resize-none bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>
          </section>

          {/* ── Status ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 mb-4" style={display}>
              Visibility Status
            </h2>
            <div className="flex gap-4">
              {[
                { value: "active",   label: "✅ Active",   active: formData.status === "active"   },
                { value: "inactive", label: "⏸ Inactive", active: formData.status === "inactive" },
              ].map(({ value, label, active }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border cursor-pointer transition-all text-sm ${
                    active
                      ? value === "active"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold"
                        : "border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 font-semibold"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={formData.status === value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>

          {/* ── Images ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Product Images
            </h2>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-xl p-8 cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all">
              <Upload size={36} className="text-emerald-500" />
              <p className="mt-1 font-medium text-sm text-slate-700 dark:text-slate-300">
                Click to upload images
              </p>
              <span className="text-xs text-slate-400 dark:text-slate-500">JPG, PNG, WEBP</span>
              <input type="file" multiple hidden onChange={handleImages} />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {images.map((img, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="h-32 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Buttons ── */}
          <div className="flex justify-end gap-3">
            <button
              type="reset"
              disabled={creating}
              className="px-8 py-3 rounded-xl font-medium text-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="px-8 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 disabled:opacity-60 disabled:translate-y-0 transition-all duration-150 flex items-center gap-2"
            >
              {creating ? (
                <><Loader2 size={18} className="animate-spin" />Adding Product...</>
              ) : (
                <><Save size={18} />Add Product</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;