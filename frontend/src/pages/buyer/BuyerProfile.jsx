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
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="bg-white rounded-2xl shadow p-8">

            <div className="flex flex-col items-center">

              <div className="relative">

                <div className="w-28 h-28 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer">
                  <Camera
                    size={16}
                    className="text-white"
                  />

                  <input
                    type="file"
                    hidden
                    onChange={handleImage}
                  />
                </label>

              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="capitalize text-gray-500">
                {user?.role}
              </p>

            </div>

            <div className="mt-8 space-y-5">

              <div className="flex gap-3">
                <Mail className="text-green-600" />
                <span>{user?.email}</span>
              </div>

              <div className="flex gap-3">
                <Phone className="text-green-600" />
                <span>
                  {formData.phone || "Not Added"}
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-green-600" />
                <span>
                  {formData.location || "Not Added"}
                </span>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Edit Profile
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>
                <label className="font-medium">
                  Full Name
                </label>

                <div className="relative mt-2">

                  <User
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>
              </div>

              <div>
                <label className="font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full mt-2 border rounded-xl py-3 px-4 bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Bio
                </label>

                <textarea
                  rows={4}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write something about yourself..."
                  className="w-full mt-2 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
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