const express = require("express");
const multer = require("multer");

const {
  createService,
  getAllServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Public
router.get("/", getAllServices);
router.get("/my-services", auth, getMyServices);
router.get("/:id", getServiceById);

// Provider

router.post(
  "/",
  auth,
  authorize("farmer"),
  upload.array("images", 5),
  createService,
);

router.patch(
  "/:id",
  auth,
  authorize("farmer"),
  upload.array("images", 5),
  updateService,
);

router.delete("/:id", auth, authorize("farmer"), deleteService);

module.exports = router;
