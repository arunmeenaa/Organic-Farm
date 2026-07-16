import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Tractor,
  IndianRupee,
  FileText,
  Upload,
  X,
  Save,
  Wrench,
  MapPin,
  Boxes,
} from "lucide-react";
import toast from "react-hot-toast";

import { getMachineById, updateMachine } from "../../services/machine.service";

const categories = [
  "Tractor",
  "Harvester",
  "Rotavator",
  "Cultivator",
  "Seeder",
  "Planter",
  "Sprayer",
  "Power Tiller",
  "Drone",
  "Other",
];

const EditMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",

    rentalType: "machine_only",
    pricingType: "per_day",

    price: "",

    quantity: "",

    availabilityStatus: "available",

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
  });

  useEffect(() => {
    fetchMachine();
  }, []);

  const fetchMachine = async () => {
    try {
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

        availabilityStatus: machine.availabilityStatus,

        specifications: machine.specifications,

        location: machine.location,
      });

      setExistingImages(machine.images || []);
    } catch {
      toast.error("Failed to fetch machine");
    } finally {
      setLoading(false);
    }
  };
  const handleSpecification = (e) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleLocation = (e) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [e.target.name]: e.target.value,
      },
    }));
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
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("description", formData.description);

      data.append("price", formData.price);

      data.append("quantity", formData.quantity);

      data.append("rentalType", formData.rentalType);

      data.append("pricingType", formData.pricingType);

      data.append("availabilityStatus", formData.availabilityStatus);

      data.append("specifications", JSON.stringify(formData.specifications));

      data.append("location", JSON.stringify(formData.location));

      data.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((image) => {
        data.append("images", image);
      });

      await updateMachine(id, data);

      toast.success("Machine updated successfully");

      navigate("/farmer/inventory");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update Machine");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow">
        <div className="border-b p-8">
          <h1 className="text-4xl font-bold">Edit Machine</h1>
          <p className="text-gray-500 mt-2">Update your Machine information.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label className="font-semibold block mb-2">Machine Name</label>

            <div className="flex border rounded-xl px-4">
              <Tractor className="mt-4 text-gray-400" />

              <input
                className="w-full px-4 py-4 outline-none"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-2">Rental Type</label>

              <select
                name="rentalType"
                value={formData.rentalType}
                onChange={handleChange}
              >
                <option value="machine_only">Machine Only</option>

                <option value="with_operator">With Operator</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-2">Pricing Type</label>

              <select
                name="pricingType"
                value={formData.pricingType}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="per_hour">Per Hour</option>
                <option value="per_day">Per Day</option>
                <option value="per_acre">Per Acre</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-2">Availability</label>

              <select
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Price</label>

              <div className="flex border rounded-xl px-4">
                <IndianRupee className="mt-4 text-gray-400" />

                <input
                  type="number"
                  className="w-full px-4 py-4 outline-none"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-2">Available</label>

              <div className="flex border rounded-xl px-4">
                <Boxes className="mt-4 text-gray-400" />

                <input
                  type="number"
                  className="w-full px-4 py-4 outline-none"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">Description</label>

            <div className="flex border rounded-xl px-4">
              <FileText className="mt-4 text-gray-400" />

              <textarea
                rows={5}
                className="w-full px-4 py-4 outline-none resize-none"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <section>
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <Wrench className="text-green-600" />
                Specifications
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Brand */}
                <div>
                  <label className="font-semibold block mb-2">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.specifications.brand}
                    onChange={handleSpecification}
                    className="w-full border rounded-xl p-4"
                    placeholder="e.g. John Deere"
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="font-semibold block mb-2">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.specifications.model}
                    onChange={handleSpecification}
                    className="w-full border rounded-xl p-4"
                    placeholder="e.g. 5050D"
                  />
                </div>

                {/* Horsepower */}
                <div>
                  <label className="font-semibold block mb-2">
                    Horsepower (HP)
                  </label>
                  <input
                    type="number"
                    name="horsepower"
                    value={formData.specifications.horsepower}
                    onChange={handleSpecification}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="font-semibold block mb-2">Fuel Type</label>

                  <select
                    name="fuelType"
                    value={formData.specifications.fuelType}
                    onChange={handleSpecification}
                    className="w-full border rounded-xl p-4"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Manufacturing Year */}
                <div>
                  <label className="font-semibold block mb-2">
                    Manufacturing Year
                  </label>

                  <input
                    type="number"
                    name="manufacturingYear"
                    value={formData.specifications.manufacturingYear}
                    onChange={handleSpecification}
                    className="w-full border rounded-xl p-4"
                  />
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <MapPin className="text-green-600" />
                Machine Location
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Village */}
                <div>
                  <label className="font-semibold block mb-2">Village</label>

                  <input
                    type="text"
                    name="village"
                    value={formData.location.village}
                    onChange={handleLocation}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="font-semibold block mb-2">District</label>

                  <input
                    type="text"
                    name="district"
                    value={formData.location.district}
                    onChange={handleLocation}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="font-semibold block mb-2">State</label>

                  <input
                    type="text"
                    name="state"
                    value={formData.location.state}
                    onChange={handleLocation}
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="font-semibold block mb-2">Pincode</label>

                  <input
                    type="number"
                    name="pincode"
                    value={formData.location.pincode}
                    onChange={handleLocation}
                    className="w-full border rounded-xl p-4"
                  />
                </div>
              </div>
            </section>
            <label className="font-semibold block mb-2">Current Images</label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt=""
                    className="h-36 w-full object-cover rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Upload New Images
            </label>

            <label className="border-2 border-dashed rounded-2xl h-44 flex flex-col justify-center items-center cursor-pointer">
              <Upload size={40} />

              <p className="mt-3">Click to Upload</p>

              <input type="file" multiple hidden onChange={handleImages} />
            </label>

            {newImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {newImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      className="h-36 w-full object-cover rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-2">
            <Save size={20} />
            Update Machine
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMachine;
