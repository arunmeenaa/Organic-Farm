const express = require("express");
const multer = require("multer");

const {
  createServiceRequest,
  getOpenServiceRequests,
  getMyServiceRequests,
  submitQuotation,
  cancelServiceRequest,
  deleteServiceRequest,
  getServiceRequestById,
} = require("../controllers/serviceRequest.controller");

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validateId = require("../middleware/validateId.middleware");
const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.get("/open", getOpenServiceRequests);
router.post(
  "/",
  auth,
  authorize("buyer"),
  upload.array("images", 5),
  createServiceRequest,
);

router.get("/my", auth, authorize("buyer"), getMyServiceRequests);
router.delete("/:id", auth, authorize("buyer"), deleteServiceRequest);
router.patch("/:id/cancel", auth, authorize("buyer"), cancelServiceRequest);
router.get("/:id", auth, validateId("serviceRequest"), getServiceRequestById);
router.post("/:id/quotation", auth, authorize("seller"), submitQuotation);
router.get("/open", auth, authorize("seller"), getOpenServiceRequests);
router.post("/:id/respond", auth, authorize("seller"), submitQuotation);

module.exports = router;
