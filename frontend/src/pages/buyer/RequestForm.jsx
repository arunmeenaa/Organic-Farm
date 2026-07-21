import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ClipboardList,
  Sprout,
  MapPin,
  Image as ImageIcon,
  IndianRupee,
  Loader2,
  CalendarDays,
} from "lucide-react";

import { createServiceRequest } from "../../services/serviceRequest.service";
import { useTheme } from "../../context/ThemeContext";

const CATEGORIES = [
  "Harvesting", "Seeding", "Ploughing", "Land Preparation", "Spraying",
  "Transportation", "Irrigation", "Fertilizer Application", "Threshing",
  "Crop Cutting", "Other",
];

const PRICING_TYPES = [
  { value: "per_acre",    label: "Per Acre"    },
  { value: "per_hectare", label: "Per Hectare" },
  { value: "per_day",     label: "Per Day"     },
  { value: "per_hour",    label: "Per Hour"    },
  { value: "per_trip",    label: "Per Trip"    },
  { value: "per_km",      label: "Per KM"      },
  { value: "fixed",       label: "Fixed Price" },
];

export default function CreateServiceRequest() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: "", category: "", description: "",
    landArea: "", unit: "acre",
    requiredDate: "",
    village: "", district: "", state: "", pincode: "",
    expiresAt: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImages = (e) => setImages(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      images.forEach((image) => data.append("images", image));
      await createServiceRequest(data);
      toast.success("Service request created successfully");
      navigate("/request-service");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create service request");
    } finally {
      setLoading(false);
    }
  };

  /* Shared class builders */
  const card = [
    "rounded-2xl border p-6 backdrop-blur-sm",
    darkMode
      ? "bg-white/[0.04] border-[rgba(52,211,153,0.12)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]"
      : "bg-white/80 border-[rgba(6,95,70,0.10)] shadow-[0_8px_24px_-12px_rgba(5,150,105,0.18)]",
  ].join(" ");

  const sectionTitle = [
    "flex items-center gap-2 text-base font-bold mb-5",
    darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
  ].join(" ");

  const iconCls = darkMode ? "text-[#34D399]" : "text-[#059669]";

  // FIXED: added `border` utility, text color, placeholder color, focus ring
  const inputCls = [
    "w-full rounded-xl py-3 px-4 text-sm font-medium outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.18)] text-[#D1FAE5] placeholder:text-[rgba(167,243,208,0.35)] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)]"
      : "bg-white border border-[rgba(6,95,70,0.14)] text-[#064E3B] placeholder:text-[rgba(6,95,70,0.35)] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  const selectCls = [
    inputCls,
    "cursor-pointer",
    darkMode ? "[&>option]:bg-[#0B1A12] [&>option]:text-[#D1FAE5]" : "",
  ].join(" ");

  const labelCls = [
    "block text-xs font-semibold uppercase tracking-wider mb-1.5",
    darkMode ? "text-[rgba(167,243,208,0.55)]" : "text-[rgba(6,95,70,0.55)]",
  ].join(" ");

  return (
    <div className={[
      "min-h-screen pb-16 px-4 pt-8 transition-colors duration-300",
      darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
    ].join(" ")}>

      {/* Page header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className={[
          "text-3xl font-extrabold tracking-tight bg-clip-text text-transparent font-['Space_Grotesk',ui-sans-serif,sans-serif]",
          darkMode
            ? "bg-gradient-to-r from-[#34D399] to-[#A3E635]"
            : "bg-gradient-to-r from-[#065F46] to-[#65A30D]",
        ].join(" ")}>
          Post a Service Request
        </h1>
        <p className={[
          "mt-1.5 text-sm font-medium",
          darkMode ? "text-[rgba(167,243,208,0.50)]" : "text-[rgba(6,95,70,0.50)]",
        ].join(" ")}>
          Describe what farm work you need done — sellers will send you quotations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">

        {/* Basic Information */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <ClipboardList size={18} className={iconCls} /> Basic Information
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Request Title</label>
              <input
                name="title"
                placeholder="e.g. Need Wheat Harvesting"
                value={form.title}
                onChange={handleChange}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={selectCls}
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe the work needed, field condition, crop type, timing, etc."
                value={form.description}
                onChange={handleChange}
                required
                className={inputCls + " resize-none leading-relaxed"}
              />
            </div>
          </div>
        </div>

        {/* Area */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <Sprout size={18} className={iconCls} /> Area
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Land Area</label>
              <div className=" grid gap-5">
                <input
                  type="number"
                  name="landArea"
                  placeholder="e.g. 5"
                  value={form.landArea}
                  onChange={handleChange}
                  required
                  className={inputCls}
                />
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className={selectCls + " w-36 flex-shrink-0"}
                >
                  <option value="acre">Acre</option>
                  <option value="hectare">Hectare</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Required By Date</label>
              <div className="relative">
                <CalendarDays
                  size={15}
                  className={[
                    "absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none",
                    darkMode ? "text-[rgba(52,211,153,0.50)]" : "text-[rgba(6,95,70,0.45)]",
                  ].join(" ")}
                />
                <input
                  type="date"
                  name="requiredDate"
                  value={form.requiredDate}
                  onChange={handleChange}
                  required
                  className={inputCls + " pl-9"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <MapPin size={18} className={iconCls} /> Location
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: "village",  placeholder: "e.g. Rampur",        label: "Village"  },
              { name: "district", placeholder: "e.g. Lucknow",       label: "District" },
              { name: "state",    placeholder: "e.g. Uttar Pradesh", label: "State"    },
              { name: "pincode",  placeholder: "e.g. 226001",        label: "Pincode"  },
            ].map(({ name, placeholder, label }) => (
              <div key={name}>
                <label className={labelCls}>{label}</label>
                <input
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className={card}>
          <h2 className={sectionTitle}>
            <ImageIcon size={18} className={iconCls} />
            Field Images
            <span className={[
              "text-xs font-normal normal-case tracking-normal",
              darkMode ? "text-[rgba(167,243,208,0.40)]" : "text-[rgba(6,95,70,0.40)]",
            ].join(" ")}>(optional)</span>
          </h2>
          <label className={[
            "flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors duration-150",
            darkMode
              ? "border-[rgba(52,211,153,0.20)] hover:border-[rgba(52,211,153,0.40)] hover:bg-white/[0.04]"
              : "border-[rgba(6,95,70,0.18)] hover:border-[rgba(6,95,70,0.35)] hover:bg-white/60",
          ].join(" ")}>
            <ImageIcon
              size={24}
              className={darkMode ? "text-[rgba(52,211,153,0.40)]" : "text-[rgba(6,95,70,0.30)]"}
            />
            <span className={[
              "mt-2 text-sm font-medium",
              darkMode ? "text-[rgba(167,243,208,0.45)]" : "text-[rgba(6,95,70,0.45)]",
            ].join(" ")}>
              {images.length > 0
                ? `${images.length} file${images.length > 1 ? "s" : ""} selected`
                : "Click to upload images"}
            </span>
            <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
          </label>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {images.map((img, i) => (
                <span
                  key={i}
                  className={[
                    "text-xs px-3 py-1 rounded-full font-medium",
                    darkMode
                      ? "bg-[rgba(52,211,153,0.10)] text-[#6EE7B7]"
                      : "bg-[rgba(5,150,105,0.08)] text-[#065F46]",
                  ].join(" ")}
                >
                  {img.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={[
              "px-6 py-3 rounded-xl font-bold text-sm border transition-all duration-150",
              darkMode
                ? "border-[rgba(52,211,153,0.15)] text-[rgba(167,243,208,0.60)] hover:bg-white/[0.05] hover:text-[#D1FAE5]"
                : "border-[rgba(6,95,70,0.15)] text-[rgba(6,95,70,0.55)] hover:bg-white/80 hover:text-[#064E3B]",
            ].join(" ")}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={[
              "px-8 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 transition-all duration-150",
              "bg-gradient-to-r from-emerald-600 to-lime-500",
              "shadow-[0_8px_18px_-6px_rgba(5,150,105,0.45)]",
              "hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-6px_rgba(5,150,105,0.55)]",
              "disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Posting...</>
              : "Post Request"}
          </button>
        </div>

      </form>
    </div>
  );
}