const ServiceOrder = require("../models/serviceOrder.model");
const { createNotification } = require("../services/notification.service");

const getBuyerOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find({
      buyer: req.user._id,
    })
      .populate("seller", "name email phone profileImage")
      .populate("request")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const orders = await ServiceOrder.find({
      seller: req.user._id,
    })
      .populate("buyer", "name email phone profileImage")
      .populate("request")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id)
      .populate("buyer", "name email phone profileImage")
      .populate("seller", "name email phone profileImage")
      .populate("request");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const startWork = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.status = "in_progress";
    order.startedAt = new Date();

    await order.save();
    await createNotification({
      receiver: order.buyer,
      sender: req.user._id,
      title: "Work Started",
      message: "The seller has started working on your request.",
      type: "service_started",
      referenceId: order._id,
    });
    res.json({
      success: true,
      message: "Work started successfully.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const completeWork = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.status = "completed";
    order.completedAt = new Date();

    await order.save();
    await createNotification({
      receiver: order.buyer,
      sender: req.user._id,
      title: "Work Completed",
      message: "The seller marked the work as completed.",
      type: "service_completed",
      referenceId: order._id,
    });
    res.json({
      success: true,
      message: "Work completed.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const confirmCompletion = async (req, res) => {
  try {
    const order = await ServiceOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.buyerConfirmed = true;

    await order.save();

    res.json({
      success: true,
      message: "Work confirmed successfully.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOrderByRequestId = async (req, res) => {
  try {
    const order = await ServiceOrder.findOne({
      request: req.params.requestId,
    })
      .populate("request")
      .populate("buyer", "name phone email profileImage")
      .populate("seller", "name phone email profileImage");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  getBuyerOrders,
  getSellerOrders,
  getOrderById,
  startWork,
  completeWork,
  confirmCompletion,
  getOrderByRequestId,
};
