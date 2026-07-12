const productModel = require("../models/product.model");
const orderModel = require("../models/order.model")
async function getFarmerDashboard(req, res) {
  try {
    const products = await productModel
      .find({ farmer: req.user._id })
      .sort({ createdAt: -1 });

    const totalProducts = products.length;

    const activeProducts = products.filter((p) => p.status === "active").length;

    const inactiveProducts = totalProducts - activeProducts;

    const recentProducts = products.slice(0, 5);

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        totalOrders: 0,
        revenue: 0,
      },
      recentProducts,
      recentOrders: [],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
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
};
