import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ClipboardList,
  Loader2,
  IndianRupee,
  Lock,
  Trash2,
  Plus,
  MapPin,
  CalendarDays,
  Expand,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import {
  getOpenServiceRequests,
  deleteServiceRequest,
} from "../../services/serviceRequest.service";
import {
  serviceCategories,
  pricingTypes,
  EmptyBox,
  ServiceRequestCard,
} from "../marketPlace/MarketplaceUtils";

const MyServices = ({ darkMode }) => {
  const { user, isAuthenticated } = useAuth();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [srSearch, setSrSearch] = useState("");
  const [srCategory, setSrCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await getOpenServiceRequests();
      setServiceRequests(data.requests || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load service requests",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Buyers only see their own requests; sellers/guests see all
  const filteredSR = useMemo(() => {
    let list = serviceRequests;

    if (user?.role === "buyer") {
      list = list.filter((r) => r.buyer?._id === user?._id);
    }

    return list.filter((r) => {
      const query = srSearch.toLowerCase();

      const ms =
        r.title?.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query) ||
        r.category?.toLowerCase().includes(query) ||
        r.location?.district?.toLowerCase().includes(query) ||
        r.location?.village?.toLowerCase().includes(query);
      const mc = srCategory === "All" || r.category === srCategory;
      return ms && mc;
    });
  }, [serviceRequests, srSearch, srCategory, user]);

  const handleDelete = async (reqId) => {
    if (!window.confirm("Delete this service request? This cannot be undone."))
      return;
    try {
      setDeletingId(reqId);
      await deleteServiceRequest(reqId);
      toast.success("Request deleted.");
      setServiceRequests((prev) => prev.filter((r) => r._id !== reqId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete request.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ── Shared styling ── */
  const inputCls = [
    "w-full rounded-xl py-3 px-4 text-sm font-medium outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] placeholder:text-[rgba(167,243,208,0.35)] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] placeholder:text-[rgba(6,95,70,0.30)] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  const selectInputCls = [
    "rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer w-full outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)] [&>option]:bg-[#0B1A12] [&>option]:text-[#D1FAE5]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  const isBuyer = user?.role === "buyer";

  // Guests get a login prompt instead of an empty/broken list.
  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-24 px-6 text-center">
        <div
          className={[
            "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4",
            darkMode
              ? "bg-[rgba(99,102,241,0.12)] text-indigo-400"
              : "bg-indigo-50 text-indigo-600",
          ].join(" ")}
        >
          <Lock size={28} />
        </div>
        <h2
          className={[
            "text-2xl font-bold font-['Space_Grotesk',ui-sans-serif,sans-serif]",
            darkMode ? "text-[#D1FAE5]" : "text-[#064E3B]",
          ].join(" ")}
        >
          Login Required
        </h2>
        <p
          className={[
            "mt-2 text-sm",
            darkMode
              ? "text-[rgba(167,243,208,0.55)]"
              : "text-[rgba(6,95,70,0.55)]",
          ].join(" ")}
        >
          Log in as a buyer to view and manage your service requests.
        </p>
        <Link
          to="/login"
          className="inline-block mt-6 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1
            className={[
              "text-3xl font-extrabold tracking-tight bg-clip-text text-transparent font-['Space_Grotesk',ui-sans-serif,sans-serif]",
              darkMode
                ? "bg-gradient-to-r from-[#34D399] to-[#A3E635]"
                : "bg-gradient-to-r from-[#065F46] to-[#65A30D]",
            ].join(" ")}
          >
            {isBuyer ? "My Service Requests" : "Open Service Requests"}
          </h1>
          <p
            className={[
              "mt-1.5 text-sm",
              darkMode
                ? "text-[rgba(167,243,208,0.55)]"
                : "text-[rgba(6,95,70,0.55)]",
            ].join(" ")}
          >
            {isBuyer
              ? `You have ${filteredSR.length} request${filteredSR.length === 1 ? "" : "s"} posted.`
              : `${filteredSR.length} open requests from buyers.`}
          </p>
        </div>

        {isBuyer && (
          <Link
            to="/buyer/service-requests/post"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-lime-500 shadow-md shadow-emerald-600/30 hover:-translate-y-0.5 transition-all w-max"
          >
            <Plus size={18} /> New Request
          </Link>
        )}
      </div>

      {/* Filters */}
      <div
        className={[
          "p-5 rounded-2xl mb-8 backdrop-blur-[20px] grid sm:grid-cols-2 gap-4",
          darkMode
            ? "bg-white/[0.05] border border-[rgba(52,211,153,0.10)]"
            : "bg-white/50 border border-white/60 shadow-sm",
        ].join(" ")}
      >
        <div className="relative">
          <Search
            size={16}
            className={[
              "absolute left-4 top-1/2 -translate-y-1/2",
              darkMode
                ? "text-[rgba(52,211,153,0.40)]"
                : "text-[rgba(6,95,70,0.35)]",
            ].join(" ")}
          />
          <input
            type="text"
            placeholder="Search your requests..."
            value={srSearch}
            onChange={(e) => setSrSearch(e.target.value)}
            className={`${inputCls} pl-11`}
          />
        </div>

        <select
          value={srCategory}
          onChange={(e) => setSrCategory(e.target.value)}
          className={selectInputCls}
        >
          <option value="All">All Categories</option>
          {serviceCategories?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={[
                "h-56 rounded-3xl animate-pulse",
                darkMode
                  ? "bg-white/[0.05] border border-[rgba(52,211,153,0.08)]"
                  : "bg-white/70 border border-white/60",
              ].join(" ")}
            />
          ))}
        </div>
      ) : filteredSR.length === 0 ? (
        <EmptyBox
          darkMode={darkMode}
          icon={<ClipboardList size={28} />}
          title={isBuyer ? "No Requests Yet" : "No Open Requests"}
          sub={
            isBuyer
              ? "Post your first service request to start receiving quotations from farmers."
              : "No service requests match your filters right now."
          }
          indigo
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSR.map((req) => (
            <MyRequestCard
              key={req._id}
              req={req}
              darkMode={darkMode}
              isOwner={isBuyer && req.buyer?._id === user?._id}
              deleting={deletingId === req._id}
              onDelete={() => handleDelete(req._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Buyer-facing request card: shows status, response count, budget, and
   a delete action instead of the "Respond to Request" CTA. ── */
const MyRequestCard = ({ req, darkMode, isOwner, deleting, onDelete }) => {
  const responseCount = req.responses?.length ?? 0;
  const pricingLabel =
    pricingTypes?.find((p) => p.value === req.pricingType)?.label ??
    req.pricingType;
  const dateStr = req.requiredDate
    ? new Date(req.requiredDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div
      className={[
        "rounded-3xl p-5 flex flex-col gap-4 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200 relative",
        darkMode
          ? "bg-white/[0.05] border border-[rgba(99,102,241,0.18)] backdrop-blur-md"
          : "bg-white/85 border border-indigo-100/70 backdrop-blur-md",
      ].join(" ")}
    >
      {isOwner && (
        <button
          onClick={onDelete}
          disabled={deleting}
          aria-label="Delete request"
          className={[
            "absolute top-4 right-4 p-2 rounded-full transition-colors",
            darkMode
              ? "text-rose-300 hover:bg-rose-500/15"
              : "text-rose-500 hover:bg-rose-50",
            deleting && "opacity-50 cursor-not-allowed",
          ].join(" ")}
        >
          {deleting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      )}

      <div className="flex items-start justify-between gap-2 pr-8">
        <span
          className={[
            "text-xs font-bold px-2.5 py-1 rounded-full",
            darkMode
              ? "bg-indigo-900/40 text-indigo-300"
              : "bg-indigo-50 text-indigo-700",
          ].join(" ")}
        >
          {req.category}
        </span>
        <span
          className={[
            "text-xs font-semibold px-2.5 py-1 rounded-full",
            darkMode
              ? "bg-white/5 text-slate-400"
              : "bg-slate-100 text-slate-500",
          ].join(" ")}
        >
          {responseCount} {responseCount === 1 ? "response" : "responses"}
        </span>
      </div>

      <div>
        <h3
          className={[
            "font-bold font-['Space_Grotesk',ui-sans-serif,sans-serif] text-lg leading-snug",
            darkMode ? "text-white" : "text-slate-900",
          ].join(" ")}
        >
          {req.title || req.category}
        </h3>
      </div>

      <div className="space-y-2.5">
        <div
          className={[
            "flex items-center gap-2 text-sm",
            darkMode ? "text-slate-300" : "text-slate-600",
          ].join(" ")}
        >
          <MapPin
            size={14}
            className={darkMode ? "text-indigo-400" : "text-indigo-500"}
          />
          {req.location?.village ? `${req.location.village}, ` : ""}
          {req.location?.district ?? "—"}
        </div>
        <div
          className={[
            "flex items-center gap-2 text-sm",
            darkMode ? "text-slate-300" : "text-slate-600",
          ].join(" ")}
        >
          <Expand
            size={14}
            className={darkMode ? "text-indigo-400" : "text-indigo-500"}
          />
          {req.area} {req.areaUnit}
        </div>
        <div
          className={[
            "flex items-center gap-2 text-sm",
            darkMode ? "text-slate-300" : "text-slate-600",
          ].join(" ")}
        >
          <CalendarDays
            size={14}
            className={darkMode ? "text-indigo-400" : "text-indigo-500"}
          />
          Needed by {dateStr}
        </div>
      </div>

      <div
        className={[
          "flex items-center justify-between pt-3 border-t",
          darkMode ? "border-white/10" : "border-slate-100",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center gap-1 font-bold",
            darkMode ? "text-emerald-300" : "text-emerald-700",
          ].join(" ")}
        >
          <IndianRupee size={16} />
          {req.budget}
          <span className="text-xs font-medium opacity-70 ml-1">
            {pricingLabel}
          </span>
        </div>

        <Link
          to={`/buyer/service-details/${req._id}`}
          className={[
            "text-xs font-bold uppercase tracking-wide underline underline-offset-2",
            darkMode ? "text-indigo-300" : "text-indigo-600",
          ].join(" ")}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MyServices;
