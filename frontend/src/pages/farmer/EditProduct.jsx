import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Package,
  Boxes,
  IndianRupee,
  FileText,
  Upload,
  X,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import { getProductById, updateProduct } from "../../services/product.service";

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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    unit: "kg",
    status: "active",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id);

      const product = data.product;

      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
      });

      setExistingImages(product.images || []);
    } catch (err) {
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
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
      data.append("unit", formData.unit);
      data.append("status", formData.status);

      data.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((image) => {
        data.append("images", image);
      });

      await updateProduct(id, data);

      toast.success("Product updated successfully");

      navigate("/farmer/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
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
          <h1 className="text-4xl font-bold">Edit Product</h1>
          <p className="text-gray-500 mt-2">Update your product information.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label className="font-semibold block mb-2">Product Name</label>

            <div className="flex border rounded-xl px-4">
              <Package className="mt-4 text-gray-400" />

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
              <label className="font-semibold block mb-2">Unit</label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              >
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
                <option value="piece">Piece</option>
                <option value="litre">Litre</option>
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
              <label className="font-semibold block mb-2">Quantity</label>

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
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
