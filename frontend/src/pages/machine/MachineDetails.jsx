import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Star, User, Wrench, Calendar } from "lucide-react";
import { notify } from "../../utils/toast";
import { getMachineById } from "../../services/machine.service";
import { useAuth } from "../../context/AuthContext";
export default function MachineDetails() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    fetchMachine();
  }, [id]);

  async function fetchMachine() {
    try {
      setLoading(true);
      const { data } = await getMachineById(id);
      setMachine(data.machine);
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to load machine");
    } finally {
      setLoading(false);
    }
  }

const isOwner =
  user?._id === machine?.owner?._id;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading machine...
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Machine not found.
      </div>
    );
  }

  const images = machine.images?.length
    ? machine.images
    : ["https://placehold.co/900x600?text=Machine"];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <img
              src={images[selected]}
              alt={machine.name}
              className="w-full h-[450px] rounded-2xl object-cover shadow"
            />

            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`rounded-xl overflow-hidden border-2 ${selected === i ? "border-green-600" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold">{machine.name}</h1>
                <p className="text-gray-500 mt-2">{machine.category}</p>
              </div>

              <div className="flex items-center gap-1">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span>{machine.averageRating || 0}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 capitalize">
                {machine.availabilityStatus}
              </span>

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {machine.rentalType === "machine_only"
                  ? "Machine Only"
                  : "Operator Included"}
              </span>
            </div>

            <p className="text-4xl font-bold text-green-600 mt-8">
              ₹{machine.price}
              <span className="text-xl text-gray-500">
                /{machine.pricingType?.replace("per_", "")}
              </span>
            </p>

            <p className="mt-8 leading-7 text-gray-700">
              {machine.description}
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <User size={18} />
                <span>{machine.owner?.name || "Farmer"}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>
                  {machine.location?.village}, {machine.location?.district},{" "}
                  {machine.location?.state}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Wrench size={18} />
                <span>
                  {machine.specifications?.brand}{" "}
                  {machine.specifications?.model}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>Min Booking: {machine.minimumBooking || 1}</span>
              </div>
            </div>

            <div className="mt-10">
              {isOwner ? (
                <Link 
                  to={`/farmer/machine/edit/${machine._id}`}
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
                >
                  Edit Machine
                </Link>
              ) : user ? (
                <Link
                  to={`/machines/book/${machine._id}`}
                  className="block text-center bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold"
                >
                  {machine.rentalType === "machine_only"
                    ? "Rent Machine"
                    : "Book Service"}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block text-center bg-gray-700 hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold"
                >
                  Login to Book
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-5">Specifications</h2>

            <div className="space-y-3">
              <div>
                <strong>Brand:</strong> {machine.specifications?.brand || "-"}
              </div>
              <div>
                <strong>Model:</strong> {machine.specifications?.model || "-"}
              </div>
              <div>
                <strong>Horsepower:</strong>{" "}
                {machine.specifications?.horsepower || "-"}
              </div>
              <div>
                <strong>Fuel:</strong> {machine.specifications?.fuelType || "-"}
              </div>
              <div>
                <strong>Year:</strong>{" "}
                {machine.specifications?.manufacturingYear || "-"}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-5">Booking Information</h2>

            <ul className="space-y-3 list-disc ml-5">
              <li>Instant booking confirmation after owner approval.</li>
              <li>Carry a valid ID during pickup if applicable.</li>
              <li>Operator will be provided for service bookings.</li>
              <li>Pricing may vary with booking duration.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
