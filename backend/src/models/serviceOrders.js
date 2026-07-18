const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid"
      ],
      default: "pending",
    },

    status: {
      type: String,
      enum: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "scheduled",
    },

    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ServiceOrder",
  serviceOrderSchema
);