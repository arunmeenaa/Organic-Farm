import { useEffect, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { notify } from "../../utils/toast";
import {
  createMachine,
  updateMachine,
  getMachineById,
} from "../../services/machine.service";
import { useNavigate, useParams } from "react-router-dom";
const categories = [
  "Tractor",
  "Harvester",
  "Rotavator",
  "Cultivator",
  "Seeder",
  "Planter",
  "Sprayer",
  "Thresher",
  "Power Tiller",
  "Water Pump",
  "Mini Tractor",
  "Drone",
  "Other",
];
const initialForm = {
  name: "",
  category: "",
  description: "",

  rentalType: "machine_only",

  pricingType: "per_day",

  price: "",

  quantity: 1,

  specifications: {
    brand: "",
    model: "",
    horsepower: "",
    fuelType: "",
    manufacturingYear: "",
  },

  location: {
    village: "",
    district: "",
    state: "",
    pincode: "",
  },
};

const MachineForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(initialForm);

  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode !== "edit") return;

    fetchMachine();
  }, []);

  const fetchMachine = async () => {
    try {
      setLoading(true);

      const { data } = await getMachineById(id);

      const machine = data.machine;

      setFormData({
        name: machine.name,
        category: machine.category,
        description: machine.description,

        rentalType: machine.rentalType,

        pricingType: machine.pricingType,

        price: machine.price,

        quantity: machine.quantity,

        specifications: machine.specifications,

        location: machine.location,
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSpecification = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };
  const handleLocation = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      location: {
        ...prev.location,
        [name]: value,
      },
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

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...previews]);
  };
  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Machine name required";

    if (!formData.category) newErrors.category = "Category required";

    if (formData.description.length < 30) {
      newErrors.description = "Description should be at least 30 characters.";
    }

    if (!formData.price) newErrors.price = "Price required";

    if (previewImages.length === 0)
      newErrors.images = "Upload at least one image.";

    if (!formData.location.village) newErrors.village = "Village required.";

    if (!formData.location.district) newErrors.district = "District required.";

    if (!formData.location.state) newErrors.state = "State required.";

    if (!formData.location.pincode) newErrors.pincode = "Pincode required.";

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

      navigate("/farmer/machines");
    } catch (err) {
      notify.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <form
    onSubmit={handleSubmit}
    className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8 space-y-8"
  >
    <div>
      <h1 className="text-3xl font-bold">
        {mode === "create" ? "Add Machine" : "Edit Machine"}
      </h1>
      <p className="text-gray-500 mt-2">Fill in the details below.</p>
    </div>

    {/* Basic Details */}

    <section className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="font-medium">Machine Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2"
        >
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="font-medium">Description</label>
        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
    </section>

    {/* Images */}

    <section>
      <label className="font-semibold text-lg">Images</label>

      <label className="mt-4 border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer hover:bg-gray-50">
        <Upload size={40} />

        <p className="mt-3">Upload up to 5 images</p>

        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={handleImages}
        />
      </label>

      {errors.images && <p className="text-red-500 mt-2">{errors.images}</p>}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5">
        {previewImages.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt=""
              className="h-32 w-full rounded-xl object-cover"
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* Rental */}

    <section className="grid md:grid-cols-3 gap-6">
      <div>
        <label className="font-medium">Rental Type</label>

        <select
          name="rentalType"
          value={formData.rentalType}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2"
        >
          <option value="machine_only">Machine Only</option>
          <option value="with_operator">With Operator</option>
        </select>
      </div>

      <div>
        <label className="font-medium">Pricing Type</label>

        <select
          name="pricingType"
          value={formData.pricingType}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2"
        >
          <option value="per_day">Per Day</option>
          <option value="per_hour">Per Hour</option>
          <option value="per_acre">Per Acre</option>
        </select>
      </div>

      <div>
        <label className="font-medium">Price</label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2"
        />

        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>
    </section>

    {/* Specifications */}

    <section>
  <h2 className="text-xl font-semibold mb-4">
    Specifications
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {/* Brand */}
    <div>
      <label>Brand</label>
      <input
        name="brand"
        value={formData.specifications.brand}
        onChange={handleSpecification}
        className="w-full border rounded-xl p-3 mt-2"
      />
    </div>

    {/* Model */}
    <div>
      <label>Model</label>
      <input
        name="model"
        value={formData.specifications.model}
        onChange={handleSpecification}
        className="w-full border rounded-xl p-3 mt-2"
      />
    </div>

    {/* Horsepower */}
    <div>
      <label>Horsepower (HP)</label>
      <input
        type="number"
        name="horsepower"
        value={formData.specifications.horsepower}
        onChange={handleSpecification}
        className="w-full border rounded-xl p-3 mt-2"
      />
    </div>

    {/* Fuel Type */}
    <div>
      <label>Fuel Type</label>
      <select
        name="fuelType"
        value={formData.specifications.fuelType}
        onChange={handleSpecification}
        className="w-full border rounded-xl p-3 mt-2"
      >
        <option value="">Select Fuel Type</option>
        <option value="diesel">Diesel</option>
        <option value="petrol">Petrol</option>
        <option value="electric">Electric</option>
      </select>
    </div>

    {/* Manufacturing Year */}
    <div>
      <label>Manufacturing Year</label>
      <input
        type="number"
        name="manufacturingYear"
        value={formData.specifications.manufacturingYear}
        onChange={handleSpecification}
        className="w-full border rounded-xl p-3 mt-2"
      />
    </div>

  </div>
</section>

    {/* Location */}

    <section>
      <h2 className="text-xl font-semibold mb-4">Location</h2>

      <div className="grid md:grid-cols-2 gap-5">
        {[
          ["village", "Village"],
          ["district", "District"],
          ["state", "State"],
          ["pincode", "Pincode"],
        ].map(([name, label]) => (
          <div key={name}>
            <label>{label}</label>
            <input
              name={name}
              value={formData.location[name]}
              onChange={handleLocation}
              className="w-full border rounded-xl p-3 mt-2"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </section>

    <div className="flex justify-end">
      <button
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {mode === "create" ? "Add Machine" : "Update Machine"}
      </button>
    </div>
  </form>
);
}
export default MachineForm;