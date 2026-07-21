const ServiceRequest = require("../models/serviceRequest.model");
const userModel = require("../models/user.model");
const ServiceOrder = require("../models/serviceOrder.model");

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

    response.counterStatus = "accepted";
    response.status = "accepted";

    response.finalPrice = response.buyerOffer;

    response.acceptedAt = new Date();

    response.contactUnlocked = true;

    request.acceptedSeller = response.seller;
    request.status = "accepted";

    await request.save();

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

    // Only buyer can accept
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

    // Final agreed price
    const agreedPrice =
      response.counterStatus === "accepted" && response.buyerOffer != null
        ? response.buyerOffer
        : response.quotedPrice;

    response.status = "accepted";
    response.finalPrice = agreedPrice;
    response.acceptedAt = new Date();
    response.contactUnlocked = true;

    // Reject all other quotations
    request.responses.forEach((quote) => {
      if (quote._id.toString() !== responseId) {
        quote.status = "rejected";
      }
    });

    request.acceptedSeller = response.seller;
    request.status = "accepted";

    // Save request first
    await request.save();

    // Prevent duplicate orders
    const existingOrder = await ServiceOrder.findOne({
      request: request._id,
    });

    if (!existingOrder) {
      await ServiceOrder.create({
        request: request._id,
        buyer: request.buyer,
        seller: response.seller,
        quotationId: response._id,
        finalPrice: agreedPrice,
        pricingType: response.pricingType,
        estimatedStartDate: response.estimatedStartDate,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation accepted successfully.",
      request,
    });
  } catch (err) {
    console.error(err);

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
module.exports = {
  sendCounterOffer,
  acceptCounterOffer,
  acceptQuotation,
  rejectCounterOffer
};
