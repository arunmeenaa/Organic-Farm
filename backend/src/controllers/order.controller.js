const mongoose = require("mongoose");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");

async function placeOrder(req, res) {
  const { deliveryAddress, paymentMethod } = req.body;

  try {
    const { fullName, phone, addressLine, city, state, pincode } =
      deliveryAddress || {};

    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Complete delivery address is required",
      });
    }

    // Load buyer cart
    const cart = await cartModel
      .findOne({ buyer: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    let farmerId = null;
    let farmerName = "";
    let totalPrice = 0;

    const orderProducts = [];

    for (const item of cart.items) {
      const dbProduct = item.product;

      if (!dbProduct) {
        throw new Error("Product not found");
      }

      if (dbProduct.status !== "active") {
        throw new Error(`${dbProduct.name} is unavailable`);
      }

      if (dbProduct.quantity < item.quantity) {
        throw new Error(
          `Only ${dbProduct.quantity} ${dbProduct.unit} of ${dbProduct.name} available`,
        );
      }

      if (!farmerId) {
        farmerId = dbProduct.farmer.toString();

        const farmer = await userModel.findById(farmerId);

        farmerName = farmer.name;
      } else if (farmerId !== dbProduct.farmer.toString()) {
        throw new Error("Cart contains products from multiple farmers.");
      }

      const itemTotal = dbProduct.price * item.quantity;
      totalPrice += itemTotal;

      orderProducts.push({
        product: dbProduct._id,
        productName: dbProduct.name,
        productImage: dbProduct.images[0],
        unit: dbProduct.unit,
        quantity: item.quantity,
        priceAtPurchase: dbProduct.price,
        itemTotal,
      });

      dbProduct.quantity -= item.quantity;

      if (dbProduct.quantity === 0) {
        dbProduct.status = "inactive";
      }

      await dbProduct.save();
    }

    const order = await orderModel.create([
      {
        buyer: req.user._id,
        farmer: farmerId,
        farmerName,
        orderNumber: `OF${Date.now()}`,
        products: orderProducts,
        totalPrice,
        deliveryAddress,
        paymentMethod,
      },
    ]);

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: order[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: err.message,
    });
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("farmer", "name email phone")
      .populate("products.product", "name images category")
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({
      success: true,
      count: orders.length,
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
      error: err.message,
    });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await orderModel
      .findById(id)
      .populate("buyer", "name email phone")
      .populate("farmer", "name email phone")
      .populate("products.product", "name images category")
      .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.buyer._id.toString() !== req.user._id.toString() &&
      order.farmer._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this order",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
      error: err.message,
    });
  }
}

async function getFarmerOrders(req, res) {
  const farmerId = req.user._id;
  try {
    const orders = await orderModel
      .find({ farmer: farmerId })
      .populate("buyer", "name email phone")
      .populate("products.product", "name images category")
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({
      success: true,
      count: orders.length,
      message: "Farmer orders retrieved successfully",
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve farmer orders",
      error: err.message,
    });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this order's status",
      });
    }
    const allowedStatuses = [
      "placed",
      "accepted",
      "packed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }
    const validTransitions = {
      placed: ["accepted", "cancelled"],
      accepted: ["packed", "cancelled"],
      packed: ["shipped"],
      shipped: ["delivered"],
      delivered: [],
      cancelled: [],
    };

    if (!validTransitions[order.orderStatus].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change order from ${order.orderStatus} to ${status}`,
      });
    }
    order.orderStatus = status;
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: err.message,
    });
  }
}

async function cancelOrder(req, res) {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to cancel this order",
      });
    }
    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order has already been cancelled",
      });
    }

    const cancellableStatuses = ["placed", "accepted", "packed"];

    if (!cancellableStatuses.includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Only orders with 'placed', 'accepted', or 'packed' status can be cancelled",
      });
    }
    for (const item of order.products) {
      const product = await productModel.findById(item.product);
      if (product) {
        product.quantity += item.quantity;
        if (product.status === "inactive" && product.quantity > 0) {
          product.status = "active";
        }
        await product.save();
      }
    }
    order.orderStatus = "cancelled";
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: err.message,
    });
  }
}

async function updatePaymentStatus(req, res) {}

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  getFarmerOrders,
  updateOrderStatus,
  cancelOrder,
  updatePaymentStatus,
};
