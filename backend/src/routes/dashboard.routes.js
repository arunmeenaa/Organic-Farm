const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  getSellerDashboard,
  getBuyerDashboard,
  getWeatherAdvice
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/seller", auth, authorize("seller"), getSellerDashboard);

router.get("/buyer", auth, authorize("buyer"), getBuyerDashboard);
router.get("/seller/weather-advice", auth, getWeatherAdvice);
module.exports = router;
