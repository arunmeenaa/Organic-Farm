const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validateId = require("../middleware/validateId.middleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getFarmerOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/order.controller");

router.post("/", auth, authorize("buyer"), placeOrder);

router.get("/", auth, authorize("buyer"), getMyOrders);

router.get("/farmer", auth, authorize("farmer"), getFarmerOrders);

router.get(
  "/:id",
  auth,
  authorize("buyer", "farmer"),
  validateId("Order"),
  getOrderById
);

router.put(
  "/:id/status",
  auth,
  authorize("farmer"),
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