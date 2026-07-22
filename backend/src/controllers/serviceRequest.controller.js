const ServiceRequest = require("../models/serviceRequest.model");
const userModel = require("../models/user.model");
const { uploadImage } = require("../utils/imageKit");
const { createNotification } = require("../services/notification.service");

const createServiceRequest = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      landArea,
      unit,
      requiredDate,
      village,
      district,
      state,
      pincode,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !landArea ||
      !requiredDate ||
      !village ||
      !district ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required.",
      });
    }

    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadImage(file);
        imageUrls.push(url);
      }
    }

    const request = await ServiceRequest.create({
      buyer: req.user._id,
      title,
      category,
      description,
      landArea,
      unit: unit || "acre",
      requiredDate,
      location: {
        village,
        district,
        state,
        pincode,
      },

      images: imageUrls,

      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    const sellers = await userModel.find({
      role: "seller",
      "location.district": district,
    });

    await Promise.all(
      sellers.map((seller) =>
        createNotification({
          receiver: seller._id,
          sender: req.user._id,
          title: "New Service Request",
          message: `${title} posted in ${district}.`,
          type: "service_request",
          referenceId: request._id,
        }),
      ),
    );
    return res.status(201).json({
      success: true,
      message: "Service request created successfully.",
      request,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOpenServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      status: "open",
      expiresAt: { $gt: new Date() },
    })
      .populate("buyer", "name profileImage location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      buyer: req.user._id,
    })
      .populate("buyer", "name profileImage")
      .populate("acceptedSeller", "name profileImage phone")
      .populate("responses.seller", "name profileImage phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const submitQuotation = async (req, res) => {
  try {
    const { quotedPrice, pricingType, message, estimatedStartDate } = req.body;

    if (!quotedPrice || !pricingType) {
      return res.status(400).json({
        success: false,
        message: "Quoted price and pricing type are required.",
      });
    }

    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    if (request.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This request is no longer accepting quotations.",
      });
    }

    const alreadyResponded = request.responses.find(
      (response) =>
        response.seller.toString() === req.user._id.toString() &&
        response.status === "pending",
    );

    if (alreadyResponded) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted a quotation. Please wait for the buyer to accept or reject it.",
      });
    }

    request.responses.push({
      seller: req.user._id,
      quotedPrice,
      pricingType,
      message,
      estimatedStartDate,
    });

    await request.save();
    console.log("Request saved");

    console.log("Before notification");

    await createNotification({
      receiver: request.buyer,
      sender: req.user._id,
      title: "New Quotation",
      message: "A seller has submitted a quotation for your request.",
      type: "quotation",
      referenceId: request._id,
    });

    console.log("After notification");

    return res.json({
      success: true,
      message: "Quotation submitted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    // Only the buyer can delete the request
    if (request.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this request.",
      });
    }

    // Don't allow deletion once work has started
    if (
      request.status === "accepted" ||
      request.status === "in_progress" ||
      request.status === "completed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This request cannot be deleted because it has already been accepted or completed.",
      });
    }

    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Service request deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const cancelServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    if (request.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    if (request.status === "completed" || request.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "This request cannot be cancelled.",
      });
    }

    request.status = "cancelled";
    await request.save();

    return res.status(200).json({
      success: true,
      message: "Request cancelled successfully.",
      request,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getServiceRequestById = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate("buyer", "name profileImage phone isVerified createdAt")
      .populate("responses.seller", "name profileImage");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }
    if (request.buyer._id.toString() === req.user._id.toString()) {
      request.responses.forEach((response) => {
        response.isViewedByBuyer = true;
      });

      await request.save();
    }
    return res.status(200).json({
      success: true,
      request,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSellerRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({})
      .populate("buyer", "name profileImage isVerified")
      .populate("acceptedSeller", "name profileImage")
      .populate("responses.seller", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  createServiceRequest,
  getOpenServiceRequests,
  getMyServiceRequests,
  submitQuotation,
  cancelServiceRequest,
  deleteServiceRequest,
  getServiceRequestById,
  getSellerRequests,
};
