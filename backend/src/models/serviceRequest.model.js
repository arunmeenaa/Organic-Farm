const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    // Buyer who created the request
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Seller who accepted (null initially)
    acceptedSeller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Harvesting",
        "Seeding",
        "Ploughing",
        "Land Preparation",
        "Spraying",
        "Transportation",
        "Irrigation",
        "Fertilizer Application",
        "Threshing",
        "Crop Cutting",
        "Other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    landArea: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      enum: ["acre", "hectare"],
      default: "acre",
    },

    requiredDate: {
      type: Date,
      required: true,
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

    images: [
      {
        type: String,
      },
    ],
    responses: [
      {
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        quotedPrice: {
          type: Number,
          required: true,
          min: 0,
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
          required: true,
        },

        message: {
          type: String,
          trim: true,
        },

        estimatedStartDate: {
          type: Date,
        },

        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["open", "accepted", "in_progress", "completed", "cancelled"],
      default: "open",
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
