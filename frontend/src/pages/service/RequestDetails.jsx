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

const statusColors = {
  open: "bg-blue-500",
  accepted: "bg-green-600",
  in_progress: "bg-orange-500",
  completed: "bg-emerald-600",
  cancelled: "bg-red-500",
};
const DEFAULT_STATUS_COLOR = "bg-slate-400";

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

  /* ── Shared dark-aware text/style helpers (matches the darkMode-boolean
     pattern already used for the panel backgrounds in this file) ── */
  const pageBg = darkMode;

  const panelCls = [
    "rounded-3xl backdrop-blur-xl border p-6",
    darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/60",
  ].join(" ");

  const heading = darkMode ? "text-white" : "text-emerald-950";
  const bodyText = darkMode ? "text-slate-300" : "text-slate-700";
  const mutedText = darkMode ? "text-slate-400" : "text-slate-500";
  const labelText = darkMode ? "text-slate-300" : "text-slate-700";

  const modalInputCls = [
    "w-full mt-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors",
    darkMode
      ? "bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10"
      : "bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10",
  ].join(" ");

  if (loading) {
    return (
      <div
        className={`${pageBg} min-h-screen flex items-center justify-center`}
      >
        <div className={`text-lg font-semibold ${heading}`}>
          Loading Request...
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div
        className={`${pageBg} min-h-screen flex items-center justify-center`}
      >
        <div className={heading}>Request not found.</div>
      </div>
    );
  }

  const areaValue = request.area ?? request.landArea;
  const areaUnitValue = request.areaUnit ?? request.unit;

  const myQuotation = request.responses?.find(
    (response) => response.seller?._id === user?._id,
  );
  const hasSubmitted = !!myQuotation;

  const statusColor = statusColors[request.status] ?? DEFAULT_STATUS_COLOR;

  return (
    <div className={`${pageBg} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-emerald-600 hover:text-emerald-500 font-semibold"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className={panelCls}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span
                    className={[
                      "px-3 py-1 rounded-full text-xs font-bold",
                      darkMode
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-emerald-100 text-emerald-700",
                    ].join(" ")}
                  >
                    {request.category}
                  </span>

                  <h1 className={`mt-4 text-4xl font-bold ${heading}`}>
                    {request.title}
                  </h1>

                  <div
                    className={`flex items-center gap-2 mt-3 text-sm ${mutedText}`}
                  >
                    <Clock size={15} />
                    Posted on{" "}
                    {new Date(request.createdAt).toLocaleDateString("en-IN")}
                  </div>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm capitalize shrink-0 ${statusColor}`}
                >
                  {request.status?.replace("_", " ") ?? "unknown"}
                </span>
              </div>
            </div>

            {/* Gallery */}
            <div className={panelCls}>
              <img
                src={
                  selectedImage ||
                  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200"
                }
                alt={request.title || "Service request"}
                className="rounded-2xl w-full h-[420px] object-cover"
              />

              {request.images?.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-5">
                  {request.images.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt=""
                      onClick={() => setSelectedImage(image)}
                      className={`cursor-pointer rounded-xl h-24 w-full object-cover border-2 ${
                        selectedImage === image
                          ? "border-emerald-500"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className={panelCls}>
              <h2 className={`text-2xl font-bold mb-4 ${heading}`}>
                Description
              </h2>
              <p className={`leading-8 ${bodyText}`}>{request.description}</p>
            </div>

            {/* Field Details */}
            <div className={panelCls}>
              <h2 className={`text-2xl font-bold mb-6 ${heading}`}>
                Field Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Wheat className="text-emerald-500 mt-1 shrink-0" />
                  <div>
                    <p className={`text-sm ${mutedText}`}>Land Area</p>
                    <h3 className={`font-semibold text-lg ${heading}`}>
                      {areaValue} {areaUnitValue}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CalendarDays className="text-blue-400 mt-1 shrink-0" />
                  <div>
                    <p className={`text-sm ${mutedText}`}>Required Date</p>
                    <h3 className={`font-semibold text-lg ${heading}`}>
                      {new Date(request.requiredDate).toLocaleDateString(
                        "en-IN",
                      )}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-rose-400 mt-1 shrink-0" />
                  <div>
                    <p className={`text-sm ${mutedText}`}>Village</p>
                    <h3 className={`font-semibold ${heading}`}>
                      {request.location?.village || "—"}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-rose-400 mt-1 shrink-0" />
                  <div>
                    <p className={`text-sm ${mutedText}`}>District</p>
                    <h3 className={`font-semibold ${heading}`}>
                      {request.location?.district || "—"}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-rose-400 mt-1 shrink-0" />
                  <div>
                    <p className={`text-sm ${mutedText}`}>State</p>
                    <h3 className={`font-semibold ${heading}`}>
                      {request.location?.state || "—"}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-rose-400 mt-1 shrink-0" />
                  <div>
                    <p className={`text-sm ${mutedText}`}>Pincode</p>
                    <h3 className={`font-semibold ${heading}`}>
                      {request.location?.pincode || "—"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer */}
            {/* Buyer Information */}
            <div className={panelCls}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${heading}`}>
                  Buyer Information
                </h2>

                {request.buyer?.isVerified && (
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    <BadgeCheck size={16} />
                    Verified
                  </div>
                )}
              </div>

              <div className="flex items-start gap-5">
                <img
                  src={
                    request.buyer?.profileImage ||
                    `https://ui-avatars.com/api/?name=${request.buyer?.name}&background=16a34a&color=fff`
                  }
                  alt={request.buyer?.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-emerald-500/20 shadow-lg"
                />

                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${heading}`}>
                    {request.buyer?.name}
                  </h3>

                  <p className={`text-sm mt-1 ${mutedText}`}>
                    Buyer looking for agricultural services
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {request.buyer?.phone && (
                      <div
                        className={`flex items-center gap-3 rounded-xl p-3 ${
                          darkMode ? "bg-white/5" : "bg-slate-50"
                        }`}
                      >
                        <Phone size={18} className="text-emerald-500" />
                        <div>
                          <p className={`text-xs ${mutedText}`}>Phone Number</p>
                          <p className={`font-medium ${heading}`}>
                            {request.buyer.phone}
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex items-center gap-3 rounded-xl p-3 ${
                        darkMode ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <MapPin size={18} className="text-red-500" />
                      <div>
                        <p className={`text-xs ${mutedText}`}>Location</p>
                        <p className={`font-medium ${heading}`}>
                          {request.location?.district},{" "}
                          {request.location?.state}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 rounded-xl p-3 ${
                        darkMode ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <Calendar size={18} className="text-blue-500" />
                      <div>
                        <p className={`text-xs ${mutedText}`}>Member Since</p>
                        <p className={`font-medium ${heading}`}>
                          {request.buyer?.createdAt
                            ? new Date(request.buyer.createdAt).getFullYear()
                            : "—"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-3 rounded-xl p-3 ${
                        darkMode ? "bg-white/5" : "bg-slate-50"
                      }`}
                    >
                      <UserRound size={18} className="text-purple-500" />
                      <div>
                        <p className={`text-xs ${mutedText}`}>Account Status</p>
                        <p className="font-medium text-emerald-500">
                          Active Buyer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className={`sticky top-24 ${panelCls}`}>
              <h2 className={`text-2xl font-bold mb-6 ${heading}`}>
                Request Summary
              </h2>

              <div className={`space-y-5 ${bodyText}`}>
                <div className="flex justify-between">
                  <span>Category</span>
                  <strong className={heading}>{request.category}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Area</span>
                  <strong className={heading}>
                    {areaValue} {areaUnitValue}
                  </strong>
                </div>

                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs capitalize ${statusColor}`}
                  >
                    {request.status ?? "unknown"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Required</span>
                  <strong className={heading}>
                    {new Date(request.requiredDate).toLocaleDateString("en-IN")}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Location</span>
                  <strong className={heading}>
                    {request.location?.district || "—"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Responses</span>
                  <strong className={heading}>
                    {request.responses?.length || 0}
                  </strong>
                </div>
              </div>

              {hasSubmitted ? (
                <>
                  <div
                    className={[
                      "mt-8 w-full  rounded-xl py-3 font-semibold text-center",
                      darkMode
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-emerald-100 text-emerald-700",
                    ].join(" ")}
                  >
                    ✓ Quotation Submitted
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
                  onClick={!hasSubmitted ? () => setShowModal(true) : undefined}
                  disabled={request.status !== "open"}
                  className={`mt-8 w-full rounded-xl py-3 font-semibold transition ${
                    request.status === "open"
                      ? "bg-linear-to-r from-emerald-600 to-lime-500 text-white hover:shadow-lg"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    {request.status === "open"
                      ? "Submit Quotation"
                      : "Request Closed"}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className=" fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div
              className={`w-full  max-w-xl rounded-3xl p-7 ${
                darkMode ? "bg-[#0F172A] border border-white/10" : "bg-white"
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${heading}`}>
                Submit Quotation
              </h2>

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
                    <label className={`font-medium ${labelText}`}>
                      Quoted Price
                    </label>
                    <input
                      type="number"
                      min="0"
                      className={modalInputCls}
                      value={quotation.quotedPrice}
                      onChange={(e) =>
                        setQuotation({
                          ...quotation,
                          quotedPrice: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className={`font-medium ${labelText}`}>
                      Pricing Type
                    </label>
                    <select
                      className={modalInputCls}
                      value={quotation.pricingType}
                      onChange={(e) =>
                        setQuotation({
                          ...quotation,
                          pricingType: e.target.value,
                        })
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
                    <label className={`font-medium ${labelText}`}>
                      Estimated Start Date
                    </label>
                    <input
                      type="date"
                      className={modalInputCls}
                      value={quotation.estimatedStartDate}
                      onChange={(e) =>
                        setQuotation({
                          ...quotation,
                          estimatedStartDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className={`font-medium ${labelText}`}>
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className={`${modalInputCls} resize-none`}
                      placeholder="Write your message..."
                      value={quotation.message}
                      onChange={(e) =>
                        setQuotation({
                          ...quotation,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className={[
                    "px-6 py-3 rounded-xl border font-medium transition-colors",
                    darkMode
                      ? "border-white/10 text-slate-300 hover:bg-white/5"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {hasSubmitted ? "Close" : "Cancel"}
                </button>

                {/* Fixed: this previously called `setShowModal(true)` again
                    (a no-op copy/paste bug) instead of actually submitting
                    the quotation — the form could never be sent. */}
                {request.status === "open" && !hasSubmitted && (
                  <button
                    onClick={submitQuotation}
                    disabled={submitting}
                    className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-lime-500 text-white"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
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

const QuotationSummary = ({ myQuotation, darkMode, heading, mutedText }) => {
  const statusPill =
    {
      accepted: "bg-green-500 text-white",
      rejected: "bg-red-500 text-white",
    }[myQuotation.status] ?? "bg-yellow-500 text-white";

  return (
    <div
      className={` rounded-2xl p-5 border ${
        darkMode
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-emerald-50 border-emerald-200"
      }`}
    >
      <h3
        className={`font-bold text-lg mb-4 ${darkMode ? "text-emerald-300" : "text-emerald-700"}`}
      >
        Your Quotation
      </h3>

      <div className={`space-y-3 ${heading}`}>
        <div className="flex justify-between">
          <span className={mutedText}>Quoted Price</span>
          <strong>₹{myQuotation.quotedPrice}</strong>
        </div>

        <div className="flex justify-between">
          <span className={mutedText}>Pricing</span>
          <strong className="capitalize">
            {myQuotation.pricingType?.replaceAll("_", " ")}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className={mutedText}>Start Date</span>
          <strong>
            {myQuotation.estimatedStartDate
              ? new Date(myQuotation.estimatedStartDate).toLocaleDateString(
                  "en-IN",
                )
              : "-"}
          </strong>
        </div>

        <div>
          <p className={`text-sm mb-1 ${mutedText}`}>Message</p>
          <p
            className={`rounded-xl p-3 ${darkMode ? "bg-white/5" : "bg-black/5"}`}
          >
            {myQuotation.message || "No message"}
          </p>
        </div>

        <div className="pt-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusPill}`}
          >
            {myQuotation.status}
          </span>
        </div>
      </div>
    </div>
  );
};
