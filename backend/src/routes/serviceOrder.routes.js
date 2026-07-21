const express = require("express");
const auth = require("../middleware/auth.middleware");

const {
  getBuyerOrders,
  getSellerOrders,
  getOrderById,
  startWork,
  completeWork,
  confirmCompletion,
  getOrderByRequestId,
} = require("../controllers/serviceOrder.controller");

const router = express.Router();

router.get("/buyer", auth, getBuyerOrders);

router.get("/seller", auth, getSellerOrders);

router.get("/:id", auth, getOrderById);

router.patch("/:id/start", auth, startWork);

router.patch("/:id/complete", auth, completeWork);

router.patch("/:id/confirm", auth, confirmCompletion);
router.get("/request/:requestId", auth, getOrderByRequestId);
module.exports = router;
