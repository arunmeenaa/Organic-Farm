const MachineBooking = require("../models/machineBooking.model");
const Machine = require("../models/machine.model");
const { createNotification } = require("../services/notification.service");

exports.createBooking = async (req, res) => {
  try {
    const {
      machineId,
      startDate,
      endDate,
      bookingUnit,
      quantity,
      operatorRequired,
      farmLocation,
      specialInstructions,
    } = req.body;

    if (!machineId || !startDate || !endDate || !bookingUnit || !farmLocation) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const machine = await Machine.findById(machineId);

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found",
      });
    }

    if (machine.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own machine",
      });
    }

    if (machine.availabilityStatus !== "available") {
      return res.status(400).json({
        success: false,
        message: "Machine is currently unavailable",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Check overlapping bookings
    const existingBooking = await MachineBooking.findOne({
      machine: machineId,
      bookingStatus: {
        $in: ["pending", "accepted"],
      },
      startDate: { $lte: end },
      endDate: { $gte: start },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "Machine is already booked for the selected dates",
      });
    }

    let totalAmount = 0;

    if (machine.pricingType === "per_hour") {
      const hours = Math.ceil((end - start) / (1000 * 60 * 60));

      totalAmount = hours * machine.price;
    }

    if (machine.pricingType === "per_day") {
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      totalAmount = days * machine.price;
    }

    if (machine.pricingType === "per_acre") {
      totalAmount = Number(quantity) * machine.price;
    }

    const booking = await MachineBooking.create({
      machine: machine._id,
      buyer: req.user._id,
      owner: machine.owner,

      startDate: start,
      endDate: end,

      bookingUnit,
      quantity,

      operatorRequired,

      farmLocation,

      specialInstructions,

      totalAmount,
    });
    await createNotification({
      receiver: machine.owner,
      sender: req.user._id,
      title: "New Machine Booking",
      message: `${req.user.name} requested to book your ${machine.name}.`,
      type: "booking",
      referenceId: booking._id,
    });
    return res.status(201).json({
      success: true,
      message: "Booking request sent successfully",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

exports.getBuyerBookings = async (req, res) => {
  try {
    const bookings = await MachineBooking.find({
      buyer: req.user._id,
    })
      .populate("machine")
      .populate("owner", "name phone email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};
exports.getsellerBookings = async (req, res) => {
  try {
    const bookings = await MachineBooking.find({
      owner: req.user._id,
    })
      .populate("machine")
      .populate("buyer", "name phone email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking requests",
      error: err.message,
    });
  }
};
exports.getBookingById = async (req, res) => {
  try {
    const booking = await MachineBooking.findById(req.params.id)
      .populate("machine")
      .populate("buyer", "name email phone")
      .populate("owner", "name email phone");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: err.message,
    });
  }
};

exports.acceptBooking = async (req, res) => {
  try {
    const booking = await MachineBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (booking.bookingStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be accepted",
      });
    }

    booking.bookingStatus = "accepted";

    const machine = await Machine.findById(booking.machine);
    machine.availabilityStatus = "booked";

    await machine.save();
    await booking.save();
    await createNotification({
      receiver: booking.buyer,
      sender: req.user._id,
      title: "Booking Accepted",
      message: `Your booking for ${booking.machine.name} has been accepted.`,
      type: "booking",
      referenceId: booking._id,
    });
    return res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to accept booking",
      error: err.message,
    });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const booking = await MachineBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (booking.bookingStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be rejected",
      });
    }

    booking.bookingStatus = "rejected";

    const machine = await Machine.findById(booking.machine);
    machine.availabilityStatus = "available";

    await machine.save();
    await booking.save();

    await createNotification({
      receiver: booking.buyer,
      sender: req.user._id,
      title: "Booking Rejected",
      message: `Your booking for ${booking.machine.name} has been rejected.`,
      type: "booking",
      referenceId: booking._id,
    });

    return res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to reject booking",
      error: err.message,
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await MachineBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (booking.bookingStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be cancelled",
      });
    }
    const machine = await Machine.findById(booking.machine);
    machine.availabilityStatus = "available";

    await machine.save();
    await booking.save();
    booking.bookingStatus = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: err.message,
    });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    const booking = await MachineBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (booking.bookingStatus !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Only accepted bookings can be completed",
      });
    }

    booking.bookingStatus = "completed";
    const machine = await Machine.findById(booking.machine);
    machine.availabilityStatus = "available";

    await machine.save();
    await booking.save();

    await createNotification({
      receiver: booking.buyer,
      sender: req.user._id,
      title: "Booking Completed",
      message: `Your booking for ${booking.machine.name} has been completed.`,
      type: "booking",
      referenceId: booking._id,
    });

    return res.status(200).json({
      success: true,
      message: "Booking completed successfully",
      booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to complete booking",
      error: err.message,
    });
  }
};
