import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Wheat,
  ClipboardList,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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

  const statusTheme = {
    open: {
      top: "bg-blue-500",
      badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    accepted: {
      top: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    in_progress: {
      top: "bg-amber-500",
      badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    },
    completed: {
      top: "bg-teal-500",
      badge: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300",
    },
    cancelled: {
      top: "bg-red-500",
      badge: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    },
  };

  const current = statusTheme[req.status] || statusTheme.open;

  const surface = darkMode
    ? "bg-white/5 border-slate-700/60 hover:border-slate-500"
    : "bg-white/10 border-stone-200/80 hover:border-stone-300";

  const textMain = darkMode ? "text-slate-100" : "text-stone-900";
  const textMuted = darkMode ? "text-slate-400" : "text-stone-500";
  const borderSub = darkMode ? "border-slate-700/50" : "border-stone-200/60";

  const avatarFallback = (req.buyer?.name || "B")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const quotationPanel = quotationAccepted
    ? "border-l-emerald-500 bg-emerald-50/40 dark:bg-emerald-900/15"
    : quotationRejected
    ? "border-l-red-500 bg-red-50/40 dark:bg-red-900/15"
    : hasBuyerCounter
    ? "border-l-amber-500 bg-amber-50/40 dark:bg-amber-900/15"
    : "border-l-blue-500 bg-blue-50/40 dark:bg-blue-900/15";

  return (
    <div
      className={cx(
        "group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        surface
      )}
    >
      {/* Status top strip */}
      <div className={cx("h-1.5 w-full", current.top)} />

      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 dark:bg-slate-800 dark:text-slate-300">
                {req.category}
              </span>
              <span
                className={cx(
                  "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                  current.badge
                )}
              >
                {req.status.replace("_", " ")}
              </span>
            </div>

            <h2 className={cx("text-lg font-bold leading-snug", textMain)}>
              {req.title}
            </h2>

            {/* Buyer */}
            <div className="mt-3 flex items-center gap-3">
              {req.buyer?.profileImage ? (
                <img
                  src={req.buyer.profileImage}
                  alt={req.buyer.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-stone-100 dark:ring-slate-700"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  {avatarFallback}
                </div>
              )}
              <div>
                <p className={cx("text-xs", textMuted)}>Requested by</p>
                <div className="flex items-center gap-1.5">
                  <p className={cx("text-sm font-semibold", textMain)}>
                    {req.buyer?.name || "Unknown Buyer"}
                  </p>
                  {req.buyer?.isVerified && (
                    <span className="text-xs text-emerald-500">✓</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right indicators */}
          <div className="flex flex-col items-end gap-2">
            {quotationAccepted && (
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                ACTIVE JOB
              </span>
            )}
            {hasBuyerCounter && (
              <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white animate-pulse">
                NEW
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Accepted banner */}
      {quotationAccepted && (
        <div className="mx-5 mb-5 rounded-xl border border-emerald-500/30  bg-emerald-500/80 p-4 text-white shadow-lg shadow-emerald-900/20">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold">
                🎉 Your quotation was accepted
              </h3>
              
            </div>
            <span className="shrink-0 rounded-full bg-yellow-400/70 px-2.5 py-1 text-[10px] font-semibold">
              ACTION
            </span>
          </div> 
          <Link
            to={`/seller/job/${req._id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:scale-105"
          >
            View Job <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* My quotation */}
      {myQuotation && (
        <div
          className={cx(
            "mx-5 mb-5 rounded-r-xl border-l-4 p-4",
            quotationPanel
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={cx("text-sm font-semibold", textMain)}>
                Your Quotation
              </p>
              <p className={cx("text-sm", textMuted)}>
                ₹{myQuotation.finalPrice || myQuotation.quotedPrice}
              </p>
            </div>
            {quotationAccepted ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                ✓ Selected by Buyer
              </span>
            ) : quotationRejected ? (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                Rejected
              </span>
            ) : hasBuyerCounter ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 animate-pulse dark:bg-amber-900/40 dark:text-amber-300">
                Counter Offer
              </span>
            ) : (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                Waiting
              </span>
            )}
          </div>

          {hasBuyerCounter && (
            <div className="mt-3 border-t pt-3 dark:border-white/10">
              <p className={cx("text-sm", textMain)}>
                Buyer Offer:{" "}
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  ₹{myQuotation.buyerOffer}
                </span>
              </p>
              {myQuotation.buyerMessage && (
                <p className="mt-2 text-sm italic opacity-80">
                  “{myQuotation.buyerMessage}”
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="px-5 pb-5">
        <p className={cx("text-sm leading-relaxed line-clamp-3", textMuted)}>
          {req.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <Wheat size={16} />
            </div>
            <div>
              <p className={cx("text-xs", textMuted)}>Land Area</p>
              <p className={cx("text-sm font-semibold", textMain)}>
                {req.landArea} {req.unit}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <CalendarDays size={16} />
            </div>
            <div>
              <p className={cx("text-xs", textMuted)}>Required</p>
              <p className={cx("text-sm font-semibold", textMain)}>
                {requiredDate}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <MapPin size={16} />
            </div>
            <div>
              <p className={cx("text-xs", textMuted)}>Location</p>
              <p className={cx("text-sm font-semibold", textMain)}>
                {req.location?.district}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <ClipboardList size={16} />
            </div>
            <div>
              <p className={cx("text-xs", textMuted)}>Quotations</p>
              <p className={cx("text-sm font-semibold", textMain)}>
                {req.responses?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={cx("mt-5 flex items-center justify-between border-t pt-4", borderSub)}>
          <div className={cx("flex items-center gap-2 text-xs", textMuted)}>
            <Clock size={14} />
            Posted {postedDate}
          </div>

          <Link
            to={`/seller/request/${req._id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerRequestCard;
