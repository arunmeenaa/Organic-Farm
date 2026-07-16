import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createService } from "../../services/service.service";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };

// ── Category → allowed pricing types ─────────────────────────────────────────
// Only values the backend enum accepts: per_acre | per_hectare | per_hour | per_day | fixed
const CATEGORY_PRICING = {
  "Land Preparation": [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_day", label: "Per Day" },
    { value: "per_hour", label: "Per Hour" },
  ],
  Ploughing: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
  ],
  Rotavator: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
  ],
  Seeding: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
  ],
  Transplanting: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_day", label: "Per Day" },
  ],
  Irrigation: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hour", label: "Per Hour" },
    { value: "fixed", label: "Fixed Price" },
  ],
  Spraying: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
  ],
  "Fertilizer Application": [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
  ],
  Harvesting: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
  ],
  Transportation: [
    { value: "per_day", label: "Per Day" },
    { value: "fixed", label: "Fixed Price" },
    { value: "per_km", label: "Per Kilometer" },
  ],
  Threshing: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "fixed", label: "Fixed Price" },
  ],
  Others: [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
    { value: "per_day", label: "Per Day" },
    { value: "fixed", label: "Fixed Price" },
  ],
};

const ALL_CATEGORIES = Object.keys(CATEGORY_PRICING);

// Returns allowed pricing options for the selected category (or all if none selected)
const getPricingOptions = (category) =>
  CATEGORY_PRICING[category] ?? [
    { value: "per_acre", label: "Per Acre" },
    { value: "per_hectare", label: "Per Hectare" },
    { value: "per_hour", label: "Per Hour" },
    { value: "per_day", label: "Per Day" },
    { value: "fixed", label: "Fixed Price" },
  ];

// ── Shared primitives ─────────────────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
    {children}
    {required && <span className="text-rose-500 ml-0.5">*</span>}
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm"
  />
);

const Sel = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 text-slate-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm"
  >
    {children}
  </select>
);

const AddService = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    pricingType: "per_acre",
    price: "",
    machineIncluded: true,
    operatorIncluded: true,
    availability: true,
    images: [],
    village: "",
    district: "",
    state: "",
    pincode: "",
  });

  // Derived — options that are valid for the current category
  const pricingOptions = getPricingOptions(form.category);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const selected = Array.from(files);
      setForm((p) => ({ ...p, images: selected }));
      setPreviewImages(selected.map((f) => URL.createObjectURL(f)));
      return;
    }
    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }

    // When category changes, reset pricingType to the first valid option
    if (name === "category") {
      const firstOption =
        (CATEGORY_PRICING[value] ?? [])[0]?.value ?? "per_acre";
      setForm((p) => ({ ...p, category: value, pricingType: firstOption }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const removeImage = (idx) => {
    setPreviewImages((p) => p.filter((_, i) => i !== idx));
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.description || !form.price) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!form.village || !form.district || !form.state || !form.pincode) {
      toast.error("All location fields are required");
      return;
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("pricingType", form.pricingType);
      fd.append("price", form.price);
      fd.append("machineIncluded", form.machineIncluded);
      fd.append("operatorIncluded", form.operatorIncluded);
      fd.append("availability", form.availability);
      fd.append("village", form.village);
      fd.append("district", form.district);
      fd.append("state", form.state);
      fd.append("pincode", form.pincode);
      form.images.forEach((f) => fd.append("images", f));
      await createService(fd);
      toast.success("Service created successfully!");
      navigate("/farmer/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create service");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-emerald-900 to-lime-600 dark:from-emerald-400 dark:to-lime-400 bg-clip-text text-transparent"
            style={display}
          >
            Add New Service
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            List your agricultural service and reach farmers nearby.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Basic Info ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2
              className="text-lg font-semibold text-emerald-900 dark:text-emerald-300"
              style={display}
            >
              Basic Information
            </h2>
            <div>
              <Label required>Service Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Wheat Harvesting"
                required
              />
            </div>
            <div>
              <Label required>Category</Label>
              <Sel
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Sel>
            </div>
            <div>
              <Label required>Description</Label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe what your service includes..."
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm resize-none"
              />
            </div>
          </section>

          {/* ── Pricing — options change with category ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <h2
                className="text-lg font-semibold text-emerald-900 dark:text-emerald-300"
                style={display}
              >
                Pricing
              </h2>
              {form.category && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  {pricingOptions.length} option
                  {pricingOptions.length !== 1 ? "s" : ""} for {form.category}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label required>Pricing Type</Label>
                {/* Renders only options valid for the selected category */}
                <Sel
                  name="pricingType"
                  value={form.pricingType}
                  onChange={handleChange}
                  required
                >
                  {pricingOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Sel>
                {!form.category && (
                  <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                    Select a category to see relevant pricing options.
                  </p>
                )}
              </div>
              <div>
                <Label required>Price (₹)</Label>
                <Input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 2200"
                  required
                />
              </div>
            </div>
          </section>

          {/* ── Inclusions ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
            <h2
              className="text-lg font-semibold text-emerald-900 dark:text-emerald-300"
              style={display}
            >
              Inclusions
            </h2>
            {[
              { name: "machineIncluded", label: "Machine Included" },
              { name: "operatorIncluded", label: "Operator Included" },
            ].map(({ name, label }) => (
              <label
                key={name}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form[name]
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
                  }`}
                >
                  {form[name] && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {label}
                </span>
              </label>
            ))}
          </section>

          {/* ── Location ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2
              className="text-lg font-semibold text-emerald-900 dark:text-emerald-300"
              style={display}
            >
              Location
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label required>Village</Label>
                <Input
                  name="village"
                  value={form.village}
                  onChange={handleChange}
                  placeholder="Village name"
                  required
                />
              </div>
              <div>
                <Label required>District</Label>
                <Input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="District"
                  required
                />
              </div>
              <div>
                <Label required>State</Label>
                <Input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <Label required>Pincode</Label>
                <Input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  required
                />
              </div>
            </div>
          </section>

          {/* ── Images ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
            <h2
              className="text-lg font-semibold text-emerald-900 dark:text-emerald-300"
              style={display}
            >
              Images
            </h2>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-xl p-8 cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all">
              <ImagePlus size={28} className="text-emerald-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Click to upload images
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                PNG, JPG — up to 5 files
              </span>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="sr-only"
              />
            </label>
            {previewImages.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {previewImages.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt=""
                      className="h-20 w-20 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Availability ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6">
            <h2
              className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 mb-4"
              style={display}
            >
              Availability
            </h2>
            <div className="flex gap-4">
              <label
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border cursor-pointer transition-all text-sm ${form.availability === true ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-300"}`}
              >
                <input
                  type="radio"
                  checked={form.availability === true}
                  onChange={() =>
                    setForm((p) => ({ ...p, availability: true }))
                  }
                  className="sr-only"
                />
                ✅ Available
              </label>
              <label
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border cursor-pointer transition-all text-sm ${form.availability === false ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 font-semibold" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-rose-300"}`}
              >
                <input
                  type="radio"
                  checked={form.availability === false}
                  onChange={() =>
                    setForm((p) => ({ ...p, availability: false }))
                  }
                  className="sr-only"
                />
                ⏸ Unavailable
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 disabled:opacity-60 disabled:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create Service"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
