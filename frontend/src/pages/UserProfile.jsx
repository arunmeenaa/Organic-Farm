import { useEffect, useState } from "react";
import { notify } from "../utils/toast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Save,
  Pencil,
  X,
  Sprout,
  ShoppingBag,
} from "lucide-react";
import { getProfile, updateProfile } from "../services/user.service";

// ── Role config ───────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  farmer: {
    titleCls:
      "font-['Space_Grotesk'] bg-gradient-to-r from-[#065F46] to-[#65A30D] bg-clip-text text-transparent",
    avatarCls: "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white",
    iconCls: "bg-[rgba(5,150,105,0.12)] text-emerald-600",
    chipCls: "bg-[rgba(5,150,105,0.12)] text-emerald-700",
    chipLabel: "Organic Farmer",
    ChipIcon: Sprout,
    pageTitle: "Farmer Profile",
    bioPlaceholder: "Tell buyers about your farm, crops, and practices...",
    bioLabel: "About Your Farm",
  },
  buyer: {
    titleCls:
      "font-['Space_Grotesk'] bg-gradient-to-r from-[#4338CA] to-[#059669] bg-clip-text text-transparent",
    avatarCls: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white",
    iconCls: "bg-[rgba(99,102,241,0.12)] text-indigo-500",
    chipCls: "bg-[rgba(99,102,241,0.12)] text-[#4338CA]",
    chipLabel: "Buyer",
    ChipIcon: ShoppingBag,
    pageTitle: "Buyer Profile",
    bioPlaceholder: "Tell us a bit about yourself and your preferences...",
    bioLabel: "About Me",
  },
};
// ─────────────────────────────────────────────────────────────────────────────

