const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Land Preparation",
        "Ploughing",
        "Rotavator",
        "Seeding",
        "Transplanting",
        "Irrigation",
        "Spraying",
        "Fertilizer Application",
        "Harvesting",
        "Transportation",
        "Threshing",
        "Others",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      default: null,
    },

    pricingType: {
      type: String,
      enum: [
        "per_acre",
        "per_hectare",
        "per_hour",
        "per_day",
        "per_trip",
        "per_km",
        "fixed",
      ],
      default: "per_acre",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    machineIncluded: {
      type: Boolean,
      default: true,
    },

    operatorIncluded: {
      type: Boolean,
      default: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    location: {
      village: {
        type: String,
        required: true,
      },

      district: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Service", serviceSchema);
