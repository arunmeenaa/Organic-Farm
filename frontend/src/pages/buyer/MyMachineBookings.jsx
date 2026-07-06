import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  IndianRupee,
  MapPin,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

import { getBuyerBookings } from "../../services/machineBooking.service";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function MyMachineBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const { data } = await getBuyerBookings();

      setBookings(data.bookings);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading Bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            My Machine Bookings
          </h1>

          <span className="text-gray-500">
            {bookings.length} Booking(s)
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-16 text-center">
            <h2 className="text-2xl font-semibold">
              No Bookings Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Rent a machine to see your bookings here.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow overflow-hidden"
              >

                <img
                  src={
                    booking.machine?.images?.[0] ||
                    "https://placehold.co/700x400"
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

                      <p className="text-gray-500 mt-1">
                        {booking.machine?.category}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[booking.bookingStatus]}`}
                    >
                      {booking.bookingStatus}
                    </span>

                  </div>

                  <div className="space-y-3 mt-6">

                    <div className="flex items-center gap-3">
                      <Calendar size={18} />
                      <span>
                        {new Date(
                          booking.startDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
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

                    <div className="flex items-center gap-3">
                      <Clock size={18} />
                      <span className="capitalize">
                        {booking.bookingUnit}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={18} />

                      <span>
                        {booking.farmLocation?.village},{" "}
                        {booking.farmLocation?.district}
                      </span>

                    </div>

                  </div>

                  <div className="mt-8 flex gap-4">

                    <Link 
                      to={`/machine-bookings/${booking._id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold"
                    >
                      View Details
                    </Link>

                    {booking.bookingStatus ===
                      "pending" && (
                      <button
                        className="flex-1 border border-red-500 text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        Cancel
                      </button>
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