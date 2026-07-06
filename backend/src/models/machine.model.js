const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Tractor",
        "Harvester",
        "Rotavator",
        "Cultivator",
        "Seeder",
        "Planter",
        "Sprayer",
        "Thresher",
        "Power Tiller",
        "Water Pump",
        "Mini Tractor",
        "Drone",
        "Other",
      ],
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    rentalType: {
      type: String,
      enum: ["machine_only", "with_operator"],
      required: true,
    },

    pricingType: {
      type: String,
      enum: ["per_day", "per_hour", "per_acre"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    available: {
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

    specifications: {
      brand: {
        type: String,
        trim: true,
      },

      model: {
        type: String,
        trim: true,
      },

      horsepower: Number,

      fuelType: {
        type: String,
        enum: ["Diesel", "Petrol", "Electric", "Battery", "Manual"],
      },

      manufacturingYear: Number,
    },

    operatorIncluded: {
      type: Boolean,
      default: false,
    },

    fuelIncluded: {
      type: Boolean,
      default: false,
    },

    minimumBooking: {
      type: Number,
      default: 1,
    },

    maximumBooking: {
      type: Number,
      default: 30,
    },

    availabilityStatus: {
      type: String,
      enum: [
        "available",
        "booked",
        "maintenance",
        "inactive",
      ],
      default: "available",
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Machine", machineSchema);