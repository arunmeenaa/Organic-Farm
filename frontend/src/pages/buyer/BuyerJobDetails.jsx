import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  IndianRupee,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  Clock3,
  Tractor,
} from "lucide-react";

import { getServiceOrderByRequestId } from "../../services/serviceOrder.service";

const BuyerJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const { data } = await getServiceOrderByRequestId(id);

      setOrder(data.order);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        Job not found.
      </div>
    );
  }

  const statusColor = {
    assigned: "bg-blue-100 text-blue-700",
    accepted: "bg-indigo-100 text-indigo-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-emerald-600 font-semibold mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Header */}

      <div  className="
rounded-[28px]
p-7
backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]
">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-4xl font-black">
              {order.title}
            </h1>

            <p className="mt-2 text-gray-500">
              {order.category}
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold capitalize ${
              statusColor[order.status]
            }`}
          >
            {order.status.replace("_"," ")}
          </span>

        </div>

      </div>

      {/* Seller */}

      <div className="grid md:grid-cols-2 gap-6 mt-8 ">

        <div className="rounded-3xl    p-6 backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

          <h2 className="text-2xl font-bold mb-5">
            Provider
          </h2>

          <div className="flex gap-4">

            <img
              src={
                order.seller.profileImage ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                  order.seller.name
                )}`
              }
              className="w-20 h-20 rounded-2xl object-cover"
              alt=""
            />

            <div>

              <h3 className="text-xl font-bold">
                {order.seller.name}
              </h3>

              <p className="flex items-center gap-2 mt-3">
                <Phone size={16} />
                {order.seller.phone}
              </p>

              <p className="mt-2">
                {order.seller.email}
              </p>

            </div>

          </div>

        </div>

        {/* Price */}

        <div className="rounded-3xl    p-6 backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

          <h2 className="text-2xl font-bold">
            Final Price
          </h2>

          <div className="flex items-center gap-2 mt-5 text-5xl font-black text-emerald-600">

            <IndianRupee />

            {order.finalPrice}

          </div>

          <p className="mt-3 opacity-70">
            {order.pricingType.replaceAll("_"," ")}
          </p>

        </div>

      </div>

      {/* Details */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="rounded-3xl    p-6 backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

          <h2 className="font-bold text-xl mb-5">
            Job Details
          </h2>

          <div className="space-y-4">

            <p>
              <MapPin className="inline mr-2" size={16}/>
              {order.location?.village || "-"}
              {order.location?.district || "-" }
            </p>

            <p>
              <Tractor className="inline mr-2" size={16}/>
              {order.landArea} {order.unit}
            </p>

            <p>
              <CalendarDays className="inline mr-2" size={16}/>
              {order.estimatedStartDate
                ? new Date(order.estimatedStartDate).toLocaleDateString()
                : "-"}
            </p>

          </div>

        </div>

        {/* Progress */}

        <div className="rounded-3xl    p-6 backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

          <h2 className="font-bold text-xl mb-6">
            Progress
          </h2>

          <div className="space-y-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-500"/>

              <div>

                <p className="font-semibold">
                  Quotation Accepted
                </p>

                <p className="text-sm opacity-70">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

            </div>

            {order.startedAt && (

              <div className="flex gap-3">

                <Clock3 className="text-blue-500"/>

                <div>

                  <p className="font-semibold">
                    Work Started
                  </p>

                  <p className="text-sm opacity-70">
                    {new Date(order.startedAt).toLocaleDateString()}
                  </p>

                </div>

              </div>

            )}

            {order.completedAt && (

              <div className="flex gap-3">

                <CheckCircle2 className="text-emerald-500"/>

                <div>

                  <p className="font-semibold">
                    Work Completed
                  </p>

                  <p className="text-sm opacity-70">
                    {new Date(order.completedAt).toLocaleDateString()}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

      {order.status === "completed" && (

        <div className="mt-10 text-right">

          <button
            className="px-7 py-3 rounded-2xl bg-emerald-600 text-white font-semibold"
          >
            Confirm Completion
          </button>

        </div>

      )}

    </div>
  );
};

export default BuyerJobDetails;