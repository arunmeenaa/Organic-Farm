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

const BuyerRequestCard = ({ req }) => {
  const { darkMode } = useTheme();

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
        darkMode
          ? "bg-white/5 border-white/10 hover:shadow-emerald-900/30"
          : "bg-white/70 border-white/60 hover:shadow-emerald-500/15",
      ].join(" ")}
    >
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
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${
              statusColor[req.status] || statusColor.open
            }`}
          >
            {req.status.replace("_", " ")}
          </span>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default BuyerRequestCard;
