import { ChevronLeft, ChevronRight, MapPin, CalendarDays, Expand, IndianRupee, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export const machineCategories = ["All","Tractor","Harvester","Rotavator","Cultivator","Seeder","Sprayer","Drone"];
export const productCategories = ["All","Vegetables","Fruits","Grains","Dairy","Spices"];
export const serviceCategories = ["All","Land Preparation","Ploughing","Rotavator","Seeding","Transplanting","Irrigation","Spraying","Fertilizer Application","Harvesting","Transportation","Threshing","Others"];
export const pricingTypes = [
  { value: "per_acre", label: "Per Acre" },
  { value: "per_hectare", label: "Per Hectare" },
  { value: "per_day", label: "Per Day" },
  { value: "per_hour", label: "Per Hour" },
  { value: "per_trip", label: "Per Trip" },
  { value: "per_km", label: "Per KM" },
  { value: "fixed", label: "Fixed Price" },
];

export const EmptyBox = ({ darkMode, icon, title, sub, amber, indigo }) => {
  const iconBg = amber
    ? darkMode ? "bg-[rgba(245,158,11,0.10)] text-[#FCD34D]" : "bg-[rgba(245,158,11,0.10)] text-[#D97706]"
    : indigo
      ? darkMode ? "bg-[rgba(99,102,241,0.12)] text-indigo-400" : "bg-indigo-50 text-indigo-600"
      : darkMode ? "bg-[rgba(52,211,153,0.10)] text-[#34D399]" : "bg-[rgba(5,150,105,0.10)] text-[#059669]";
  return (
    <div className={["text-center py-20 max-w-xl mx-auto backdrop-blur-[16px] rounded-3xl border-[1.5px] border-dashed", darkMode ? "bg-white/[0.04] border-[rgba(52,211,153,0.15)]" : "bg-white/[0.72] border-[rgba(6,95,70,0.14)]"].join(" ")}>
      <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${iconBg}`}>{icon}</div>
      <h2 className={["text-2xl font-bold font-['Space_Grotesk',ui-sans-serif,sans-serif]", darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]"].join(" ")}>{title}</h2>
      <p className={["mt-2 text-sm", darkMode ? "text-[rgba(167,243,208,0.50)]" : "text-[rgba(6,95,70,0.50)]"].join(" ")}>{sub}</p>
    </div>
  );
};

export const Pagination = ({ darkMode, pagination, onPrev, onNext }) => {
  const btnCls = [
    "flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase shadow-sm transition-all duration-200",
    "disabled:opacity-[0.38] disabled:cursor-not-allowed",
    "hover:enabled:bg-gradient-to-r hover:enabled:from-[#059669] hover:enabled:to-[#84CC16] hover:enabled:text-white hover:enabled:border-transparent hover:enabled:shadow-[0_8px_18px_-6px_rgba(5,150,105,0.45)]",
    darkMode ? "bg-white/[0.06] border border-[rgba(52,211,153,0.14)] text-[#6EE7B7]" : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#065F46]",
  ].join(" ");
  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      <button onClick={onPrev} disabled={pagination.currentPage === 1} className={btnCls}><ChevronLeft size={16} /> Prev</button>
      <span className={["font-bold text-sm font-['IBM_Plex_Mono',ui-monospace,monospace]", darkMode ? "text-[rgba(167,243,208,0.55)]" : "text-[rgba(6,95,70,0.60)]"].join(" ")}>
        {pagination.currentPage} / {pagination.totalPages}
      </span>
      <button onClick={onNext} disabled={pagination.currentPage === pagination.totalPages || pagination.totalPages === 0} className={btnCls}>Next <ChevronRight size={16} /></button>
    </div>
  );
};

export const DetailRow = ({ icon, value, darkMode }) => (
  <div className={["flex items-center gap-2 text-sm", darkMode ? "text-slate-300" : "text-slate-600"].join(" ")}>
    <span className={darkMode ? "text-indigo-400" : "text-indigo-500"}>{icon}</span>
    {value}
  </div>
);

export const ServiceRequestCard = ({ req, darkMode, onRespond, canRespond, isAuthenticated }) => {
  const responseCount = req.responses?.length ?? 0;
  const dateStr = req.requiredDate
    ? new Date(req.requiredBy).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";
  return (
    <div className={["rounded-3xl p-5 flex flex-col gap-4 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200", darkMode ? "bg-white/[0.05] border border-[rgba(99,102,241,0.18)] hover:shadow-indigo-500/15 backdrop-blur-md" : "bg-white/85 border border-indigo-100/70 hover:shadow-indigo-400/15 backdrop-blur-md"].join(" ")}>
      <div className="flex items-start justify-between gap-2">
        <span className={["text-xs font-bold px-2.5 py-1 rounded-full", darkMode ? "bg-indigo-900/40 text-indigo-300" : "bg-indigo-50 text-indigo-700"].join(" ")}>{req.category}</span>
        <span className={["text-xs font-semibold px-2.5 py-1 rounded-full", darkMode ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-500"].join(" ")}>{responseCount} {responseCount === 1 ? "quotation" : "quotations"}</span>
      </div>
      <h3 className="text-lg font-bold">{req.title}</h3>
      <p className="text-sm line-clamp-3">{req.description}</p>
      <div className="flex items-center gap-2"><IndianRupee size={15} />₹{req.budget} / {req.pricingType.replace("_", " ")}</div>
      <div className="space-y-2.5">
        <DetailRow darkMode={darkMode} icon={<MapPin size={14} />} value={`${req.location?.district ?? "—"}, ${req.location?.state ?? ""}`} />
        <DetailRow darkMode={darkMode} icon={<Expand size={14} />} value={`${req.landArea} ${req.unit}`} />
        <DetailRow darkMode={darkMode} icon={<CalendarDays size={14} />} value={`Needed by ${dateStr}`} />
      </div>
      {req.buyer?.name && (
        <p className={["text-xs font-medium", darkMode ? "text-slate-500" : "text-slate-400"].join(" ")}>
          Posted by <span className={darkMode ? "text-slate-300" : "text-slate-600"}>{req.buyer.name}</span>
        </p>
      )}
      {canRespond ? (
        <button onClick={onRespond} className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all">Submit Quotation</button>
      ) : !isAuthenticated ? (
        <Link to="/login" className={["w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all", darkMode ? "bg-white/[0.06] border border-indigo-400/25 text-indigo-300 hover:bg-white/[0.1]" : "bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100"].join(" ")}><LogIn size={13} /> Login to Respond</Link>
      ) : (
        <button disabled className={["w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide cursor-not-allowed", darkMode ? "bg-white/[0.04] text-slate-500" : "bg-slate-100 text-slate-400"].join(" ")}>Seller Only</button>
      )}
    </div>
  );
};