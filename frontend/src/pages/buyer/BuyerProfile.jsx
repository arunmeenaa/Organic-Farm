import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Camera,
} from "lucide-react";

// Matches Navbar/Hero/MyProducts/Orders/AddProduct/Dashboard/Footer/
// BuyerDashboard/Cart/BuyerOrders/Products/ProductCard/ProductDetails/
// ProductInfo: glassmorphism over an emerald → lime gradient mesh.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 60% 50% at 10% 0%, rgba(5, 150, 105, 0.14), transparent),
        radial-gradient(ellipse 55% 45% at 90% 20%, rgba(132, 204, 22, 0.14), transparent),
        #F4F9F2;
    }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .fd-panel {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .fd-avatar {
      background: conic-gradient(from 180deg, #059669, #84CC16, #F59E0B, #059669);
      padding: 3px;
    }
    .fd-avatar-inner {
      background: linear-gradient(135deg, #059669, #047857);
      color: white;
    }

    .fd-camera-btn {
      background: linear-gradient(90deg, #84CC16, #A3E635);
      color: #14532D;
      transition: filter 0.15s ease;
    }
    .fd-camera-btn:hover { filter: brightness(1.08); }

    .fd-label { color: #0F2E22; }

    .fd-input {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid #DCEBDD;
      color: #0F2E22;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-input:focus {
      outline: none;
      border-color: #059669;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
    }
    .fd-input-disabled {
      background: rgba(228, 236, 229, 0.6);
      border: 1px solid #DCEBDD;
      color: #7A8D82;
    }
    .fd-input-icon { color: #8FA895; }

    .fd-btn-primary {
      background: linear-gradient(90deg, #059669, #84CC16);
      color: #063527;
      box-shadow: 0 10px 22px -10px rgba(5, 150, 105, 0.45);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 14px 26px -10px rgba(5, 150, 105, 0.55); }
  `}</style>
);

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO:
    // Call update profile API
  };

  return (
    <div className="fd-root min-h-screen py-10">
      <FontImport />
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="fd-display text-4xl font-bold mb-8" style={{ color: "#0F2E22" }}>
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}

          <div className="fd-panel rounded-2xl shadow-sm p-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="fd-avatar w-28 h-28 rounded-full">
                  <div className="fd-avatar-inner w-full h-full rounded-full flex items-center justify-center text-4xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>

                <label className="fd-camera-btn absolute bottom-0 right-0 p-2 rounded-full cursor-pointer">
                  <Camera size={16} />

                  <input type="file" hidden onChange={handleImage} />
                </label>
              </div>

              <h2 className="fd-display mt-5 text-2xl font-semibold" style={{ color: "#0F2E22" }}>
                {user?.name}
              </h2>

              <p className="capitalize" style={{ color: "#7A8D82" }}>
                {user?.role}
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex gap-3" style={{ color: "#0F2E22" }}>
                <Mail style={{ color: "#059669" }} />
                <span>{user?.email}</span>
              </div>

              <div className="flex gap-3" style={{ color: "#0F2E22" }}>
                <Phone style={{ color: "#059669" }} />
                <span>{formData.phone || "Not Added"}</span>
              </div>

              <div className="flex gap-3" style={{ color: "#0F2E22" }}>
                <MapPin style={{ color: "#059669" }} />
                <span>{formData.location || "Not Added"}</span>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="fd-panel lg:col-span-2 rounded-2xl shadow-sm p-8">
            <h2 className="fd-display text-2xl font-semibold mb-6" style={{ color: "#0F2E22" }}>
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="fd-label font-medium">Full Name</label>

                <div className="relative mt-2">
                  <User className="fd-input-icon absolute left-4 top-3.5" size={18} />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="fd-input w-full rounded-xl py-3 pl-11 pr-4"
                  />
                </div>
              </div>

              <div>
                <label className="fd-label font-medium">Email</label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="fd-input-disabled w-full mt-2 rounded-xl py-3 px-4"
                />
              </div>

              <div>
                <label className="fd-label font-medium">Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="fd-input w-full mt-2 rounded-xl py-3 px-4"
                />
              </div>

              <div>
                <label className="fd-label font-medium">Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="fd-input w-full mt-2 rounded-xl py-3 px-4"
                />
              </div>

              <div>
                <label className="fd-label font-medium">Bio</label>

                <textarea
                  rows={4}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write something about yourself..."
                  className="fd-input w-full mt-2 rounded-xl py-3 px-4 resize-none"
                />
              </div>

              <button
                type="submit"
                className="fd-btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
              >
                <Save size={18} />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;