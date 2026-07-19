import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  IndianRupee,
  User,
} from "lucide-react";

import {
  getServiceRequestById,
} from "../../services/serviceRequest.service";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);

  const fetchRequest = async () => {
    try {
      setLoading(true);

      const { data } = await getServiceRequestById(id);

      setRequest(data.request);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load request"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        Request not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-emerald-600 font-semibold"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Header */}

      <div className="rounded-3xl border bg-white dark:bg-slate-900 p-6">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-4xl font-bold">
              {request.title}
            </h1>

            <p className="mt-2 opacity-70">
              {request.category}
            </p>

          </div>

          <span className="px-4 py-2 rounded-full bg-blue-500 text-white capitalize">
            {request.status}
          </span>

        </div>

      </div>

      {/* Description */}

      <div className="rounded-3xl border bg-white dark:bg-slate-900 p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Description
        </h2>

        <p>{request.description}</p>

      </div>

      {/* Details */}

      <div className="rounded-3xl border bg-white dark:bg-slate-900 p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Request Details
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <strong>Land Area</strong>
            <p>{request.landArea} {request.unit}</p>
          </div>

          <div>
            <strong>Required Date</strong>
            <p>
              {request.requiredDate
                ? new Date(request.requiredDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <strong>Village</strong>
            <p>{request.location?.village || "-"}</p>
          </div>

          <div>
            <strong>District</strong>
            <p>{request.location?.district || "-"}</p>
          </div>

          <div>
            <strong>State</strong>
            <p>{request.location?.state || "-"}</p>
          </div>

          <div>
            <strong>Pincode</strong>
            <p>{request.location?.pincode || "-"}</p>
          </div>

        </div>

      </div>

      {/* Images */}

      {request.images?.length > 0 && (

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Field Images
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {request.images.map((img) => (

              <img
                key={img}
                src={img}
                alt=""
                className="rounded-2xl h-56 w-full object-cover"
              />

            ))}

          </div>

        </div>

      )}

      {/* Quotations */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Received Quotations
        </h2>

        {request.responses?.length === 0 ? (

          <div className="rounded-2xl border p-12 text-center">

            <h3 className="text-xl font-semibold">
              No quotations yet
            </h3>

            <p className="mt-2 opacity-70">
              Nearby sellers will send quotations soon.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {request.responses.map((quote) => (

              <div
                key={quote._id}
                className="rounded-2xl border p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-3">

                      <User size={18} />

                      <h3 className="text-xl font-semibold">
                        {quote.seller?.name || "Seller"}
                      </h3>

                    </div>

                    <p className="mt-3 opacity-70">
                      {quote.message || "No message"}
                    </p>

                  </div>

                  <div className="text-right">

                    <div className="flex items-center justify-end gap-1 text-2xl font-bold">

                      <IndianRupee size={22} />

                      {quote.quotedPrice}

                    </div>

                    <p className="text-sm opacity-70 capitalize">
                      {quote.pricingType?.replaceAll("_", " ")}
                    </p>

                  </div>

                </div>

                <div className="flex justify-between items-center mt-6">

                  <div className="flex items-center gap-2 text-sm">

                    <CalendarDays size={16} />

                    {quote.estimatedStartDate
                      ? new Date(
                          quote.estimatedStartDate
                        ).toLocaleDateString()
                      : "Start date not specified"}

                  </div>

                  <button
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                  >
                    Accept Quotation
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default ServiceDetails;