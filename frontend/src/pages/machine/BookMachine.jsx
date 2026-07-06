import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getMachineById } from "../../services/machine.service";
import { createBooking } from "../../services/machineBooking.service";

const BookMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",

    quantity: 1,

    operatorRequired: false,

    farmLocation: {
      village: "",
      district: "",
      state: "",
      pincode: "",
    },

    specialInstructions: "",
  });

  useEffect(() => {
    fetchMachine();
  }, [id]);

  const fetchMachine = async () => {
    try {
      setLoading(true);

      const { data } = await getMachineById(id);

      setMachine(data.machine);

      if (data.machine.rentalType === "with_operator") {
        setFormData((prev) => ({
          ...prev,
          operatorRequired: true,
        }));
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load machine"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleLocation = (e) => {
    setFormData((prev) => ({
      ...prev,
      farmLocation: {
        ...prev.farmLocation,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const totalAmount = useMemo(() => {
    if (!machine) return 0;

    if (machine.pricingType === "per_acre") {
      return (
        Number(formData.quantity || 0) *
        machine.price
      );
    }

    if (
      !formData.startDate ||
      !formData.endDate
    )
      return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end <= start) return 0;

    const diff =
      end.getTime() - start.getTime();

    if (machine.pricingType === "per_day") {
      const days = Math.ceil(
        diff / (1000 * 60 * 60 * 24)
      );

      return days * machine.price;
    }

    if (machine.pricingType === "per_hour") {
      const hours = Math.ceil(
        diff / (1000 * 60 * 60)
      );

      return hours * machine.price;
    }

    return 0;
  }, [machine, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await createBooking({
        machineId: machine._id,

        startDate: formData.startDate,
        endDate: formData.endDate,

        bookingUnit: machine.pricingType.replace(
          "per_",
          ""
        ),

        quantity: formData.quantity,

        operatorRequired:
          formData.operatorRequired,

        farmLocation:
          formData.farmLocation,

        specialInstructions:
          formData.specialInstructions,
      });

      toast.success(
        "Booking request submitted successfully"
      );

      navigate("/buyer/machine-bookings");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to book machine"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Machine not found
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-8">
          Book Machine
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Booking Form */}

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-3xl shadow p-8 space-y-8"
          >

            {/* Dates */}

            <section>
              <h2 className="text-2xl font-semibold mb-5">
                Booking Duration
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="block mb-2 font-medium">
                    Start Date
                  </label>

                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-4"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    End Date
                  </label>

                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-4"
                  />
                </div>

              </div>
            </section>

            {/* Quantity */}

            <section>

              <label className="block mb-2 font-medium">

                {machine.pricingType === "per_acre"
                  ? "Number of Acres"
                  : "Quantity"}

              </label>

              <input
                type="number"
                min={1}
                max={machine.quantity}
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

            </section>

            {/* Operator */}

            {machine.rentalType === "with_operator" && (

              <section>

                <label className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    checked={formData.operatorRequired}
                    name="operatorRequired"
                    onChange={handleChange}
                  />

                  Operator Required

                </label>

              </section>

            )}

            {/* Farm Location */}

            <section>

              <h2 className="text-2xl font-semibold mb-5">

                Farm Location

              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  name="village"
                  placeholder="Village"
                  value={formData.farmLocation.village}
                  onChange={handleLocation}
                  className="border rounded-xl p-4"
                  required
                />

                <input
                  name="district"
                  placeholder="District"
                  value={formData.farmLocation.district}
                  onChange={handleLocation}
                  className="border rounded-xl p-4"
                  required
                />

                <input
                  name="state"
                  placeholder="State"
                  value={formData.farmLocation.state}
                  onChange={handleLocation}
                  className="border rounded-xl p-4"
                  required
                />

                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.farmLocation.pincode}
                  onChange={handleLocation}
                  className="border rounded-xl p-4"
                  required
                />

              </div>

            </section>

            {/* Instructions */}

            <section>

              <h2 className="text-2xl font-semibold mb-4">

                Special Instructions

              </h2>

              <textarea
                rows={5}
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Anything the owner should know..."
                className="w-full border rounded-xl p-4 resize-none"
              />

            </section>

            <button
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 text-lg font-semibold"
            >
              {submitting
                ? "Submitting..."
                : "Confirm Booking"}
            </button>

          </form>

          {/* Summary */}

          <div className="bg-white rounded-3xl shadow p-8 h-fit sticky top-24">

            <img
              src={
                machine.images?.[0] ||
                "https://placehold.co/700x500"
              }
              alt={machine.name}
              className="w-full h-52 object-cover rounded-2xl"
            />

            <h2 className="text-2xl font-bold mt-5">
              {machine.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {machine.category}
            </p>

            <hr className="my-6" />

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Rental Type</span>

                <span className="font-semibold capitalize">
                  {machine.rentalType.replace("_", " ")}
                </span>
              </div>

              <div className="flex justify-between">

                <span>Pricing</span>

                <span className="font-semibold">

                  ₹{machine.price}/
                  {machine.pricingType.replace("per_", "")}

                </span>

              </div>

              <div className="flex justify-between">

                <span>Available</span>

                <span className="font-semibold">

                  {machine.quantity}

                </span>

              </div>

            </div>

            <hr className="my-6" />

            <div className="flex justify-between items-center">

              <span className="text-xl font-semibold">

                Total

              </span>

              <span className="text-3xl font-bold text-green-600">

                ₹{totalAmount}

              </span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default BookMachine;