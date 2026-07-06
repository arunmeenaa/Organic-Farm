import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getBooking,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
} from "../../services/machineBooking.service";

import { useAuth } from "../../context/AuthContext";

export default function MachineBookingDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);

      const { data } = await getBooking(id);

      setBooking(data.booking);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load booking"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      setProcessing(true);

      await acceptBooking(id);

      toast.success("Booking accepted");

      fetchBooking();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to accept booking"
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    try {
      setProcessing(true);

      await rejectBooking(id);

      toast.success("Booking rejected");

      fetchBooking();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to reject booking"
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    try {
      setProcessing(true);

      await cancelBooking(id);

      toast.success("Booking cancelled");

      navigate("/buyer/machine-bookings");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to cancel booking"
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleComplete = async () => {
    try {
      setProcessing(true);

      await completeBooking(id);

      toast.success("Booking completed");

      fetchBooking();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to complete booking"
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Booking...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Booking not found.
      </div>
    );
  }

  const isBuyer =
    booking.buyer?._id === user?._id;

  const isOwner =
    booking.owner?._id === user?._id;
      const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-8">

            {/* Machine */}

            <div className="bg-white rounded-3xl shadow overflow-hidden">

              <img
                src={
                  booking.machine?.images?.[0] ||
                  "https://placehold.co/900x500"
                }
                alt={booking.machine?.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-8">

                <div className="flex justify-between items-start">

                  <div>

                    <h1 className="text-4xl font-bold">
                      {booking.machine?.name}
                    </h1>

                    <p className="text-gray-500 mt-2">
                      {booking.machine?.category}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold capitalize ${statusColors[booking.bookingStatus]}`}
                  >
                    {booking.bookingStatus}
                  </span>

                </div>

                <p className="mt-8 text-gray-700 leading-7">
                  {booking.machine?.description}
                </p>

              </div>

            </div>

            {/* Buyer */}

            <div className="bg-white rounded-3xl shadow p-8">

              <h2 className="text-2xl font-bold mb-6">
                Buyer Information
              </h2>

              <div className="space-y-4">

                <div>
                  <strong>Name:</strong>{" "}
                  {booking.buyer?.name}
                </div>

                <div>
                  <strong>Email:</strong>{" "}
                  {booking.buyer?.email}
                </div>

                <div>
                  <strong>Phone:</strong>{" "}
                  {booking.buyer?.phone}
                </div>

              </div>

            </div>

            {/* Owner */}

            <div className="bg-white rounded-3xl shadow p-8">

              <h2 className="text-2xl font-bold mb-6">
                Machine Owner
              </h2>

              <div className="space-y-4">

                <div>
                  <strong>Name:</strong>{" "}
                  {booking.owner?.name}
                </div>

                <div>
                  <strong>Email:</strong>{" "}
                  {booking.owner?.email}
                </div>

                <div>
                  <strong>Phone:</strong>{" "}
                  {booking.owner?.phone}
                </div>

              </div>

            </div>

            {/* Farm */}

            <div className="bg-white rounded-3xl shadow p-8">

              <h2 className="text-2xl font-bold mb-6">
                Farm Location
              </h2>

              <div className="space-y-3">

                <div>
                  <strong>Village:</strong>{" "}
                  {booking.farmLocation?.village}
                </div>

                <div>
                  <strong>District:</strong>{" "}
                  {booking.farmLocation?.district}
                </div>

                <div>
                  <strong>State:</strong>{" "}
                  {booking.farmLocation?.state}
                </div>

                <div>
                  <strong>Pincode:</strong>{" "}
                  {booking.farmLocation?.pincode}
                </div>

              </div>

            </div>

            {/* Instructions */}

            {booking.specialInstructions && (

              <div className="bg-white rounded-3xl shadow p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Special Instructions
                </h2>

                <p className="text-gray-700 leading-7">
                  {booking.specialInstructions}
                </p>

              </div>

            )}

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-white rounded-3xl shadow p-8 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Booking Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span>Start Date</span>

                  <span>
                    {new Date(
                      booking.startDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>End Date</span>

                  <span>
                    {new Date(
                      booking.endDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Booking Unit</span>

                  <span className="capitalize">
                    {booking.bookingUnit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Quantity</span>

                  <span>
                    {booking.quantity}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Operator</span>

                  <span>
                    {booking.operatorRequired
                      ? "Required"
                      : "Not Required"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment</span>

                  <span className="capitalize">
                    {booking.paymentStatus}
                  </span>
                </div>

              </div>

              <hr className="my-6" />

              <div className="flex justify-between items-center">

                <span className="text-xl font-semibold">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-green-600">
                  ₹{booking.totalAmount}
                </span>

              </div>
                            {/* Booking Timeline */}

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-5">
                  Booking Status
                </h3>

                <div className="space-y-5">

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span>Pending Request</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        ["accepted", "completed"].includes(
                          booking.bookingStatus
                        )
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>

                    <span>Accepted</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        booking.bookingStatus === "completed"
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    ></div>

                    <span>Completed</span>
                  </div>

                  {(booking.bookingStatus === "rejected" ||
                    booking.bookingStatus === "cancelled") && (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-600"></div>

                      <span className="capitalize">
                        {booking.bookingStatus}
                      </span>
                    </div>
                  )}

                </div>
              </div>

              {/* Buyer Actions */}

              {isBuyer &&
                booking.bookingStatus === "pending" && (
                  <button
                    onClick={handleCancel}
                    disabled={processing}
                    className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}

              {/* Farmer Actions */}

              {isOwner &&
                booking.bookingStatus === "pending" && (
                  <div className="grid grid-cols-2 gap-4 mt-8">

                    <button
                      onClick={handleAccept}
                      disabled={processing}
                      className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
                    >
                      Accept
                    </button>

                    <button
                      onClick={handleReject}
                      disabled={processing}
                      className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold"
                    >
                      Reject
                    </button>

                  </div>
                )}

              {isOwner &&
                booking.bookingStatus === "accepted" && (
                  <button
                    onClick={handleComplete}
                    disabled={processing}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
                  >
                    Mark as Completed
                  </button>
                )}

              <button
                onClick={() => window.history.back()}
                className="w-full mt-4 border border-gray-300 hover:bg-gray-100 py-4 rounded-xl font-semibold"
              >
                Back
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}