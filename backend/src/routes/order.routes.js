const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validateId = require("../middleware/validateId.middleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getsellerOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");

router.post("/", auth, authorize("buyer"), placeOrder);

router.get("/", auth, authorize("buyer"), getMyOrders);

router.get("/seller", auth, authorize("seller"), getsellerOrders);

router.get(
  "/:id",
  auth,
  authorize("buyer", "seller"),
  validateId("Order"),
  getOrderById
);

router.put(
  "/:id/status",
  auth,
  authorize("seller"),
  validateId("Order"),
  updateOrderStatus
);

router.patch(
  "/:id",
  auth,
  authorize("buyer"),
  validateId("Order"),
  cancelOrder
);

module.exports = router;