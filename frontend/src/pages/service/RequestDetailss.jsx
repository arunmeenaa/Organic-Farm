import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Wheat,
  Clock,
  Send,
  BadgeCheck,
  Loader2,
  Phone,
  Calendar,
  UserRound,
  X,
  FileQuestion,
  Users,
  Tag,
  Ruler,
  Activity,
  IndianRupee,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  getServiceRequestById,
  respondToRequest,
} from "../../services/serviceRequest.service";

const pricingTypes = [
  { value: "per_acre", label: "Per Acre" },
  { value: "per_hectare", label: "Per Hectare" },
  { value: "per_day", label: "Per Day" },
  { value: "per_hour", label: "Per Hour" },
  { value: "per_trip", label: "Per Trip" },
  { value: "per_km", label: "Per KM" },
  { value: "fixed", label: "Fixed Price" },
];

const statusStyles = {
  open: {
    dot: "bg-blue-500",
    pill: "bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20",
    pillDark: "bg-blue-400/10 text-blue-300 ring-1 ring-blue-400/20",
  },
  accepted: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
    pillDark: "bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20",
  },
  in_progress: {
    dot: "bg-orange-500",
    pill: "bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/20",
    pillDark: "bg-orange-400/10 text-orange-300 ring-1 ring-orange-400/20",
  },
  completed: {
    dot: "bg-emerald-600",
    pill: "bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20",
    pillDark: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20",
  },
  cancelled: {
    dot: "bg-red-500",
    pill: "bg-red-500/10 text-red-600 ring-1 ring-red-500/20",
    pillDark: "bg-red-400/10 text-red-300 ring-1 ring-red-400/20",
  },
};

