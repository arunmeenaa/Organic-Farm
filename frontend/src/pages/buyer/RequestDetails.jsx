import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  IndianRupee,
  User,
  ClipboardList,
} from "lucide-react";

import { getServiceRequestById } from "../../services/serviceRequest.service";
import {
  sendCounterOffer,
  acceptQuotation,
} from "../../services/counterOffer.service";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counterPrice, setCounterPrice] = useState("");
  const [counterMessage, setCounterMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [openNegotiation, setOpenNegotiation] = useState(null);
  const fetchRequest = async () => {
    try {
      setLoading(true);

      const { data } = await getServiceRequestById(id);

      setRequest(data.request);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load request");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);
  const handleCounterOffer = async (quoteId) => {
    try {
      if (!counterPrice) {
        return toast.error("Please enter your offer.");
      }

      setActionLoading(true);

      await sendCounterOffer(id, quoteId, {
        buyerOffer: Number(counterPrice),
        buyerMessage: counterMessage,
      });

      toast.success("Counter offer sent.");

      setCounterPrice("");
      setCounterMessage("");

      fetchRequest();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send counter offer.",
      );
    } finally {
      setActionLoading(false);
    }
  };
  const handleAcceptQuotation = async (quoteId) => {
    try {
      setActionLoading(true);

      await acceptQuotation(id, quoteId);

      toast.success("Quotation accepted.");

      fetchRequest();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to accept quotation.");
    } finally {
      setActionLoading(false);
    }
  };

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

      <div
        className="
rounded-[28px]
p-7
backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]
"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">{request.title}</h1>

            <p className="mt-2 opacity-70">{request.category}</p>
          </div>

          <span className="px-4 py-2 rounded-full bg-blue-500 text-white capitalize">
            {request.status}
          </span>
        </div>
      </div>

      {/* Description */}

      <div
        className="
mt-8
rounded-[28px]
p-7 bg-white/10 dark:bg-white/5
backdrop-blur-3xl
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]
"
      >
        <h2 className="text-2xl font-bold mb-4">Description</h2>

        <p>{request.description}</p>
      </div>

      {/* Details */}

      <div
        className="
