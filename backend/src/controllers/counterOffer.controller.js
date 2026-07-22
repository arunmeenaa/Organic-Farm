const ServiceRequest = require("../models/serviceRequest.model");
const userModel = require("../models/user.model");
const ServiceOrder = require("../models/serviceOrder.model");
const { finalizeAgreement } = require("../utils/serviceAgreement");
const { createNotification } = require("../services/notification.service");

const sendCounterOffer = async (req, res) => {
  try {
    const { buyerOffer, buyerMessage } = req.body;

    const request = await ServiceRequest.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const response = request.responses.id(req.params.responseId);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }
    if (response.buyerOffer !== null) {
      return res.status(400).json({
        success: false,
        message: "Counter offer already submitted.",
      });
    }

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    response.buyerOffer = buyerOffer;
    response.buyerMessage = buyerMessage;
    response.counterStatus = "pending";
    response.status = "countered";

    await request.save();
    await createNotification({
      receiver: response.seller,
      sender: req.user._id,
      title: "Counter Offer",
      message: `Buyer offered ₹${buyerOffer}.`,
      type: "counter_offer",
      referenceId: request._id,
    });
    return res.json({
      success: true,
      message: "Counter offer sent successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const acceptCounterOffer = async (req, res) => {
  try {
    const { requestId, responseId } = req.params;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const response = request.responses.id(responseId);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    if (response.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (response.counterStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "No pending counter offer.",
      });
    }

    response.counterStatus = "accepted";

    await finalizeAgreement(request, response, response.buyerOffer);
    await createNotification({
      receiver: request.buyer,
      sender: req.user._id,
      title: "Counter Offer Accepted",
      message: "The seller accepted your counter offer.",
      type: "counter_accepted",
      referenceId: request._id,
    });
    return res.json({
      success: true,
      message: "Counter offer accepted.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const rejectCounterOffer = async (req, res) => {
  try {
    const { requestId, responseId } = req.params;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const response = request.responses.id(responseId);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    if (response.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    response.counterStatus = "rejected";
    response.buyerOffer = null;
    response.buyerMessage = "";

    await request.save();
    await createNotification({
      receiver: request.buyer,
      sender: req.user._id,
      title: "Counter Offer Rejected",
      message: "The seller rejected your counter offer.",
      type: "counter_rejected",
      referenceId: request._id,
    });
    res.json({
      success: true,
      message: "Counter offer rejected.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const rejectQuotation = async (req, res) => {
  try {
    const { requestId, responseId } = req.params;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    // Only the buyer can reject quotations
    if (request.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized.",
      });
    }

    if (request.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This request has already been finalized.",
      });
    }

    const response = request.responses.id(responseId);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found.",
      });
    }

    // Already processed
    if (response.status === "accepted") {
      return res.status(400).json({
        success: false,
        message: "Accepted quotation cannot be rejected.",
      });
    }

    if (response.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Quotation has already been rejected.",
      });
    }

    response.status = "rejected";
    response.counterStatus = "none";
    response.buyerOffer = null;
    response.buyerMessage = "";

    await request.save();
    await createNotification({
      receiver: response.seller,
      sender: req.user._id,
      title: "Quotation Rejected",
      message: "Your quotation has been rejected.",
      type: "quotation_rejected",
      referenceId: request._id,
    });
    return res.status(200).json({
      success: true,
      message: "Quotation rejected successfully.",
      request,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const acceptQuotation = async (req, res) => {
  try {
    const { requestId, responseId } = req.params;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    if (request.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized.",
      });
    }

    if (request.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This request has already been finalized.",
      });
    }

    const response = request.responses.id(responseId);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found.",
      });
    }

    await finalizeAgreement(request, response, response.quotedPrice);
    await createNotification({
      receiver: response.seller,
      sender: req.user._id,
      title: "Quotation Accepted",
      message: "Your quotation has been accepted.",
      type: "quotation_accepted",
      referenceId: request._id,
    });
    return res.status(200).json({
      success: true,
      message: "Quotation accepted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  sendCounterOffer,
  acceptCounterOffer,
  rejectCounterOffer,

  acceptQuotation,
  rejectQuotation,
};