const DEFAULT_STATUS = {
  dot: "bg-slate-400",
  pill: "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20",
  pillDark: "bg-slate-400/10 text-slate-300 ring-1 ring-slate-400/20",
};

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [quotation, setQuotation] = useState({
    quotedPrice: "",
    pricingType: "per_acre",
    estimatedStartDate: "",
    message: "",
  });

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const { data } = await getServiceRequestById(id);
      setRequest(data.request);
      if (data.request.images?.length) {
        setSelectedImage(data.request.images[0]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load request.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  const submitQuotation = async () => {
    if (!quotation.quotedPrice) {
      toast.error("Please enter quotation price");
      return;
    }
    try {
      setSubmitting(true);
      await respondToRequest(id, quotation);
      toast.success("Quotation submitted successfully");
      setShowModal(false);
      setQuotation({
        quotedPrice: "",
        pricingType: "per_acre",
        estimatedStartDate: "",
        message: "",
      });
      fetchRequest();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit quotation.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Design tokens ── */
  const pageBg = darkMode
    ? "bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.06),_transparent_50%)] bg-slate-950"
    : "bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_60%),radial-gradient(ellipse_at_bottom_left,_rgba(132,204,22,0.06),_transparent_60%)] bg-[#f7f9f6]";

  const card = [
    "rounded-2xl border p-6 transition-all duration-300",
    darkMode
      ? "bg-slate-900/60 border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_20px_40px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      : "bg-white/80 border-slate-200/70 shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-18px_rgba(15,23,42,0.15)] backdrop-blur-xl",
  ].join(" ");

  const heading = darkMode ? "text-white" : "text-slate-900";
  const bodyText = darkMode ? "text-slate-300" : "text-slate-600";
  const mutedText = darkMode ? "text-slate-500" : "text-slate-500";
  const labelText = darkMode ? "text-slate-200" : "text-slate-700";
  const subtleDivider = darkMode ? "divide-white/[0.06]" : "divide-slate-200/70";

  const softChip = darkMode
    ? "bg-white/[0.04] ring-1 ring-white/[0.06]"
    : "bg-slate-50 ring-1 ring-slate-200/60";

  const modalInputCls = [
    "w-full mt-2 rounded-xl px-4 py-3 text-sm outline-none transition-all",
    darkMode
      ? "bg-white/[0.03] border border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-400/10"
      : "bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500/70 focus:ring-4 focus:ring-emerald-500/10",
  ].join(" ");

  /* ── Loading ── */
  if (loading) {
    return (
      <div className={`${pageBg} min-h-screen flex items-center justify-center`}>
        <div className={`flex flex-col items-center gap-4 ${heading}`}>
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-emerald-500/30 rounded-full" />
            <Loader2 size={32} className="relative animate-spin text-emerald-500" />
          </div>
          <p className={`text-sm font-medium ${mutedText}`}>Loading request…</p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!request) {
    return (
      <div className={`${pageBg} min-h-screen flex items-center justify-center px-6`}>
        <div className="flex flex-col items-center text-center gap-4 max-w-md">
          <div className={`p-5 rounded-2xl ${softChip}`}>
            <FileQuestion size={32} className={mutedText} />
          </div>
          <h1 className={`text-2xl font-bold ${heading}`}>Request not found</h1>
          <p className={mutedText}>
            It may have been removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>
      </div>
    );
  }

  const areaValue = request.area ?? request.landArea;
  const areaUnitValue = request.areaUnit ?? request.unit;

  const myQuotation = request.responses?.find(
    (response) => response.seller?._id === user?._id,
  );
  const hasSubmitted = !!myQuotation;

  const status = statusStyles[request.status] ?? DEFAULT_STATUS;
  const statusPill = darkMode ? status.pillDark : status.pill;

  const heroImage =
    selectedImage ||
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600";

  return (
    <div className={`${pageBg} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors group ${
            darkMode
              ? "text-slate-400 hover:text-emerald-300"
              : "text-slate-500 hover:text-emerald-600"
          }`}
        >
          <span className={`p-1.5 rounded-lg transition-all group-hover:-translate-x-0.5 ${softChip}`}>
            <ArrowLeft size={14} />
          </span>
          Back to requests
        </button>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* HERO: image + overlay header */}
            <div
              className={[
                "relative overflow-hidden rounded-3xl border",
                darkMode
                  ? "border-white/[0.06] bg-slate-900/60"
                  : "border-slate-200/70 bg-white",
              ].join(" ")}
            >
              <div className="relative h-[420px] sm:h-[480px] w-full">
                <img
                  src={heroImage}
                  alt={request.title || "Service request"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Status floating */}
                <div className="absolute top-5 right-5">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold capitalize backdrop-blur-md bg-white/90 text-slate-800 shadow-lg`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot} animate-pulse`} />
                    {request.status?.replace("_", " ") ?? "unknown"}
                  </span>
                </div>

                {/* Bottom overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/90 text-white backdrop-blur-sm">
                    <Tag size={11} />
                    {request.category}
                  </span>
                  <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-sm">
                    {request.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-white/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      Posted {new Date(request.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {request.location?.district || "—"}, {request.location?.state || "—"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} />
                      {request.responses?.length || 0} response
                      {(request.responses?.length || 0) === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {request.images?.length > 1 && (
                <div className="p-4 grid grid-cols-5 sm:grid-cols-6 gap-2">
                  {request.images.map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      aria-label="View image"
                      className={`relative rounded-xl overflow-hidden h-16 w-full transition-all ${
                        selectedImage === image
                          ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-transparent"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className={card}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg ${softChip}`}>
                  <MessageSquare size={16} className="text-emerald-500" />
                </div>
                <h2 className={`text-lg font-semibold ${heading}`}>Description</h2>
              </div>
              <p className={`leading-relaxed whitespace-pre-line ${bodyText}`}>
                {request.description}
              </p>
            </div>

            {/* Field Details */}
            <div className={card}>
              <div className="flex items-center gap-2 mb-6">
                <div className={`p-2 rounded-lg ${softChip}`}>
                  <Ruler size={16} className="text-emerald-500" />
                </div>
                <h2 className={`text-lg font-semibold ${heading}`}>Field Details</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <DetailTile
                  icon={<Wheat size={18} />}
                  iconTint="text-emerald-500 bg-emerald-500/10"
                  label="Land Area"
                  value={`${areaValue ?? "—"} ${areaUnitValue ?? ""}`.trim()}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
                <DetailTile
                  icon={<CalendarDays size={18} />}
                  iconTint="text-blue-500 bg-blue-500/10"
                  label="Required Date"
                  value={new Date(request.requiredDate).toLocaleDateString("en-IN")}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
                <DetailTile
                  icon={<MapPin size={18} />}
                  iconTint="text-rose-500 bg-rose-500/10"
                  label="Village"
                  value={request.location?.village || "—"}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
                <DetailTile
                  icon={<MapPin size={18} />}
                  iconTint="text-rose-500 bg-rose-500/10"
                  label="District"
                  value={request.location?.district || "—"}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
                <DetailTile
                  icon={<MapPin size={18} />}
                  iconTint="text-rose-500 bg-rose-500/10"
                  label="State"
                  value={request.location?.state || "—"}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
                <DetailTile
                  icon={<MapPin size={18} />}
                  iconTint="text-rose-500 bg-rose-500/10"
                  label="Pincode"
                  value={request.location?.pincode || "—"}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
              </div>
            </div>

            {/* Buyer Information */}
            <div className={card}>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${softChip}`}>
                    <UserRound size={16} className="text-emerald-500" />
                  </div>
                  <h2 className={`text-lg font-semibold ${heading}`}>Buyer Information</h2>
                </div>

                {request.buyer?.isVerified && (
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      darkMode
                        ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20"
                        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    }`}
                  >
                    <BadgeCheck size={14} />
                    Verified
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-lime-400/40 blur-md opacity-50" />
                  <img
                    src={
                      request.buyer?.profileImage ||
                      `https://ui-avatars.com/api/?name=${request.buyer?.name}&background=16a34a&color=fff`
                    }
                    alt={request.buyer?.name || "Buyer"}
                    className="relative w-20 h-20 rounded-2xl object-cover ring-2 ring-white/60 dark:ring-white/10"
                  />
                </div>

                <div className="flex-1 w-full min-w-0">
                  <h3 className={`text-xl font-bold ${heading}`}>
                    {request.buyer?.name}
                  </h3>
                  <p className={`text-sm mt-0.5 ${mutedText}`}>
                    Buyer looking for agricultural services
                  </p>

                  <div className="grid sm:grid-cols-2 gap-2.5 mt-5">
                    {request.buyer?.phone && (
                      <InfoRow
                        icon={<Phone size={15} className="text-emerald-500" />}
                        label="Phone Number"
                        value={request.buyer.phone}
                        darkMode={darkMode}
                        heading={heading}
                        mutedText={mutedText}
                      />
                    )}
                    <InfoRow
                      icon={<MapPin size={15} className="text-rose-500" />}
                      label="Location"
                      value={`${request.location?.district || "—"}, ${request.location?.state || "—"}`}
                      darkMode={darkMode}
                      heading={heading}
                      mutedText={mutedText}
                    />
                    <InfoRow
                      icon={<Calendar size={15} className="text-blue-500" />}
                      label="Member Since"
                      value={
                        request.buyer?.createdAt
                          ? new Date(request.buyer.createdAt).getFullYear()
                          : "—"
                      }
                      darkMode={darkMode}
                      heading={heading}
                      mutedText={mutedText}
                    />
                    <InfoRow
                      icon={<Activity size={15} className="text-purple-500" />}
                      label="Account Status"
                      value={<span className="text-emerald-500 font-semibold">Active Buyer</span>}
                      darkMode={darkMode}
                      heading={heading}
                      mutedText={mutedText}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky sidebar */}
          <div>
            <div className={`sticky top-6 ${card}`}>
              <div className="flex items-center gap-2 mb-5">
                <div className={`p-2 rounded-lg ${softChip}`}>
                  <Sparkles size={16} className="text-emerald-500" />
                </div>
                <h2 className={`text-lg font-semibold ${heading}`}>Request Summary</h2>
              </div>

              <div className={`space-y-3.5 divide-y ${subtleDivider}`}>
                <SummaryRow label="Category" value={request.category} first heading={heading} mutedText={mutedText} />
                <SummaryRow
                  label="Area"
                  value={`${areaValue ?? "—"} ${areaUnitValue ?? ""}`.trim()}
                  heading={heading}
                  mutedText={mutedText}
                />
                <SummaryRow
                  label="Status"
                  heading={heading}
                  mutedText={mutedText}
                  value={
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusPill}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {request.status?.replace("_", " ") ?? "unknown"}
                    </span>
                  }
                />
                <SummaryRow
                  label="Required"
                  value={new Date(request.requiredDate).toLocaleDateString("en-IN")}
                  heading={heading}
                  mutedText={mutedText}
                />
                <SummaryRow
                  label="Location"
                  value={request.location?.district || "—"}
                  heading={heading}
                  mutedText={mutedText}
                />
                <SummaryRow
                  label="Responses"
                  value={request.responses?.length || 0}
                  heading={heading}
                  mutedText={mutedText}
                />
              </div>

              {hasSubmitted ? (
                <>
                  <div
                    className={[
                      "mt-6 w-full rounded-xl py-3 font-semibold text-center text-sm inline-flex items-center justify-center gap-2",
                      darkMode
                        ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20"
                        : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
                    ].join(" ")}
                  >
                    <BadgeCheck size={16} />
                    Quotation Submitted
                  </div>

                  <QuotationSummary
                    myQuotation={myQuotation}
                    darkMode={darkMode}
                    heading={heading}
                    mutedText={mutedText}
                  />
                </>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  disabled={request.status !== "open"}
                  className={`mt-6 w-full rounded-xl py-3.5 font-semibold text-sm transition-all ${
                    request.status === "open"
                      ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
                      : darkMode
                        ? "bg-white/5 text-slate-500 cursor-not-allowed"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Send size={16} />
                    {request.status === "open" ? "Submit Quotation" : "Request Closed"}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={[
                "w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-3xl p-7 border shadow-2xl animate-in zoom-in-95 duration-200",
                darkMode
                  ? "bg-slate-900/95 border-white/10"
                  : "bg-white border-slate-200",
              ].join(" ")}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${heading}`}>
                    {hasSubmitted ? "Your Quotation" : "Submit Quotation"}
                  </h2>
                  <p className={`text-sm mt-1 ${mutedText}`}>
                    {hasSubmitted
                      ? "Details of the quotation you shared."
                      : "Share your best offer with the buyer."}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? "text-slate-400 hover:text-white hover:bg-white/10"
                      : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {hasSubmitted ? (
                <QuotationSummary
                  myQuotation={myQuotation}
                  darkMode={darkMode}
                  heading={heading}
                  mutedText={mutedText}
                />
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className={`font-medium text-sm ${labelText}`}>Quoted Price</label>
                    <div className="relative">
                      <IndianRupee
                        size={16}
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 mt-1 ${mutedText}`}
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="e.g. 1500"
                        className={`${modalInputCls} pl-10`}
                        value={quotation.quotedPrice}
                        onChange={(e) =>
                          setQuotation({ ...quotation, quotedPrice: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`font-medium text-sm ${labelText}`}>Pricing Type</label>
                    <select
                      className={modalInputCls}
                      value={quotation.pricingType}
                      onChange={(e) =>
                        setQuotation({ ...quotation, pricingType: e.target.value })
                      }
                    >
                      {pricingTypes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`font-medium text-sm ${labelText}`}>Estimated Start Date</label>
                    <input
                      type="date"
                      className={modalInputCls}
                      value={quotation.estimatedStartDate}
                      onChange={(e) =>
                        setQuotation({ ...quotation, estimatedStartDate: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className={`font-medium text-sm ${labelText}`}>Message</label>
                    <textarea
                      rows={4}
                      className={`${modalInputCls} resize-none`}
                      placeholder="Introduce yourself and explain what's included…"
                      value={quotation.message}
                      onChange={(e) =>
                        setQuotation({ ...quotation, message: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className={[
                    "px-5 py-2.5 rounded-xl border font-medium text-sm transition-colors",
                    darkMode
                      ? "border-white/10 text-slate-300 hover:bg-white/5"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {hasSubmitted ? "Close" : "Cancel"}
                </button>

                {request.status === "open" && !hasSubmitted && (
                  <button
                    onClick={submitQuotation}
                    disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-lg shadow-emerald-500/25 disabled:opacity-70 hover:shadow-emerald-500/40 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Quotation
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Subcomponents ─────────────────────────────────────────── */

const DetailTile = ({ icon, iconTint, label, value, darkMode, heading, mutedText }) => (
  <div
    className={`flex items-start gap-3 rounded-xl p-3.5 transition-colors ${
      darkMode ? "bg-white/[0.02] hover:bg-white/[0.04]" : "bg-slate-50/70 hover:bg-slate-100/70"
    }`}
  >
    <div className={`p-2 rounded-lg shrink-0 ${iconTint}`}>{icon}</div>
    <div className="min-w-0">
      <p className={`text-xs uppercase tracking-wide ${mutedText}`}>{label}</p>
      <p className={`font-semibold mt-0.5 truncate ${heading}`}>{value}</p>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value, darkMode, heading, mutedText }) => (
  <div
    className={`flex items-center gap-3 rounded-xl p-3 ${
      darkMode ? "bg-white/[0.03]" : "bg-slate-50"
    }`}
  >
    <div className="shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className={`text-[11px] uppercase tracking-wide ${mutedText}`}>{label}</p>
      <p className={`text-sm font-medium truncate ${heading}`}>{value}</p>
    </div>
  </div>
);

const SummaryRow = ({ label, value, first, heading, mutedText }) => (
  <div className={`flex justify-between items-center ${first ? "" : "pt-3.5"}`}>
    <span className={`text-sm ${mutedText}`}>{label}</span>
    <div className={`text-sm font-semibold text-right ${heading}`}>{value}</div>
  </div>
);

const QuotationSummary = ({ myQuotation, darkMode, heading, mutedText }) => {
  const statusPill =
    myQuotation.counterStatus === "pending"
      ? "bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30"
      : myQuotation.status === "accepted"
        ? "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30"
        : myQuotation.status === "rejected"
          ? "bg-red-500/15 text-red-600 ring-1 ring-red-500/30"
          : "bg-blue-500/15 text-blue-600 ring-1 ring-blue-500/30";

  const statusText =
    myQuotation.counterStatus === "pending"
      ? "Counter Offer Received"
      : myQuotation.status;

  return (
    <div
      className={`mt-6 rounded-2xl p-5 border ${
        darkMode
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-emerald-50/70 border-emerald-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h3 className={`font-bold text-base ${darkMode ? "text-emerald-300" : "text-emerald-700"}`}>
          Your Quotation
        </h3>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusPill}`}
        >
          {statusText}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${mutedText}`}>Quoted Price</span>
          <strong className={`text-lg ${heading}`}>₹{myQuotation.quotedPrice}</strong>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${mutedText}`}>Pricing</span>
          <strong className={`text-sm capitalize ${heading}`}>
            {myQuotation.pricingType?.replaceAll("_", " ")}
          </strong>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm ${mutedText}`}>Start Date</span>
          <strong className={`text-sm ${heading}`}>
            {myQuotation.estimatedStartDate
              ? new Date(myQuotation.estimatedStartDate).toLocaleDateString("en-IN")
              : "—"}
          </strong>
        </div>

        <div>
          <p className={`text-xs uppercase tracking-wide mb-1.5 ${mutedText}`}>Your Message</p>
          <p
            className={`text-sm rounded-xl p-3 ${
              darkMode ? "bg-white/[0.04]" : "bg-white"
            } ${myQuotation.message ? heading : "italic " + mutedText}`}
          >
            {myQuotation.message || "No message"}
          </p>
        </div>

        {myQuotation.counterStatus !== "none" && myQuotation.counterStatus && (
          <div
            className={`mt-4 rounded-2xl border p-4 ${
              myQuotation.counterStatus === "pending"
                ? "border-amber-500/30 bg-amber-500/10"
                : myQuotation.counterStatus === "accepted"
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-red-500/30 bg-red-500/10"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className={`font-semibold text-sm ${heading}`}>Buyer Counter Offer</h4>
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                  myQuotation.counterStatus === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : myQuotation.counterStatus === "accepted"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {myQuotation.counterStatus}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${mutedText}`}>Buyer Offered</span>
                <strong className="text-lg text-emerald-600">
                  ₹{myQuotation.buyerOffer}
                </strong>
              </div>

              {myQuotation.buyerMessage && (
                <div>
                  <p className={`text-xs uppercase tracking-wide mb-1.5 ${mutedText}`}>
                    Buyer's Message
                  </p>
                  <p
                    className={`text-sm rounded-xl p-3 ${
                      darkMode ? "bg-white/[0.04]" : "bg-white"
                    } ${heading}`}
                  >
                    {myQuotation.buyerMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
