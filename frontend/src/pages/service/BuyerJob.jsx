import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  IndianRupee,
  User,
  ArrowLeft,
  Play,
  CheckCircle,
  Loader2,
  FileText,
  Tractor,
  Check,
} from "lucide-react";

import {
  getServiceOrderByRequestId,
  startWork,
  completeWork,
} from "../../services/serviceOrder.service";
import { useTheme } from "../../context/ThemeContext";
const steps = [
  { key: "assigned", label: "Assigned" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

const statusTheme = {
  assigned: {
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    chip: "bg-indigo-600",
    dot: "bg-indigo-600",
  },
  in_progress: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    chip: "bg-amber-500",
    dot: "bg-amber-500",
  },
  completed: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    chip: "bg-emerald-600",
    dot: "bg-emerald-600",
  },
};

const Card = ({ icon, title, value }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/20 p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-amber-400 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-indigo-700 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider dark:text-white text-slate-500">
          {title}
        </p>
        <p className="mt-1 text-lg font-bold dark:text-white/80 text-slate-900">{value}</p>
      </div>
    </div>
  </div>
);

export default function SellerJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
    const { darkMode } = useTheme();
  const fetchOrder = async () => {
    try {
      const { data } = await getServiceOrderByRequestId(id);
      setOrder(data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleStartWork = async () => {
    try {
      setProcessing(true);
      await startWork(order._id);
      toast.success("Work started.");
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCompleteWork = async () => {
    try {
      setProcessing(true);
      await completeWork(order._id);
      toast.success("Work marked as completed.");
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const theme = statusTheme[order.status] || statusTheme.assigned;
  const stepIndex = steps.findIndex((s) => s.key === order.status);

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group dark:text-white dark:hover:bg-emerald-700 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-indigo-700 hover:shadow-sm"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to jobs
          </button>

          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ring-1 ${theme.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
            ACTIVE JOB
          </span>
        </div>

        {/* Header */}
        <div className="mt-8">
          <p className="text-sm  font-semibold uppercase tracking-widest text-amber-600">
            {order.category}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight dark:text-white text-slate-900 sm:text-4xl">
            {order.title}
          </h1>
        </div>

        {/* Buyer card */}
        <div className="mt-8  rounded-3xl border border-slate-200 dark:border-white/3 bg-white/20 dark:bg-white/4  p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold dark:text-white text-slate-900">Buyer</h2>

          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
            <img
              src={
                order.buyer?.profileImage ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                  order.buyer?.name || "Buyer"
                )}`
              }
              alt={order.buyer?.name || "Buyer"}
              className="h-20 w-20 rounded-full border-4 border-white dark:border-white/10 object-cover shadow-md ring-1 ring-slate-200 dark:ring-slate-200/10"
            />

            <div className="flex-1">
              <h3 className="text-xl font-bold dark:text-white text-slate-900">
                {order.buyer?.name}
              </h3>
              <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm dark:text-white text-slate-600">
                {order.buyer?.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-slate-400 dark:text-white" />
                    {order.buyer.phone}
                  </span>
                )}
                {order.buyer?.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-slate-400 dark:text-white" />
                    {order.buyer.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${order.buyer?.phone}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
            >
              <Phone size={18} />
              Call Buyer
            </a>
            <a
              href={`mailto:${order.buyer?.email}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold  text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-[0.98]"
            >
              <Mail size={18} />
              Email Buyer
            </a>
          </div>
        </div>

        {/* Detail grid */}
        <div className="mt-6 grid dark:text-white bg-white/20 dark:bg-white/4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={<IndianRupee size={20} />}
            title="Final Price"
            value={`₹${order.finalPrice} (${order.pricingType})`}
          />
          <Card
            icon={<User size={20} />}
            title="Land Area"
            value={`${order.landArea} ${order.unit}`}
          />
          <Card
            icon={<CalendarDays size={20} />}
            title="Start Date"
            value={
              order.estimatedStartDate
                ? new Date(order.estimatedStartDate).toLocaleDateString(
                    "en-IN"
                  )
                : "-"
            }
          />
          <Card
            icon={<MapPin size={20} />}
            title="Location"
            value={`${order.location?.village || "-"}, ${
              order.location?.district || "-"
            }`}
          />
        </div>

        {/* Description */}
        <div className="mt-6 dark:border-white/3 rounded-3xl border border-slate-200 bg-white/20 dark:bg-white/4 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-indigo-600" />
            <h2 className="text-lg font-bold dark:text-white text-slate-900">Job Description</h2>
          </div>
          <p className="mt-4 leading-relaxed dark:text-white/80 text-slate-600">
            {order.description || "No description provided."}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-6 dark:border-white/3 rounded-3xl border border-slate-200 bg-white/20 dark:bg-white/4 p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2">
            <Tractor size={20} className="text-indigo-600" />
            <h2 className="text-lg font-bold dark:text-white text-slate-900">Progress</h2>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full rounded-full bg-slate-100" />
                <div
                  className="absolute h-1 rounded-full bg-linear-to-r from-indigo-500 to-emerald-500 transition-all"
                  style={{
                    width: `${(stepIndex / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                {steps.map((step, idx) => {
                  const active = idx <= stepIndex;
                  const current = idx === stepIndex;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center  rounded-full border-2 transition-all ${
                          active
                            ? "border-transparent bg-indigo-600  dark:text-white shadow-md"
                            : "border-slate-200 bg-white  text-slate-400"
                        } ${current ? "ring-4 ring-indigo-100" : ""}`}
                      >
                        {active ? (
                          idx === stepIndex ? (
                            <span className="text-sm  font-bold">
                              {idx + 1}
                            </span>
                          ) : (
                            <Check size={18} />
                          )
                        ) : (
                          <span className="text-sm font-bold">{idx + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          active ? "text-slate-900 dark:text-white" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8">
          {order.status === "assigned" && (
            <button
              disabled={processing}
              onClick={handleStartWork}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg disabled:opacity-60 disabled:hover:shadow-none active:scale-[0.99]"
            >
              {processing ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Play size={20} />
              )}
              Start Work
            </button>
          )}

          {order.status === "in_progress" && (
            <button
              disabled={processing}
              onClick={handleCompleteWork}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg disabled:opacity-60 disabled:hover:shadow-none active:scale-[0.99]"
            >
              {processing ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <CheckCircle size={20} />
              )}
              Mark as Completed
            </button>
          )}

          {order.status === "completed" && (
            <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-6 py-4 text-base font-bold text-emerald-700 ring-1 ring-emerald-200">
              <CheckCircle size={20} />
              Job Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
