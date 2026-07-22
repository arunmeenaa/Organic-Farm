import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Wheat,
  ClipboardList,
  ArrowRight,
  Clock,
  CheckCircle2,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const BuyerRequestCard = ({ req }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  const requiredDate = req.requiredDate
    ? new Date(req.requiredDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  const postedDate = req.createdAt
    ? new Date(req.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "";

  const myQuotation = req.responses?.find((r) => r.seller?._id === user?._id);
  const hasBuyerCounter = myQuotation?.counterStatus === "pending";
  const quotationAccepted = myQuotation?.status === "accepted";
  const quotationRejected = myQuotation?.status === "rejected";

  const statusColor = {
    open: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
    accepted: "bg-green-500/15 text-green-600 dark:text-green-300",
    in_progress: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
    completed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
    cancelled: "bg-red-500/15 text-red-600 dark:text-red-300",
  };

  return (
    <div
      className={[
        "rounded-3xl overflow-hidden transition-all duration-300",
        "backdrop-blur-xl border hover:-translate-y-1 hover:shadow-xl",
        quotationAccepted
          ? darkMode
            ? " bg-white/5  hover:shadow-green-900/40 ring-2 ring-green-500/30"
            : " bg-white/5 hover:shadow-green-500/25 ring-2 ring-green-400/30"
          : darkMode
          ? "bg-white/5  hover:shadow-emerald-900/30"
          : "bg-white/20  hover:shadow-emerald-500/15",
      ].join(" ")}
    >
      {/* ── Accepted Congratulations Banner ── */}
      {quotationAccepted && (
        <div className="relative blur-mdl overflow-hidden px-5 py-4 bg-gradient-to-r from-green-600 to-emerald-500">
          {/* Decorative shimmer */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shimmer_2.5s_infinite]" />

          <div className="flex items-center gap-3">
            <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              <CheckCircle2 size={22} className="text-white" />
            </div>

            <div>
              <p className="text-white font-bold text-base leading-tight">
                🎉 Congratulations! Your quotation was accepted.
              </p>
              <p className="text-green-100 text-xs mt-0.5">
                The buyer has confirmed your offer — you're all set to begin.
              </p>
            </div>
          </div>

          {/* ACTION REQUIRED badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1">
            <AlertTriangle size={12} className="text-yellow-200 animate-pulse" />
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">
              Action Required
            </span>
            <AlertTriangle size={12} className="text-yellow-200 animate-pulse" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-5 border-b border-emerald-500/10">
        <div className="flex justify-between items-start gap-4">
          {/* Left */}
          <div className="flex-1">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                statusColor[req.status] || statusColor.open
              }`}
            >
              {req.category}
            </span>

            <h2
              className={[
                "text-xl font-bold leading-snug",
                darkMode ? "text-white" : "text-emerald-950",
              ].join(" ")}
            >
              {req.title}
            </h2>

            {/* Buyer */}
            <div className="flex items-center gap-3 mt-4">
              {req.buyer?.profileImage ? (
                <img
                  src={req.buyer.profileImage}
                  alt={req.buyer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                  {(req.buyer?.name || "B")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}

              <div>
                <p
                  className={`text-xs ${
                    darkMode ? "text-emerald-300/70" : "text-emerald-700/70"
                  }`}
                >
                  Requested by
                </p>

                <div className="flex items-center gap-2">
                  <p
                    className={`font-semibold ${
                      darkMode ? "text-white" : "text-emerald-950"
                    }`}
                  >
                    {req.buyer?.name || "Unknown Buyer"}
                  </p>

                  {req.buyer?.isVerified && (
                    <span className="text-emerald-500 text-xs">✓</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                statusColor[req.status] || statusColor.open
              }`}
            >
              {req.status.replace("_", " ")}
            </span>

            {hasBuyerCounter && (
              <span className="rounded-full bg-red-500 text-white text-[10px] px-2 py-1 animate-pulse">
                NEW
              </span>
            )}
          </div>
        </div>

        {myQuotation && (
          <div
            className={`mt-4 rounded-2xl border p-4 ${
              quotationAccepted
                ? "border-green-500/20 bg-green-500/10"
                : quotationRejected
                ? "border-red-500/20 bg-red-500/10"
                : hasBuyerCounter
                ? "border-amber-500/20 bg-amber-500/10"
                : "border-blue-500/20 bg-blue-500/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Your Quotation</p>

                <p className="text-sm opacity-70">
                  ₹{myQuotation.finalPrice || myQuotation.quotedPrice}
                </p>
              </div>

              {quotationAccepted ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Accepted
                </span>
              ) : quotationRejected ? (
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  Rejected
                </span>
              ) : hasBuyerCounter ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 animate-pulse">
                  Counter Offer
                </span>
              ) : (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Waiting
                </span>
              )}
            </div>

            {hasBuyerCounter && (
              <div className="mt-3">
                <p className="text-sm">
                  Buyer Offer:
                  <span className="ml-2 font-bold text-emerald-600">
                    ₹{myQuotation.buyerOffer}
                  </span>
                </p>

                {myQuotation.buyerMessage && (
                  <p className="mt-2 text-sm italic">
                    "{myQuotation.buyerMessage}"
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <p
          className={[
            "text-sm leading-6 line-clamp-3",
            darkMode ? "text-emerald-100/80" : "text-emerald-900/70",
          ].join(" ")}
        >
          {req.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex gap-3">
            <Wheat size={18} className="text-emerald-600 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Land Area</p>
              <p className="font-semibold">
                {req.landArea} {req.unit}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CalendarDays size={18} className="text-blue-500 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Required</p>
              <p className="font-semibold">{requiredDate}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <MapPin size={18} className="text-red-500 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-semibold">{req.location?.district}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <ClipboardList size={18} className="text-purple-500 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Quotations</p>
              <p className="font-semibold">{req.responses?.length || 0}</p>
            </div>
          </div>
        </div>

        <div
          className={[
            "flex items-center justify-between mt-6 pt-4 border-t",
            darkMode ? "border-white/10" : "border-emerald-500/10",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={14} />
            Posted {postedDate}
          </div>

          {/* CTA: Go to Job (accepted) vs View Details (default) */}
          {quotationAccepted ? (
            <Link
              to={`/seller/job/${req._id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-green-600 to-emerald-500
                text-white text-sm font-bold
                hover:shadow-lg hover:shadow-green-500/40
                transition-all animate-pulse hover:animate-none"
            >
              <Briefcase size={15} />
              Go to Job
              <ArrowRight size={15} />
            </Link>
          ) : (
            <Link
              to={`/seller/request/${req._id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                bg-linear-to-r from-emerald-600 to-lime-500
                text-white text-sm font-semibold
                hover:shadow-lg hover:shadow-emerald-500/30
                transition-all"
            >
              View Details
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerRequestCard;
