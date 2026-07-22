const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
    referenceModel: {
      type: {
        type: String,
        enum: [
          // Marketplace
          "order",
          "product",
          "booking",
          "machine",

          // Service Marketplace
          "service_request",
          "quotation",
          "counter_offer",
          "quotation_accepted",
          "quotation_rejected",
          "counter_accepted",
          "counter_rejected",
          "service_started",
          "service_completed",

          // General
          "system",
        ],
        
      },
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
