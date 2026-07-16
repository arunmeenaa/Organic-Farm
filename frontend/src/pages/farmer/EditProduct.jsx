import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package, Boxes, IndianRupee, FileText, Upload, X, Save, Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, updateProduct } from "../../services/product.service";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };

const categories = [
  "Vegetables", "Fruits", "Grains", "Pulses",
  "Dairy", "Spices", "Herbs", "Seeds",
];

// ── Shared primitives ─────────────────────────────────────────────────────────
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

const ImageGrid = ({ images, onRemove }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {images.map((src, index) => (
      <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <img
          src={typeof src === "string" ? src : URL.createObjectURL(src)}
          alt=""
          className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-1.5 right-1.5 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={13} />
        </button>
      </div>
    ))}
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────
const EditProduct = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]               = useState(true);
  const [updating, setUpdating]             = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages]           = useState([]);

  const [formData, setFormData] = useState({
    name:        "",
    category:    "",
    description: "",
    price:       "",
    quantity:    "",
    unit:        "kg",
    status:      "active",
  });

  // ── All handlers unchanged ────────────────────────────────────────────────
  useEffect(() => { fetchProduct(); }, []);

  const fetchProduct = async () => {
    try {
      const { data }  = await getProductById(id);
      const product   = data.product;
      setFormData({
        name:        product.name,
        category:    product.category,
        description: product.description,
        price:       product.price,
        quantity:    product.quantity,
        unit:        product.unit,
        status:      product.status,
      });
      setExistingImages(product.images || []);
    } catch {
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      data.append("name",           formData.name);
      data.append("category",       formData.category);
      data.append("description",    formData.description);
      data.append("price",          formData.price);
      data.append("quantity",       formData.quantity);
      data.append("unit",           formData.unit);
      data.append("status",         formData.status);
      data.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((image) => data.append("images", image));
      await updateProduct(id, data);
      toast.success("Product updated successfully");
      navigate("/farmer/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-emerald-500" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading product...</p>
      </div>
    );
  }

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
            Edit Product
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your product information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Basic Info ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Basic Information
            </h2>

            <div>
              <Label>Product Name</Label>
              <InputWrap icon={<Package size={18} />}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Organic Tomato"
                  className={inputCls}
                />
              </InputWrap>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Sel name="category" value={formData.category} onChange={handleChange}>
                  {categories.map((cat) => <option key={cat}>{cat}</option>)}
                </Sel>
              </div>
              <div>
                <Label>Unit</Label>
                <Sel name="unit" value={formData.unit} onChange={handleChange}>
                  <option value="kg">Kg</option>
                  <option value="gram">Gram</option>
                  <option value="piece">Piece</option>
                  <option value="litre">Litre</option>
                  <option value="bundle">Bundle</option>
                </Sel>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <InputWrap icon={<FileText size={18} />}>
                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  className={`${inputCls} resize-none`}
                />
              </InputWrap>
            </div>
          </section>

          {/* ── Pricing & Stock ── */}
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
                    placeholder="e.g. 50"
                    className={inputCls}
                  />
                </InputWrap>
              </div>
              <div>
                <Label>Quantity</Label>
                <InputWrap icon={<Boxes size={18} />}>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 100"
                    className={inputCls}
                  />
                </InputWrap>
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
                { value: "active",   label: "✅ Active"   },
                { value: "inactive", label: "⏸ Inactive" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border cursor-pointer transition-all text-sm ${
                    formData.status === value
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

          {/* ── Current Images ── */}
          {existingImages.length > 0 && (
            <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
                Current Images
              </h2>
              <ImageGrid images={existingImages} onRemove={removeExistingImage} />
            </section>
          )}

          {/* ── Upload New Images ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Upload New Images <span className="text-xs font-normal text-slate-400">(optional)</span>
            </h2>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-xl p-8 cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all">
              <Upload size={32} className="text-emerald-500" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to Upload</p>
              <span className="text-xs text-slate-400 dark:text-slate-500">JPG, PNG, WEBP</span>
              <input type="file" multiple hidden onChange={handleImages} />
            </label>

            {newImages.length > 0 && (
              <ImageGrid images={newImages} onRemove={removeNewImage} />
            )}
          </section>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={updating}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 disabled:opacity-60 disabled:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2"
          >
            {updating
              ? <><Loader2 size={18} className="animate-spin" />Updating...</>
              : <><Save size={18} />Update Product</>
            }
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;