const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/profile", auth, getProfile);
router.put("/profile", auth, upload.single("profileImage"), updateProfile);
router.put("/change-password", auth, changePassword);

module.exports = router;
