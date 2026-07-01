const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const mongoose = require("mongoose");
async function placeOrder(req, res) {
  const { products, deliveryAddress, paymentMethod } = req.body;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "At least one product is required",
      });
    }

    const { fullName, phone, addressLine, city, state, pincode } =
      deliveryAddress || {};

    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      return res.status(400).json({
        message: "Complete delivery address is required",
      });
    }

    let farmerId = null;
    let totalPrice = 0;

    const orderProducts = [];
    const productUpdates = [];

    for (const item of products) {
      const { product: productId, quantity } = item;

      if (!productId) {
        return res.status(400).json({
          message: "Product ID is required",
        });
      }
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          message: `Invalid product ID: ${productId}`,
        });
      }
      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be greater than 0",
        });
      }

      const dbProduct = await productModel.findById(productId);

      if (!dbProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      if (dbProduct.farmer.toString() === req.user._id.toString()) {
        return res.status(400).json({
          message: "You cannot order your own product",
        });
      }
      if (dbProduct.status !== "active") {
        return res.status(400).json({
          message: `${dbProduct.name} is currently unavailable`,
        });
      }

      if (dbProduct.quantity < quantity) {
        return res.status(400).json({
          message: `Only ${dbProduct.quantity} ${dbProduct.unit} of ${dbProduct.name} available`,
        });
      }

      if (!farmerId) {
        farmerId = dbProduct.farmer.toString();
      } else if (farmerId !== dbProduct.farmer.toString()) {
        return res.status(400).json({
          message: "Products must belong to the same farmer",
        });
      }

      const itemTotal = dbProduct.price * quantity;
      totalPrice += itemTotal;

      orderProducts.push({
        product: dbProduct._id,
        productName: dbProduct.name,
        unit: dbProduct.unit,
        quantity,
        priceAtPurchase: dbProduct.price,
        itemTotal,
      });

      productUpdates.push({
        product: dbProduct,
        orderedQuantity: quantity,
      });
    }

    for (const item of productUpdates) {
      item.product.quantity -= item.orderedQuantity;

      if (item.product.quantity === 0) {
        item.product.status = "inactive";
      }

      await item.product.save();
    }

    const order = await orderModel.create({
      buyer: req.user._id,
      farmer: farmerId,
      products: orderProducts,
      totalPrice,
      deliveryAddress,
      paymentMethod,
    });

    const createdOrder = await orderModel
      .findById(order._id)
      .populate("buyer", "name email phone")
      .populate("farmer", "name email phone")
      .populate("products.product", "name images category");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: createdOrder,
    });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: err.message,
    });
  } finally {
    session.endSession();
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
