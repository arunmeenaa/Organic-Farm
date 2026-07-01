const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getFarmerOrders
} = require("../controllers/order.controller");

router.post("/orders", auth, authorize("buyer"), placeOrder);
router.get("/orders", auth, authorize("buyer"), getMyOrders);
router.get("/orders/:id", auth, authorize("buyer", "farmer"), getOrderById);
router.get("/orders/farmer", auth, authorize("farmer"), getFarmerOrders);
module.exports = router;
