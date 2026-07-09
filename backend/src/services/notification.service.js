const Notification = require("../models/notification.model");

/**
 * Create a notification
 * @param {Object} data
 */
exports.createNotification = async ({
  receiver,
  sender = null,
  title,
  message,
  type,
  referenceId = null,
}) => {
  try {
    const notification = await Notification.create({
      receiver,
      sender,
      title,
      message,
      type,
      referenceId,
    });

    return notification;
  } catch (err) {
    console.error("Notification Error:", err.message);
    return null;
  }
};