import { Link } from "react-router-dom";
import { Star, MapPin, Wrench } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/* Mirrors ProductCard / MachineCard conventions used elsewhere in the app:
   a dark-mode-aware glass card driven by the `useTheme()` boolean (this
   file follows the same ternary-className pattern already used throughout
   Marketplace.jsx, rather than Tailwind's `dark:` variant). */
const ServiceCard = ({ service }) => {
  const { darkMode } = useTheme();

  const priceLabel =
    service.pricingType === "per_hour"
      ? `₹${service.price}/hr`
      : service.pricingType === "per_day"
        ? `₹${service.price}/day`
        : service.pricingType === "per_acre"
          ? `₹${service.price}/acre`
          : service.pricingType === "per_km"
            ? `₹${service.price}/km`
            : service.pricingType === "per_trip"
              ? `₹${service.price}/trip`
              : `₹${service.price}`;

  return (
    <div
      className={[
        "rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300",
        "backdrop-blur-[16px] hover:-translate-y-1.5",
        darkMode
          ? "bg-white/[0.06] border border-[rgba(52,211,153,0.12)] hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.55)]"
          : "bg-white/[0.75] border border-white/60 shadow-sm hover:shadow-[0_20px_40px_-18px_rgba(5,150,105,0.30)]",
      ].join(" ")}
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={
              service.images?.[0] ||
              "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600"
            }
            alt={service.title}
            className="h-full w-full object-cover"
          />

          <span
            className={[
              "absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide",
              darkMode
                ? "bg-[rgba(52,211,153,0.18)] text-[#6EE7B7]"
                : "bg-white/90 text-[#065F46]",
            ].join(" ")}
          >
            <Wrench size={11} />
            {service.category || "Service"}
          </span>

          {service.rating && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/45 text-white">
              <Star size={12} fill="#FCD34D" className="text-transparent" />
              {service.rating}
            </span>
          )}
        </div>

        <div className="p-5">
          <h3
            className={[
              "font-['Space_Grotesk',ui-sans-serif,sans-serif] text-lg font-bold",
              darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
            ].join(" ")}
          >
            {service.title}
          </h3>

          {service.provider && (
            <p
              className={[
                "text-sm mt-1",
                darkMode
                  ? "text-[rgba(167,243,208,0.55)]"
                  : "text-[rgba(6,95,70,0.55)]",
              ].join(" ")}
            >
              by {service.provider?.name}
            </p>
          )}

          {service.location && (
            <div
              className={[
                "flex items-center gap-1 mt-2 text-xs",
                darkMode
                  ? "text-[rgba(167,243,208,0.45)]"
                  : "text-[rgba(6,95,70,0.45)]",
              ].join(" ")}
            >
              <MapPin size={12} />
              {service.location && (
                <div
                  className={[
                    "flex items-center gap-1 mt-2 text-xs",
                    darkMode
                      ? "text-[rgba(167,243,208,0.45)]"
                      : "text-[rgba(6,95,70,0.45)]",
                  ].join(" ")}
                >
                  <MapPin size={12} />
                  {service.location.village}, {service.location.district}
                </div>
              )}
            </div>
          )}

          {service.description && (
            <p
              className={[
                "text-sm mt-3 line-clamp-2 leading-6",
                darkMode ? "text-[#B9CFC0]" : "text-[#3F5A4C]",
              ].join(" ")}
            >
              {service.description}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between gap-3">
        <span
          className={[
            "font-['Space_Grotesk',ui-sans-serif,sans-serif] text-xl font-bold",
            darkMode ? "text-[#A3E635]" : "text-[#065F46]",
          ].join(" ")}
        >
          {priceLabel}
        </span>

        <Link
          to={`/services/${service._id}`}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide text-white
            bg-gradient-to-r from-emerald-600 to-lime-500
            shadow-[0_8px_16px_-6px_rgba(5,150,105,0.45)]
            hover:-translate-y-0.5 transition-transform"
        >
          Request
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
