const express = require("express");
const auth = require("../middleware/auth.middleware");
const validateId = require("../middleware/validateId.middleware.js");
const authorize = require("../middleware/role.middleware");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getFarmerOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");

router.post("/orders", auth, authorize("buyer"), placeOrder);
router.get("/orders", auth, authorize("buyer"), getMyOrders);
router.get(
  "/orders/:id",
  validateId("Order"),
  auth,
  authorize("buyer", "farmer"),
  getOrderById,
);
router.get("/orders/farmer", auth, authorize("farmer"), getFarmerOrders);
router.put(
  "/orders/:id/status",
  validateId("Order"),
  auth,
  authorize("farmer"),
  updateOrderStatus,
);
router.delete(
  "/orders/:id",
  validateId("Order"),
  auth,
  authorize("buyer"),
  cancelOrder,
);
module.exports = router;
