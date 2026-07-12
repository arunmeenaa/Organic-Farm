const Notification = require("../models/notification.model");
const { sendNotification } = require("../socket");

exports.createNotification = async ({
  receiver,
  sender,
  title,
  message,
  type,
  referenceId,
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

    const populatedNotification = await Notification.findById(notification._id)
      .populate("sender", "name");

    sendNotification(receiver, populatedNotification);

    return populatedNotification;
  } catch (err) {
    console.error(err);
    return null;
  }
};