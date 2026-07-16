const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    crop: {
      type: String,
      required: true,
    },

    area: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      enum: ["acre", "hectare"],
      default: "acre",
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    note: String,

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "cancelled"
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);