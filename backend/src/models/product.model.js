const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

   images: {
  type: [String],
  required: true,
  validate: {
    validator: function (images) {
      return images.length > 0;
    },
    message: "At least one product image is required",
  },
},

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Vegetables",
        "Fruits",
        "Grains",
        "Seeds",
        "Fertilizers",
        "Equipment",
        "Others",
        "Pulses",
        "Spices",
        "Herbs",
        "Dairy"
      ],
    },

    unit: {
      type: String,
      enum: ["kg", "gram", "quintal", "piece", "dozen", "litre","bundle"],
      default: "kg",
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
