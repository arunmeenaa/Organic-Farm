const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validateId.middleware");
const upload = require("../middleware/upload.middleware");

const {
  createMachine,
  getAllMachines,
  getMyMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
  updateAvailability,
} = require("../controllers/machine.controller");

router.get("/", getAllMachines);

router.get("/my", auth, authorize("seller"), getMyMachines);

router.get("/:id", validate("Machine"), getMachineById);

router.post(
  "/",
  auth,
  authorize("seller"),
  upload.array("images", 5),
  createMachine,
);

router.put(
  "/:id",
  auth,
  authorize("seller"),
  upload.array("images", 5),
  updateMachine,
);

router.patch(
  "/:id/availability",
  auth,
  authorize("seller"),
  validate("Machine"),
  updateAvailability,
);

router.delete(
  "/:id",
  auth,
  authorize("seller"),
  validate("Machine"),
  deleteMachine,
);

module.exports = router;
