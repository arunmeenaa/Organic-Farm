const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validateId.middleware");

const {
  createBooking,
  getBuyerBookings,
  getFarmerBookings,
  getBookingById,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
} = require("../controllers/machineBooking.controller");

// Buyer
router.post(
  "/",
  auth,
  authorize("buyer"),
  createBooking
);

router.get(
  "/my",
  auth,
  authorize("buyer"),
  getBuyerBookings
);

router.patch(
  "/:id/cancel",
  auth,
  authorize("buyer"),
  validate("MachineBooking"),
  cancelBooking
);

// Farmer
router.get(
  "/farmer",
  auth,
  authorize("farmer"),
  getFarmerBookings
);

router.patch(
  "/:id/accept",
  auth,
  authorize("farmer"),
  validate("MachineBooking"),
  acceptBooking
);

router.patch(
  "/:id/reject",
  auth,
  authorize("farmer"),
  validate("MachineBooking"),
  rejectBooking
);

router.patch(
  "/:id/complete",
  auth,
  authorize("farmer"),
  validate("MachineBooking"),
  completeBooking
);

// Shared
router.get(
  "/:id",
  auth,
  validate("MachineBooking"),
  getBookingById
);

module.exports = router;