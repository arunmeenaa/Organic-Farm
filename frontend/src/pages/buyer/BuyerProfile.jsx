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

// Shared design tokens with the rest of the app: forest green + harvest
// marigold on warm parchment, Fraunces display, Inter body.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

    .fd-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; background: #F6F4EC; }
    .fd-display { font-family: 'Fraunces', Georgia, serif; }

    .fd-panel { background: #FFFFFF; border: 1px solid #E7E2D2; }

    .fd-avatar {
      background: #1E3527;
      color: #F6F4EC;
    }

    .fd-camera-btn {
      background: #E7A83C;
      color: #1E3527;
      transition: background 0.15s ease;
    }
    .fd-camera-btn:hover { background: #F3BC5D; }

    .fd-label { color: #23281F; }

    .fd-input {
      background: #FFFFFF;
      border: 1px solid #E7E2D2;
      color: #23281F;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .fd-input:focus {
      outline: none;
      border-color: #1E3527;
      box-shadow: 0 0 0 3px rgba(30, 53, 39, 0.08);
    }
    .fd-input-disabled {
      background: #F6F4EC;
      border: 1px solid #E7E2D2;
      color: #8A8578;
    }
    .fd-input-icon { color: #A6A08E; }

    .fd-btn-primary {
      background: #1E3527;
      color: #F6F4EC;
      transition: background 0.15s ease;
    }
    .fd-btn-primary:hover { background: #2F5233; }
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
        <h1 className="fd-display text-4xl font-semibold mb-8" style={{ color: "#1E3527" }}>
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}

          <div className="fd-panel rounded-2xl shadow-sm p-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="fd-avatar w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <label className="fd-camera-btn absolute bottom-0 right-0 p-2 rounded-full cursor-pointer">
                  <Camera size={16} />

                  <input type="file" hidden onChange={handleImage} />
                </label>
              </div>

              <h2 className="fd-display mt-5 text-2xl font-semibold" style={{ color: "#1E3527" }}>
                {user?.name}
              </h2>

              <p className="capitalize" style={{ color: "#8A8578" }}>
                {user?.role}
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex gap-3" style={{ color: "#23281F" }}>
                <Mail style={{ color: "#8A5A16" }} />
                <span>{user?.email}</span>
              </div>

              <div className="flex gap-3" style={{ color: "#23281F" }}>
                <Phone style={{ color: "#8A5A16" }} />
                <span>{formData.phone || "Not Added"}</span>
              </div>

              <div className="flex gap-3" style={{ color: "#23281F" }}>
                <MapPin style={{ color: "#8A5A16" }} />
                <span>{formData.location || "Not Added"}</span>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="fd-panel lg:col-span-2 rounded-2xl shadow-sm p-8">
            <h2 className="fd-display text-2xl font-semibold mb-6" style={{ color: "#1E3527" }}>
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