mt-8
rounded-[28px]
p-7
backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_8px_40px_rgba(0,0,0,0.12)]
"
      >
        <h2 className="text-2xl font-bold mb-6">Request Details</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <strong>Land Area</strong>
            <p>
              {request.landArea} {request.unit}
            </p>
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
          <h2 className="text-2xl font-bold mb-5">Field Images</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {request.images.map((img) => (
              <img
                key={img}
                src={img}
                alt=""
                className="
rounded-[24px]
h-56
w-full
object-cover
border
border-white/20
shadow-xl
transition
duration-500
hover:scale-[1.03]
"
              />
            ))}
          </div>
        </div>
      )}

      {/* Quotations */}

      <div className="mt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Received Quotations
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Compare quotations from nearby service providers.
            </p>
          </div>

          <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
            {request.responses?.length || 0} Quotation
            {request.responses?.length !== 1 && "s"}
          </span>
        </div>

        {request.responses?.length === 0 ? (
          <div className="rounded-3xl border border-dashed p-16 text-center">
            <ClipboardList
              size={55}
              className="mx-auto text-emerald-500 mb-5"
            />

            <h3 className="text-2xl font-bold">No quotations received yet</h3>

            <p className="mt-3 text-gray-500">
              Nearby sellers will submit quotations soon.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {request.responses.map((quote) => {
              const counterAlreadySent =
                quote.counterStatus !== "none" || quote.buyerOffer !== null;
              return (
                <div
                  key={quote._id}
                  className="
group
relative
overflow-hidden
rounded-[30px]
p-7
backdrop-blur-3xl
bg-white/10 dark:bg-white/5
border border-white/20 dark:border-white/10
shadow-[0_10px_50px_rgba(0,0,0,0.15)]
transition-all
duration-500
hover:-translate-y-1
hover:shadow-[0_18px_70px_rgba(16,185,129,0.22)]
"
                >
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
                    <div className="absolute -bottom-28 -right-20 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />
                  </div>
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                    <div className="flex gap-4">
                      <img
                        src={
                          quote.seller?.profileImage ||
                          `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
                            quote.seller?.name || "Seller",
                          )}`
                        }
                        alt={quote.seller?.name}
                        className="w-16 h-16 rounded-2xl object-cover border"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">
                            {quote.seller?.name}
                          </h3>

                          {quote.seller?.isVerified && (
                            <BadgeCheck
                              size={18}
                              className="text-emerald-500"
                            />
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          Submitted on{" "}
                          {new Date(quote.createdAt).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>

                        <span
                          className={`inline-flex mt-3 px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      quote.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : quote.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                        >
                          {quote.status}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div
                      className="
  rounded-2xl
  px-6
  py-4
  backdrop-blur-xl
  bg-white/15 dark:bg-white/5
  border border-white/20
  text-right
  "
                    >
                      <p className="text-sm text-gray-500">Quoted Price</p>

                      <h2 className="text-4xl font-bold text-emerald-600">
                        ₹{quote.quotedPrice}
                      </h2>

                      <p className="text-sm text-gray-500 capitalize">
                        {quote.pricingType.replaceAll("_", " ")}
                      </p>
                    </div>
                  </div>

                  {/* Details */}

                  <div className="grid md:grid-cols-2 gap-5 mt-8">
                    <div
                      className="
rounded-2xl
p-5
backdrop-blur-xl
bg-white/10 dark:bg-white/5
border border-white/15
transition
hover:bg-white/15
"
                    >
                      <div className="flex items-center gap-3">
                        <CalendarDays size={18} className="text-blue-500" />

                        <div>
                          <p className="text-xs ">Estimated Start Date</p>

                          <p className="font-semibold mt-1">
                            {quote.estimatedStartDate
                              ? new Date(
                                  quote.estimatedStartDate,
                                ).toLocaleDateString("en-IN")
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl p-5 backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/15 transition hover:bg-white/15">
                      <p className="text-xs  mb-2">Seller Message</p>

                      <p>{quote.message || "No message provided."}</p>
                    </div>
                  </div>

                  {/* Footer */}

                  <div className="mt-8 border-t border-white/10 pt-6">
                    {quote.status === "accepted" && quote.contactUnlocked ? (
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
                        <h3 className="text-xl font-bold text-emerald-600">
                          🎉 Deal Confirmed
                        </h3>

                        <p className="mt-3">
                          Final Price
                          <span className="ml-2 text-2xl font-bold">
                            ₹{quote.finalPrice}
                          </span>
                        </p>

                        <div className="mt-5">
                          <p className="font-semibold">{quote.seller?.name}</p>
                          <p>📞 {quote.seller?.phone}</p>
                          <p>📧 {quote.seller?.email}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Action Buttons */}

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => handleAcceptQuotation(quote._id)}
                            className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold"
                          >
                            ✓ Accept
                          </button>

                          {!counterAlreadySent ? (
                            <button
                              onClick={() =>
                                setOpenNegotiation(
                                  openNegotiation === quote._id
                                    ? null
                                    : quote._id,
                                )
                              }
                              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
                            >
                              💬 Negotiate
                            </button>
                          ) : (
                            <button
                              disabled
                              className="flex-1 rounded-xl bg-amber-500/20 text-amber-600 py-3 font-semibold cursor-not-allowed"
                            >
                              Counter Offer Sent
                            </button>
                          )}

                          <button className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white py-3 font-semibold">
                            ✕ Reject
                          </button>
                        </div>
                        {counterAlreadySent && (
                          <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                            <h3 className="font-semibold text-amber-600">
                              Counter Offer Submitted
                            </h3>

                            <p className="mt-2">
                              Your Offer:
                              <span className="ml-2 font-bold">
                                ₹{quote.buyerOffer}
                              </span>
                            </p>

                            {quote.buyerMessage && (
                              <p className="mt-2 italic">
                                "{quote.buyerMessage}"
                              </p>
                            )}

                            <p className="mt-3 text-sm text-gray-500">
                              Waiting for the seller to respond.
                            </p>
                          </div>
                        )}
                        {/* Negotiation Form */}

                        {!counterAlreadySent &&
                          openNegotiation === quote._id && (
                            <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                              <h3 className="text-lg font-bold mb-4">
                                Send Counter Offer
                              </h3>

                              <input
                                type="number"
                                placeholder="Enter your offer"
                                value={counterPrice}
                                onChange={(e) =>
                                  setCounterPrice(e.target.value)
                                }
                                className="w-full rounded-xl placeholder:text-gray-400 border border-blue-500/20 bg-white/10 px-4 py-3"
                              />

                              <textarea
                                rows={4}
                                placeholder="Write a message..."
                                value={counterMessage}
                                onChange={(e) =>
                                  setCounterMessage(e.target.value)
                                }
                                className="w-full rounded-xl border placeholder:text-gray-400 border-blue-500/20 bg-white/10 px-4 py-3 mt-4"
                              />

                              <div className="flex justify-end gap-3 mt-5">
                                <button
                                  onClick={() => setOpenNegotiation(null)}
                                  className="rounded-xl border px-6 py-3"
                                >
                                  Cancel
                                </button>

                                <button
                                  onClick={() => handleCounterOffer(quote._id)}
                                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                                >
                                  Send Counter Offer
                                </button>
                              </div>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
