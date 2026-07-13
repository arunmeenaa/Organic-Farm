const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const { getCurrentWeather } = require("../services/weather.service");
const { generateFarmerAdvice } = require("../services/ai.service");

async function getFarmerDashboard(req, res) {
  try {
    const products = await productModel
      .find({ farmer: req.user._id })
      .sort({ createdAt: -1 });

    const totalProducts = products.length;
    const activeProducts = products.filter(
      (product) => product.status === "active",
    ).length;
    const inactiveProducts = totalProducts - activeProducts;
    const recentProducts = products.slice(0, 5);

    const orders = await orderModel
      .find({ farmer: req.user._id })
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    const recentOrders = orders.slice(0, 3);
    const revenueResult = await orderModel.aggregate([
      {
        $match: {
          farmer: req.user._id,
          orderStatus: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const revenue = revenueResult.length > 0 ? revenueResult[0].revenue : 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        totalOrders: orders.length,
        revenue,
      },
      recentProducts,
      recentOrders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getWeatherAdvice(req, res) {
  try {
    // Weather is essential
    const weather = await getCurrentWeather(req.user.location);

    let advice = [];

    try {
      const aiAdvice = await generateFarmerAdvice(req.user, weather);
      advice = aiAdvice.advice;
    } catch (err) {
      console.error("Gemini Error:", err.message);

      advice = [
        "AI recommendations are temporarily unavailable.",
        "Monitor soil moisture before irrigation.",
        "Check your crops regularly for pests and diseases.",
      ];
    }

    return res.status(200).json({
      success: true,
      weather,
      advice,
    });
  } catch (err) {
    // Weather failed
    return res.status(500).json({
      success: false,
      message: "Unable to fetch weather information.",
    });
  }
}

async function getBuyerDashboard(req, res) {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("farmer", "name email phone")
      .populate("products.product", "name images category")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      stats: {
        totalOrders: orders.length,
      },
      recentOrders: orders.slice(0, 3),
    });
  } catch (err) {
    console.error("Buyer Dashboard Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getFarmerDashboard,
  getBuyerDashboard,
  getWeatherAdvice,
};
