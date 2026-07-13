const express = require("express");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  getFarmerDashboard,
  getBuyerDashboard,
  getWeatherAdvice
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/farmer", auth, authorize("farmer"), getFarmerDashboard);

router.get("/buyer", auth, authorize("buyer"), getBuyerDashboard);
router.get("/farmer/weather-advice", auth, getWeatherAdvice);
module.exports = router;
