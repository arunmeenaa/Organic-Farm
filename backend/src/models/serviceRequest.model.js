const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    landArea: {
      type: Number,
    },

    unit: {
      type: String,
      enum: ["acre", "hectare"],
      default: "acre",
    },

    budget: {
      type: Number,
      required: true,
    },

    pricingType: {
      type: String,
      enum: [
        "per_acre",
        "per_hectare",
        "per_day",
        "per_hour",
        "per_trip",
        "per_km",
        "fixed",
      ],
      default: "per_acre",
    },

    requiredDate: {
      type: Date,
      required: true,
    },

    location: {
      village: String,
      district: String,
      state: String,
      pincode: String,
    },

    status: {
      type: String,
      enum: [
        "open",
        "accepted",
        "completed",
        "cancelled",
      ],
      default: "open",
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