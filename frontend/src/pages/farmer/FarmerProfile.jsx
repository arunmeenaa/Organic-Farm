import { useState } from "react";
import { User, Mail, MapPin, Phone, Save } from "lucide-react";

// A totally different direction: modern glassmorphism on a soft gradient
// mesh, gradient accents (indigo → emerald → amber), rounded display type.
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    .fp-root {
      font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(ellipse 70% 50% at 10% 0%, rgba(99, 102, 241, 0.16), transparent),
        radial-gradient(ellipse 70% 50% at 90% 20%, rgba(16, 185, 129, 0.16), transparent),
        radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245, 158, 11, 0.10), transparent),
        #F5F6FA;
      min-height: 100vh;
    }
    .fp-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }

    .fp-glass {
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: 0 20px 45px -20px rgba(79, 70, 229, 0.25);
    }

    .fp-avatar-ring {
      background: conic-gradient(from 180deg, #6366F1, #10B981, #F59E0B, #6366F1);
      padding: 4px;
      border-radius: 9999px;
    }
    .fp-avatar-inner {
      background: linear-gradient(135deg, #6366F1, #4F46E5);
      color: white;
    }

    .fp-title-gradient {
      background: linear-gradient(90deg, #4338CA, #059669);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .fp-info-icon {
      background: rgba(99, 102, 241, 0.12);
      color: #4F46E5;
    }

    .fp-role-chip {
      background: rgba(16, 185, 129, 0.12);
      color: #059669;
    }

    .fp-label { color: #1E1B4B; }

    .fp-input {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid #E0E1EC;
      color: #1E1B4B;
      transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    }
    .fp-input:focus {
      outline: none;
      border-color: #6366F1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
      background: #FFFFFF;
    }
    .fp-input-disabled {
      background: rgba(226, 227, 235, 0.6);
      border: 1px solid #E0E1EC;
      color: #8B8CA0;
    }
    .fp-input-icon { color: #A3A4C2; }

    .fp-btn-gradient {
      background: linear-gradient(90deg, #4F46E5, #059669);
      color: white;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      box-shadow: 0 10px 24px -10px rgba(79, 70, 229, 0.5);
    }
    .fp-btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(79, 70, 229, 0.6); }
    .fp-btn-gradient:active { transform: translateY(0); }
  `}</style>
);

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
    <div className="fp-root py-10">
      <FontImport />
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="fp-display fp-title-gradient text-4xl font-bold mb-8">
          Farmer Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Card */}

          <div className="fp-glass rounded-3xl p-8">
            <div className="flex flex-col items-center">
              <div className="fp-avatar-ring">
                <div className="fp-avatar-inner w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="fp-display mt-5 text-2xl font-semibold" style={{ color: "#1E1B4B" }}>
                {formData.name}
              </h2>

              <span className="fp-role-chip mt-2 px-3 py-1 rounded-full text-sm font-medium">
                Organic Farmer
              </span>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="fp-info-icon p-2 rounded-lg">
                  <Mail size={18} />
                </div>
                <span style={{ color: "#3F3D66" }}>{formData.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="fp-info-icon p-2 rounded-lg">
                  <MapPin size={18} />
                </div>
                <span style={{ color: "#3F3D66" }}>{formData.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="fp-info-icon p-2 rounded-lg">
                  <Phone size={18} />
                </div>
                <span style={{ color: "#3F3D66" }}>
                  {formData.phone || "Not Added"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Card */}

          <div className="fp-glass lg:col-span-2 rounded-3xl p-8">
            <h2 className="fp-display text-2xl font-semibold mb-6" style={{ color: "#1E1B4B" }}>
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="fp-label font-medium">Full Name</label>

                <div className="relative mt-2">
                  <User className="fp-input-icon absolute left-4 top-3.5" size={18} />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="fp-input w-full rounded-xl pl-11 pr-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="fp-label font-medium">Email</label>

                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="fp-input-disabled w-full rounded-xl px-4 py-3 mt-2 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="fp-label font-medium">Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="fp-input w-full rounded-xl px-4 py-3 mt-2"
                />
              </div>

              <div>
                <label className="fp-label font-medium">Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="fp-input w-full rounded-xl px-4 py-3 mt-2"
                />
              </div>

              <div>
                <label className="fp-label font-medium">Bio</label>

                <textarea
                  rows="5"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell buyers something about your farm..."
                  className="fp-input w-full rounded-xl px-4 py-3 mt-2 resize-none"
                />
              </div>

              <button
                type="submit"
                className="fp-btn-gradient px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
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