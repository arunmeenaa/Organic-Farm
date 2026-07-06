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

router.get("/my", auth, authorize("farmer"), getMyMachines);

router.get("/:id", validate("Machine"), getMachineById);

router.post(
  "/",
  auth,
  authorize("farmer"),
  upload.array("images", 5),
  createMachine,
);

router.put(
  "/:id",
  auth,
  authorize("farmer"),
  upload.array("images", 5),
  updateMachine,
);

router.patch(
  "/:id/availability",
  auth,
  authorize("farmer"),
  validate("Machine"),
  updateAvailability,
);

router.delete(
  "/:id",
  auth,
  authorize("farmer"),
  validate("Machine"),
  deleteMachine,
);

module.exports = router;
