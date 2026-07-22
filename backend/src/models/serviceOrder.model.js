const mongoose = require("mongoose");

const serviceOrderSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    title: String,
    description: String,
    category: String,

    location: {
      village: String,
      district: String,
      state: String,
      pincode: String,
    },

    landArea: Number,

    unit: String,

    finalPrice: {
      type: Number,
      required: true,
    },

    pricingType: String,

    estimatedStartDate: Date,

    buyerPhone: String,

    sellerPhone: String,

    status: {
      type: String,
      enum: [
        "assigned",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "assigned",
    },

    startedAt: Date,

    completedAt: Date,

    cancelledAt: Date,

    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ServiceOrder", serviceOrderSchema);