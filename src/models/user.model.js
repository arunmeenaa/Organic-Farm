const mongoose = require("mongoose");
require("dotenv").config();

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dxj0gqv3f/image/upload/v1690300915/Organic-Farm/user-profile-icon-24.jpg",
    },
    role: {
      type: String,
      enum: { values: ["buyer", "farmer", "admin"] },
      required: true,
    },
     isVerified:{
        type:Boolean,
        default:false
     }
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userModel);
