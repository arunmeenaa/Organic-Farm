import { useState } from "react";
import { User, Mail, MapPin, Phone, Save } from "lucide-react";

const FarmerProfile = () => {
  const [formData, setFormData] = useState({
    name: "Arun Meena",
    email: "arun@example.com",
    phone: "",
    location: "Indore, Madhya Pradesh",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Call update profile API
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Farmer Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Card */}

          <div className="bg-white rounded-2xl shadow p-8">

            <div className="flex flex-col items-center">

              <div className="w-28 h-28 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">
                {formData.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {formData.name}
              </h2>

              <p className="text-gray-500 capitalize">
                Organic Farmer
              </p>

            </div>

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-3">
                <Mail className="text-green-600" size={20} />
                <span>{formData.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-green-600" size={20} />
                <span>{formData.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-green-600" size={20} />
                <span>{formData.phone || "Not Added"}</span>
              </div>

            </div>

          </div>

          {/* Right Card */}

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
                    className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed mt-2"
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
                  className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium">
                  Bio
                </label>

                <textarea
                  rows="5"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell buyers something about your farm..."
                  className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-green-500 resize-none"
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

export default FarmerProfile;