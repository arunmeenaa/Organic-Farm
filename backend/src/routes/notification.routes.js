const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notification.controller");

router.get("/", auth, getMyNotifications);

router.patch("/read-all", auth, markAllAsRead);

router.patch("/:id/read", auth, markAsRead);

router.delete("/:id", auth, deleteNotification);

module.exports = router;