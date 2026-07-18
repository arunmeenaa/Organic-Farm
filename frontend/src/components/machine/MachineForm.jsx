import { useEffect, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { notify } from "../../utils/toast";
import {
  createMachine,
  updateMachine,
  getMachineById,
} from "../../services/machine.service";
import { useNavigate, useParams } from "react-router-dom";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };

const categories = [
  "Tractor", "Harvester", "Rotavator", "Cultivator", "Seeder",
  "Planter", "Sprayer", "Thresher", "Power Tiller", "Water Pump",
  "Mini Tractor", "Drone", "Other",
];

const initialForm = {
  name:        "",
  category:    "",
  description: "",
  rentalType:  "machine_only",
  pricingType: "per_day",
  price:       "",
  quantity:    1,
  specifications: {
    brand:             "",
    model:             "",
    horsepower:        "",
    fuelType:          "",
    manufacturingYear: "",
  },
  location: {
    village:  "",
    district: "",
    state:    "",
    pincode:  "",
  },
};

// ── Shared primitives ─────────────────────────────────────────────────────────
const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
    {children}
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

const ErrorMsg = ({ msg }) =>
  msg ? <p className="mt-1.5 text-xs font-medium text-rose-500">{msg}</p> : null;

// ── Component ─────────────────────────────────────────────────────────────────
const MachineForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id }   = useParams();

  const [formData, setFormData]         = useState(initialForm);
  const [images, setImages]             = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [errors, setErrors]             = useState({});

  useEffect(() => {
    if (mode !== "edit") return;
    fetchMachine();
  }, []);

  // ── All handlers unchanged ────────────────────────────────────────────────
  const fetchMachine = async () => {
    try {
      setLoading(true);
      const { data } = await getMachineById(id);
      const machine  = data.machine;
      setFormData({
        name:           machine.name,
        category:       machine.category,
        description:    machine.description,
        rentalType:     machine.rentalType,
        pricingType:    machine.pricingType,
        price:          machine.price,
        quantity:       machine.quantity,
        specifications: machine.specifications,
        location:       machine.location,
      });
      setPreviewImages(machine.images);
    } catch (err) {
      notify.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecification = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [name]: value },
    }));
  };

  const handleLocation = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.length + previewImages.length > 5) {
      notify.error("Maximum 5 images allowed.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())           newErrors.name        = "Machine name required";
    if (!formData.category)              newErrors.category    = "Category required";
    if (formData.description.length < 30) newErrors.description = "Description should be at least 30 characters.";
    if (!formData.price)                 newErrors.price       = "Price required";
    if (previewImages.length === 0)      newErrors.images      = "Upload at least one image.";
    if (!formData.location.village)      newErrors.village     = "Village required.";
    if (!formData.location.district)     newErrors.district    = "District required.";
    if (!formData.location.state)        newErrors.state       = "State required.";
    if (!formData.location.pincode)      newErrors.pincode     = "Pincode required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "specifications" || key === "location") {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });
      images.forEach((image) => data.append("images", image));
      if (mode === "create") {
        await createMachine(data);
        notify.success("Machine Added Successfully");
      } else {
        await updateMachine(id, data);
        notify.success("Machine Updated Successfully");
      }
      navigate("/seller/inventory");
    } catch (err) {
      notify.error(err.response?.data?.message);
    } finally {
      setLoading(false);
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
            {mode === "create" ? "Add Machine" : "Edit Machine"}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Fill in the details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Basic Details ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Basic Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Machine Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Deere Tractor"
                />
                <ErrorMsg msg={errors.name} />
              </div>

              <div>
                <Label>Category</Label>
                <Sel name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </Sel>
                <ErrorMsg msg={errors.category} />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the machine, its condition, and use case..."
                className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-emerald-100 dark:border-emerald-900/40 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm resize-none"
              />
              <ErrorMsg msg={errors.description} />
            </div>
          </section>

          {/* ── Images ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Images
            </h2>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 rounded-xl p-8 cursor-pointer hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all">
              <Upload size={32} className="text-emerald-500" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload up to 5 images</p>
              <span className="text-xs text-slate-400 dark:text-slate-500">JPG, PNG, WEBP</span>
              <input hidden multiple type="file" accept="image/*" onChange={handleImages} />
            </label>
            <ErrorMsg msg={errors.images} />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={img} alt="" className="h-24 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Rental & Pricing ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Rental & Pricing
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Rental Type</Label>
                <Sel name="rentalType" value={formData.rentalType} onChange={handleChange}>
                  <option value="machine_only">Machine Only</option>
                  <option value="with_operator">With Operator</option>
                </Sel>
              </div>

              <div>
                <Label>Pricing Type</Label>
                <Sel name="pricingType" value={formData.pricingType} onChange={handleChange}>
                  <option value="per_day">Per Day</option>
                  <option value="per_hour">Per Hour</option>
                  <option value="per_acre">Per Acre</option>
                </Sel>
              </div>

              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                />
                <ErrorMsg msg={errors.price} />
              </div>
            </div>
          </section>

          {/* ── Specifications ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Specifications
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Brand</Label>
                <Input
                  name="brand"
                  value={formData.specifications.brand}
                  onChange={handleSpecification}
                  placeholder="e.g. Mahindra"
                />
              </div>

              <div>
                <Label>Model</Label>
                <Input
                  name="model"
                  value={formData.specifications.model}
                  onChange={handleSpecification}
                  placeholder="e.g. 575 DI"
                />
              </div>

              <div>
                <Label>Horsepower (HP)</Label>
                <Input
                  type="number"
                  name="horsepower"
                  value={formData.specifications.horsepower}
                  onChange={handleSpecification}
                  placeholder="e.g. 45"
                />
              </div>

              <div>
                <Label>Fuel Type</Label>
                <Sel name="fuelType" value={formData.specifications.fuelType} onChange={handleSpecification}>
                  <option value="">Select Fuel Type</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                </Sel>
              </div>

              <div>
                <Label>Manufacturing Year</Label>
                <Input
                  type="number"
                  name="manufacturingYear"
                  value={formData.specifications.manufacturingYear}
                  onChange={handleSpecification}
                  placeholder="e.g. 2019"
                />
              </div>
            </div>
          </section>

          {/* ── Location ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Location
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["village",  "Village"],
                ["district", "District"],
                ["state",    "State"],
                ["pincode",  "Pincode"],
              ].map(([name, label]) => (
                <div key={name}>
                  <Label>{label}</Label>
                  <Input
                    name={name}
                    value={formData.location[name]}
                    onChange={handleLocation}
                    placeholder={label}
                  />
                  <ErrorMsg msg={errors[name]} />
                </div>
              ))}
            </div>
          </section>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 disabled:opacity-60 disabled:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {mode === "create" ? "Add Machine" : "Update Machine"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default MachineForm;