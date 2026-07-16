import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tractor, IndianRupee, FileText, Upload, X, Save, Wrench, MapPin, Boxes,
} from "lucide-react";
import toast from "react-hot-toast";
import { getMachineById, updateMachine } from "../../services/machine.service";

const display = { fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif" };

const categories = [
  "Tractor", "Harvester", "Rotavator", "Cultivator", "Seeder",
  "Planter", "Sprayer", "Power Tiller", "Drone", "Other",
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

// ── Component ─────────────────────────────────────────────────────────────────
const EditMachine = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [loading, setLoading]               = useState(true);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages]           = useState([]);
  const [newPreviews, setNewPreviews]       = useState([]);

  const [formData, setFormData] = useState({
    name:               "",
    category:           "",
    description:        "",
    rentalType:         "machine_only",
    pricingType:        "per_day",
    price:              "",
    quantity:           "",
    availabilityStatus: "available",
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
  });

  // ── All handlers unchanged ────────────────────────────────────────────────
  useEffect(() => { fetchMachine(); }, []);

  const fetchMachine = async () => {
    try {
      const { data }  = await getMachineById(id);
      const machine   = data.machine;
      setFormData({
        name:               machine.name,
        category:           machine.category,
        description:        machine.description,
        rentalType:         machine.rentalType,
        pricingType:        machine.pricingType,
        price:              machine.price,
        quantity:           machine.quantity,
        availabilityStatus: machine.availabilityStatus,
        specifications:     machine.specifications,
        location:           machine.location,
      });
      setExistingImages(machine.images || []);
    } catch {
      toast.error("Failed to fetch machine");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSpecification = (e) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [e.target.name]: e.target.value },
    }));
  };

  const handleLocation = (e) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [e.target.name]: e.target.value },
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    setNewPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewPreviews(newPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name",               formData.name);
      data.append("category",           formData.category);
      data.append("description",        formData.description);
      data.append("price",              formData.price);
      data.append("quantity",           formData.quantity);
      data.append("rentalType",         formData.rentalType);
      data.append("pricingType",        formData.pricingType);
      data.append("availabilityStatus", formData.availabilityStatus);
      data.append("specifications",     JSON.stringify(formData.specifications));
      data.append("location",           JSON.stringify(formData.location));
      data.append("existingImages",     JSON.stringify(existingImages));
      newImages.forEach((image) => data.append("images", image));
      await updateMachine(id, data);
      toast.success("Machine updated successfully");
      navigate("/farmer/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update Machine");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <p className="text-emerald-600 dark:text-emerald-400 font-semibold animate-pulse">
          Loading machine details...
        </p>
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
            Edit Machine
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your machine information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Basic Details ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Basic Details
            </h2>

            <div>
              <Label>Machine Name</Label>
              <InputWrap icon={<Tractor size={18} />}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Deere 5050D"
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
                <Label>Rental Type</Label>
                <Sel name="rentalType" value={formData.rentalType} onChange={handleChange}>
                  <option value="machine_only">Machine Only</option>
                  <option value="with_operator">With Operator</option>
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
                  placeholder="Describe the machine, its condition and use case..."
                  className={`${inputCls} resize-none`}
                />
              </InputWrap>
            </div>
          </section>

          {/* ── Pricing & Availability ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
              Pricing & Availability
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pricing Type</Label>
                <Sel name="pricingType" value={formData.pricingType} onChange={handleChange}>
                  <option value="per_hour">Per Hour</option>
                  <option value="per_day">Per Day</option>
                  <option value="per_acre">Per Acre</option>
                </Sel>
              </div>

              <div>
                <Label>Price (₹)</Label>
                <InputWrap icon={<IndianRupee size={18} />}>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 1500"
                    className={inputCls}
                  />
                </InputWrap>
              </div>

              <div>
                <Label>Quantity Available</Label>
                <InputWrap icon={<Boxes size={18} />}>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 1"
                    className={inputCls}
                  />
                </InputWrap>
              </div>

              <div>
                <Label>Availability Status</Label>
                <Sel name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange}>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </Sel>
              </div>
            </div>
          </section>

          {/* ── Specifications ── */}
          <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-2" style={display}>
              <Wrench size={18} className="text-emerald-500" /> Specifications
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
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-2" style={display}>
              <MapPin size={18} className="text-emerald-500" /> Machine Location
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
                </div>
              ))}
            </div>
          </section>

          {/* ── Current Images ── */}
          {existingImages.length > 0 && (
            <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300" style={display}>
                Current Images
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={image} alt="" className="h-32 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
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

            {newPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {newPreviews.map((src, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={src} alt="" className="h-32 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Submit ── */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/40 hover:-translate-y-0.5 hover:shadow-emerald-500/60 transition-all duration-150 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Update Machine
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditMachine;