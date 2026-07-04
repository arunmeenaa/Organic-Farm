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
  Save,
  X,
} from "lucide-react";

// Matches Navbar/Hero/MyProducts/Orders: glassmorphism over an emerald →
// lime gradient mesh, Space Grotesk display type.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    .ap-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .ap-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .ap-title-gradient {
      background: linear-gradient(90deg, #065F46, #65A30D);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .ap-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    .ap-panel-head { border-bottom: 1px solid rgba(5, 150, 105, 0.14); }

    .ap-label { color: #0F2E22; }

    .ap-input-wrap {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .ap-input-wrap:focus-within {
      border-color: #059669;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.12);
    }
    .ap-input-icon { color: #8FA895; }

    .ap-select {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #DCEBDD;
      color: #0F2E22;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .ap-select:focus {
      outline: none;
      border-color: #059669;
      box-shadow: 0 0 0 4px rgba(5, 150, 105, 0.12);
    }

    .ap-dropzone {
      border: 2px dashed #B7D8BE;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .ap-dropzone:hover { border-color: #059669; background: rgba(5, 150, 105, 0.05); }

    .ap-image-tile {
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    .ap-remove-btn {
      background: #E11D48;
      color: white;
    }

    .ap-btn-cancel {
      border: 1px solid #DCEBDD;
      color: #4B6357;
      transition: background 0.15s ease;
    }
    .ap-btn-cancel:hover { background: rgba(5, 150, 105, 0.06); }

    .ap-btn-save {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .ap-btn-save:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
    .ap-btn-save:active { transform: translateY(0); }
  `}</style>
);

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
    <div className="ap-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-5xl mx-auto px-6">
        <div className="ap-panel rounded-3xl shadow-sm">
          {/* Header */}

          <div className="ap-panel-head p-8">
            <h1 className="ap-display ap-title-gradient text-4xl font-bold">
              Add New Product
            </h1>

            <p className="mt-2" style={{ color: "#7A8D82" }}>
              Add your fresh organic products to the marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Product Name */}

            <div>
              <label className="ap-label font-semibold mb-2 block">
                Product Name
              </label>

              <div className="ap-input-wrap flex items-center rounded-xl px-4">
                <Package className="ap-input-icon" size={20} />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Organic Tomato"
                  className="w-full px-4 py-4 outline-none bg-transparent"
                  style={{ color: "#0F2E22" }}
                />
              </div>
            </div>

            {/* Category & Unit */}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="ap-label font-semibold mb-2 block">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="ap-select w-full rounded-xl px-4 py-4"
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="ap-label font-semibold mb-2 block">
                  Unit
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="ap-select w-full rounded-xl px-4 py-4"
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
                <label className="ap-label font-semibold mb-2 block">
                  Price
                </label>

                <div className="ap-input-wrap flex items-center rounded-xl px-4">
                  <IndianRupee size={20} className="ap-input-icon" />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="50"
                    className="w-full px-4 py-4 outline-none bg-transparent"
                    style={{ color: "#0F2E22" }}
                  />
                </div>
              </div>

              <div>
                <label className="ap-label font-semibold mb-2 block">
                  Available Quantity
                </label>

                <div className="ap-input-wrap flex items-center rounded-xl px-4">
                  <Boxes size={20} className="ap-input-icon" />

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="100"
                    className="w-full px-4 py-4 outline-none bg-transparent"
                    style={{ color: "#0F2E22" }}
                  />
                </div>
              </div>
            </div>

            {/* Description */}

            <div>
              <label className="ap-label font-semibold mb-2 block">
                Description
              </label>

              <div className="ap-input-wrap flex rounded-xl px-4">
                <FileText className="ap-input-icon mt-4" size={20} />

                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your organic product..."
                  className="w-full px-4 py-4 outline-none resize-none bg-transparent"
                  style={{ color: "#0F2E22" }}
                />
              </div>
            </div>

            {/* Status */}

            <div>
              <label className="ap-label font-semibold mb-2 block">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="ap-select w-full rounded-xl px-4 py-4"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Images */}

            <div>
              <label className="ap-label font-semibold mb-3 block">
                Product Images
              </label>

              <label className="ap-dropzone rounded-2xl h-48 flex flex-col justify-center items-center cursor-pointer">
                <Upload style={{ color: "#059669" }} size={45} />

                <p className="mt-4 font-medium" style={{ color: "#0F2E22" }}>
                  Click to upload images
                </p>

                <span className="text-sm" style={{ color: "#7A8D82" }}>
                  JPG, PNG, WEBP
                </span>

                <input type="file" multiple hidden onChange={handleImages} />
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="ap-image-tile relative rounded-xl overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt=""
                        className="h-40 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ap-remove-btn absolute top-2 right-2 rounded-full p-1"
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
              <button type="reset" className="ap-btn-cancel px-8 py-3 rounded-xl font-medium">
                Cancel
              </button>

              <button
                type="submit"
                className="ap-btn-save px-8 py-3 rounded-xl flex items-center gap-2 font-semibold"
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