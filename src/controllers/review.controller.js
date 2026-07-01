const mongoose = require("mongoose");
const reviewModel = require("../models/review.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

async function createReview(req, res) {
  const { title, productId, rating, comment } = req.body;

  try {
    if (!title || !productId || rating == null || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (title.trim().length === 0 || title.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Title must be between 1 and 50 characters",
      });
    }

    if (comment.trim().length === 0 || comment.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Comment must be between 1 and 500 characters",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.farmer.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot review your own product",
      });
    }

    const order = await orderModel.findOne({
      buyer: req.user._id,
      "products.product": productId,
      orderStatus: "delivered",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You can only review products you have purchased and received",
      });
    }

    const existingReview = await reviewModel.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await reviewModel.create({
      title: title.trim(),
      product: productId,
      user: req.user._id,
      rating,
      comment: comment.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: err.message,
    });
  }
}

async function getReviewsByProduct(req, res) {}

async function updateReview(req, res) {}

async function deleteReview(req, res) {}
module.exports = {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview
};
