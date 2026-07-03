import { useState } from "react";
import { createProduct } from "../../services/product.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


import {
  Package,
  Upload,
  IndianRupee,
  Boxes,
  FileText,
  Image as ImageIcon,
  Save,
  X,
} from "lucide-react";

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

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "kg",
    description: "",
    status: "active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("unit", formData.unit);
    data.append("description", formData.description);
    data.append("status", formData.status);

    images.forEach((image) => {
      data.append("images", image);
    });

    await createProduct(data);

    toast.success("Product added successfully");

    navigate("/farmer/products");
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to add product"
    );
  }
};

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-lg">

          {/* Header */}

          <div className="border-b p-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Add New Product
            </h1>

            <p className="text-gray-500 mt-2">
              Add your fresh organic products to the marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Product Name */}

            <div>
              <label className="font-semibold mb-2 block">
                Product Name
              </label>

              <div className="flex items-center border rounded-xl px-4">
                <Package className="text-gray-400" size={20} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Organic Tomato"
                  className="w-full px-4 py-4 outline-none"
                />
              </div>
            </div>

            {/* Category & Unit */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="font-semibold mb-2 block">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-4 outline-none"
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold mb-2 block">
                  Unit
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-4 outline-none"
                >
                  <option value="kg">Kg</option>
                  <option value="gram">Gram</option>
                  <option value="piece">Piece</option>
                  <option value="litre">Litre</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>

            </div>

            {/* Price & Quantity */}

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="font-semibold mb-2 block">
                  Price
                </label>

                <div className="flex items-center border rounded-xl px-4">
                  <IndianRupee size={20} className="text-gray-400" />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="50"
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold mb-2 block">
                  Available Quantity
                </label>

                <div className="flex items-center border rounded-xl px-4">
                  <Boxes size={20} className="text-gray-400" />

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="100"
                    className="w-full px-4 py-4 outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Description */}

            <div>
              <label className="font-semibold mb-2 block">
                Description
              </label>

              <div className="flex border rounded-xl px-4">
                <FileText
                  className="text-gray-400 mt-4"
                  size={20}
                />

                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your organic product..."
                  className="w-full px-4 py-4 outline-none resize-none"
                />
              </div>
            </div>

            {/* Status */}

            <div>
              <label className="font-semibold mb-2 block">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-4"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Images */}

            <div>

              <label className="font-semibold mb-3 block">
                Product Images
              </label>

              <label className="border-2 border-dashed rounded-2xl h-48 flex flex-col justify-center items-center cursor-pointer hover:border-green-600 transition">

                <Upload
                  className="text-green-600"
                  size={45}
                />

                <p className="mt-4 font-medium">
                  Click to upload images
                </p>

                <span className="text-sm text-gray-500">
                  JPG, PNG, WEBP
                </span>

                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleImages}
                />

              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">

                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden border"
                    >

                      <img
                        src={URL.createObjectURL(img)}
                        alt=""
                        className="h-40 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4">

              <button
                type="reset"
                className="border px-8 py-3 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
              >
                <Save size={20} />
                Save Product
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;