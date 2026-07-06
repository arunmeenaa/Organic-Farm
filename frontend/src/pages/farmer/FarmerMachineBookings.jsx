import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  IndianRupee,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getFarmerBookings,
  acceptBooking,
  rejectBooking,
} from "../../services/machineBooking.service";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function FarmerMachineBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const { data } = await getFarmerBookings();

      setBookings(data.bookings);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to fetch booking requests"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      setProcessingId(id);

      await acceptBooking(id);

      toast.success("Booking accepted");

      fetchBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to accept booking"
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setProcessingId(id);

      await rejectBooking(id);

      toast.success("Booking rejected");

      fetchBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to reject booking"
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Booking Requests...
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Booking Requests
            </h1>

            <p className="text-gray-500 mt-2">
              Manage machine booking requests from buyers.
            </p>
          </div>

          <span className="text-gray-600 font-medium">
            {bookings.length} Request(s)
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-16 text-center">
            <h2 className="text-2xl font-semibold">
              No Booking Requests
            </h2>

            <p className="text-gray-500 mt-3">
              Booking requests from buyers will appear here.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-7">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow overflow-hidden"
              >

                <img
                  src={
                    booking.machine?.images?.[0] ||
                    "https://placehold.co/700x450?text=Machine"
                  }
                  alt={booking.machine?.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-2xl font-bold">
                        {booking.machine?.name}
                      </h2>

                      <p className="text-gray-500">
                        {booking.machine?.category}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[booking.bookingStatus]}`}
                    >
                      {booking.bookingStatus}
                    </span>

                  </div>

                  {/* Buyer Details */}

                  <div className="mt-6 border-t pt-5 space-y-3">

                    <h3 className="font-semibold text-lg">
                      Buyer Information
                    </h3>

                    <div className="flex items-center gap-3">
                      <User size={18} />
                      <span>{booking.buyer?.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail size={18} />
                      <span>{booking.buyer?.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone size={18} />
                      <span>{booking.buyer?.phone}</span>
                    </div>

                  </div>

                  {/* Booking Details */}

                  <div className="mt-6 border-t pt-5 space-y-3">

                    <h3 className="font-semibold text-lg">
                      Booking Details
                    </h3>

                    <div className="flex items-center gap-3">
                      <Calendar size={18} />

                      <span>
                        {new Date(
                          booking.startDate
                        ).toLocaleDateString()}
                        {" - "}
                        {new Date(
                          booking.endDate
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <IndianRupee size={18} />

                      <span>
                        ₹{booking.totalAmount}
                      </span>
                    </div>

                    <div>
                      <strong>Booking Unit:</strong>{" "}
                      <span className="capitalize">
                        {booking.bookingUnit}
                      </span>
                    </div>

                    <div>
                      <strong>Quantity:</strong>{" "}
                      {booking.quantity}
                    </div>

                    <div>
                      <strong>Operator:</strong>{" "}
                      {booking.operatorRequired
                        ? "Required"
                        : "Not Required"}
                    </div>

                    <div>
                      <strong>Farm:</strong>{" "}
                      {booking.farmLocation?.village},{" "}
                      {booking.farmLocation?.district},{" "}
                      {booking.farmLocation?.state}
                    </div>

                    {booking.specialInstructions && (
                      <div>
                        <strong>Instructions:</strong>

                        <p className="text-gray-600 mt-1">
                          {booking.specialInstructions}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Actions */}

                  <div className="mt-8 flex gap-3">

                    <Link
                      to={`/machine-bookings/${booking._id}`}
                      className="flex-1 border border-green-600 text-green-700 text-center py-3 rounded-xl font-semibold hover:bg-green-50"
                    >
                      View Details
                    </Link>

                    {booking.bookingStatus === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleAccept(booking._id)
                          }
                          disabled={
                            processingId === booking._id
                          }
                          className="flex items-center justify-center gap-2 flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
                        >
                          <CheckCircle size={18} />

                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleReject(booking._id)
                          }
                          disabled={
                            processingId === booking._id
                          }
                          className="flex items-center justify-center gap-2 flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3"
                        >
                          <XCircle size={18} />

                          Reject
                        </button>
                      </>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}