const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

async function getProfile(req, res) {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: err.message,
    });
  }
}
async function updateProfile(req, res) {
  try {
    const { name, phone, location, bio, profileImage } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();
    if (location) user.location = location.trim();
    if (bio !== undefined) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    const updatedUser = await userModel.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUNDS),
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { getProfile, updateProfile, changePassword };
