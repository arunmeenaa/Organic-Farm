const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    cancelReason: {
      type: String,
      default: "",
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          productName: {
            type: String,
            required: true,
          },
          productImage: {
            type: String,
            required: true,
          },
          unit: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
          priceAtPurchase: {
            type: Number,
            required: true,
            min: 0,
          },
          itemTotal: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one product.",
      },
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    deliveryAddress: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      estimatedDelivery: {
        type: Date,
      },

      deliveredAt: {
        type: Date,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },

      addressLine: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "accepted",
        "packed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