const Profile = () => {
  const { user, setUser, updateUser } = useAuth();
  const { darkMode } = useTheme();
  const role = user?.role === "farmer" ? "farmer" : "buyer";
  const cfg = ROLE_CONFIG[role];

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImage: "",
  };
  const [formData, setFormData] = useState(emptyForm);
  const [savedData, setSavedData] = useState(emptyForm);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getProfile();
      const filled = {
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        location: data.user.location || "",
        bio: data.user.bio || "",
        profileImage: data.user.profileImage || "",
      };
      setFormData(filled);
      setSavedData(filled);
    } catch {
      notify.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = () => {
    setSavedData(formData);
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { data } = await updateProfile(formData);
      updateUser(data.user);
      notify.success(data.message);
      const updated = { ...formData, ...data.user };
      setFormData(updated);
      setSavedData(updated);
      if (setUser) setUser(data.user);
      setEditing(false);
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ── Style tokens ────────────────────────────────────────────────────────────
  const glassCls = darkMode
    ? "bg-[rgba(12,28,20,0.82)] backdrop-blur-2xl border border-[rgba(255,255,255,0.07)] shadow-[0_20px_45px_-20px_rgba(5,95,70,0.35)]"
    : "bg-[rgba(255,255,255,0.72)] backdrop-blur-2xl border border-[rgba(255,255,255,0.65)] shadow-[0_20px_45px_-20px_rgba(5,95,70,0.2)]";

  const nameCls = darkMode ? "text-emerald-100" : "text-[#1A2E22]";
  const infoCls = darkMode ? "text-emerald-300/80" : "text-[#3D5A48]";
  const inputIconCls = darkMode ? "text-emerald-700" : "text-[#7AADA0]";
  const emailHintCls = darkMode ? "text-emerald-700/70" : "text-[#7AADA0]";
  const labelCls = darkMode
    ? "text-emerald-300 font-medium text-sm"
    : "text-[#1A2E22] font-medium text-sm";

  const editBtnCls = darkMode
    ? "bg-[rgba(5,150,105,0.15)] text-emerald-400 border border-emerald-700/40 hover:bg-[rgba(5,150,105,0.25)] hover:-translate-y-px transition-all"
    : "bg-[rgba(5,150,105,0.1)] text-emerald-600 border border-[rgba(5,150,105,0.22)] hover:bg-[rgba(5,150,105,0.18)] hover:-translate-y-px transition-all";

  const saveBtnCls =
    "bg-gradient-to-r from-emerald-600 to-lime-400 text-[#062E1C] shadow-[0_10px_24px_-10px_rgba(5,150,105,0.45)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(5,150,105,0.55)] active:translate-y-0 transition-all";

  const cancelBtnCls = darkMode
    ? "bg-[rgba(15,35,25,0.70)] text-emerald-300 border border-emerald-800/40 hover:bg-[rgba(25,50,35,0.80)] transition-colors"
    : "bg-[rgba(220,230,224,0.7)] text-[#3D5A48] border border-[rgba(5,150,105,0.18)] hover:bg-[rgba(200,218,208,0.9)] transition-colors";

  const skelCls = darkMode
    ? "animate-pulse bg-emerald-900/40 rounded-[10px]"
    : "animate-pulse bg-emerald-100/80 rounded-[10px]";

  const inputEditCls = darkMode
    ? "bg-[rgba(15,35,25,0.80)] border border-emerald-800/60 text-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-[rgba(20,45,30,0.90)]"
    : "bg-[rgba(255,255,255,0.85)] border border-[#D1E8DC] text-[#1A2E22] focus:outline-none focus:border-emerald-600 focus:shadow-[0_0_0_4px_rgba(5,150,105,0.14)] focus:bg-white";

  const inputReadonlyCls = darkMode
    ? "bg-[rgba(10,25,17,0.55)] border border-transparent text-emerald-300/80 cursor-default"
    : "bg-[rgba(236,245,240,0.55)] border border-transparent text-[#2D4A3A] cursor-default";

  const inputDisabledCls = darkMode
    ? "bg-[rgba(10,25,17,0.40)] border border-transparent text-emerald-700/70 cursor-not-allowed"
    : "bg-[rgba(220,230,224,0.5)] border border-transparent text-[#6B8C7A] cursor-not-allowed";

  const inputCls = (extra = "") =>
    `w-full rounded-xl px-4 py-3 mt-2 text-sm transition-all ${
      editing ? inputEditCls : inputReadonlyCls
    } ${extra}`;
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Loading skeleton ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="fd-root py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className={`${skelCls} h-10 w-56 mb-8`} />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className={`${glassCls} rounded-3xl p-8 flex flex-col items-center gap-4`}>
              <div className={`${skelCls} w-24 h-24 rounded-full`} />
              <div className={`${skelCls} h-5 w-32`} />
              <div className={`${skelCls} h-4 w-20`} />
              <div className="space-y-3 w-full mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`${skelCls} h-8`} />
                ))}
              </div>
            </div>
            <div className={`${glassCls} lg:col-span-2 rounded-3xl p-8 space-y-5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`${skelCls} h-12`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="fd-root py-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className={`${cfg.titleCls} text-4xl font-bold`}>
            {cfg.pageTitle}
          </h1>

          {!editing && (
            <button
              onClick={handleEdit}
              className={`${editBtnCls} flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold`}
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left: avatar + info summary ── */}
          <div className={`${glassCls} rounded-3xl p-8`}>
            <div className="flex flex-col items-center">
              {/* Avatar ring — conic gradient via inline style */}
              <div
                style={{
                  background:
                    "conic-gradient(from 180deg, #059669, #84CC16, #F59E0B, #059669)",
                  padding: "4px",
                  borderRadius: "9999px",
                }}
              >
                <div
                  className={`${cfg.avatarCls} w-24 h-24 rounded-full overflow-hidden flex items-center justify-center`}
                >
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold select-none">
                      {formData.name.charAt(0).toUpperCase() || "?"}
                    </span>
                  )}
                </div>
              </div>

              {/* Change photo — only when editing */}
              {editing && (
                <label className="mt-3 cursor-pointer text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                  Change Photo
                  <input type="file" className="hidden" />
                </label>
              )}

              <h2 className={`font-['Space_Grotesk'] mt-5 text-2xl font-semibold ${nameCls}`}>
                {formData.name || "—"}
              </h2>

              <span
                className={`${cfg.chipCls} mt-2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5`}
              >
                <cfg.ChipIcon size={13} />
                {cfg.chipLabel}
              </span>
            </div>

            {/* Info pills */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`${cfg.iconCls} p-2 rounded-lg shrink-0`}>
                  <Mail size={17} />
                </div>
                <span className={`text-sm truncate ${infoCls}`}>
                  {formData.email || "—"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`${cfg.iconCls} p-2 rounded-lg shrink-0`}>
                  <MapPin size={17} />
                </div>
                <span className={`text-sm ${infoCls}`}>
                  {formData.location || "—"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className={`${cfg.iconCls} p-2 rounded-lg shrink-0`}>
                  <Phone size={17} />
                </div>
                <span className={`text-sm ${infoCls}`}>
                  {formData.phone || "Not added"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className={`${glassCls} lg:col-span-2 rounded-3xl p-8`}>
            {/* Form header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`font-['Space_Grotesk'] text-2xl font-semibold ${nameCls}`}>
                {editing ? "Edit Profile" : "Profile Details"}
              </h2>

              {!editing && (
                <button
                  onClick={handleEdit}
                  className={`${editBtnCls} p-2 rounded-lg`}
                  title="Edit profile"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className={labelCls}>Full Name</label>
                <div className="relative">
                  <User
                    className={`${inputIconCls} absolute left-4 top-1/2 -translate-y-1/2 mt-1`}
                    size={17}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Your full name"
                    className={inputCls("pl-11")}
                  />
                </div>
              </div>

              {/* Email — always disabled */}
              <div>
                <label className={labelCls}>
                  Email
                  <span className={`ml-2 text-xs font-normal ${emailHintCls}`}>
                    (cannot be changed)
                  </span>
                </label>
                <div className="relative">
                  <Mail
                    className={`${inputIconCls} absolute left-4 top-1/2 -translate-y-1/2 mt-1`}
                    size={17}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className={`w-full rounded-xl pl-11 pr-4 py-3 mt-2 text-sm ${inputDisabledCls}`}
                  />
                </div>
              </div>

              {/* Phone + Location side-by-side on md+ */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Phone</label>
                  <div className="relative">
                    <Phone
                      className={`${inputIconCls} absolute left-4 top-1/2 -translate-y-1/2 mt-1`}
                      size={17}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Phone number"
                      className={inputCls("pl-11")}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Location</label>
                  <div className="relative">
                    <MapPin
                      className={`${inputIconCls} absolute left-4 top-1/2 -translate-y-1/2 mt-1`}
                      size={17}
                    />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="City, State"
                      className={inputCls("pl-11")}
                    />
                  </div>
                </div>
              </div>

              {/* Bio — role-aware label + placeholder */}
              <div>
                <label className={labelCls}>{cfg.bioLabel}</label>
                <textarea
                  rows={5}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder={cfg.bioPlaceholder}
                  className={`${inputCls()} resize-none`}
                />
              </div>

              {/* Action buttons — only visible while editing */}
              {editing && (
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`${saveBtnCls} flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    <Save size={17} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className={`${cancelBtnCls} flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm disabled:opacity-50`}
                  >
                    <X size={17} />
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
