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

async function getProductReviews(req, res) {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const reviews = (
      await reviewModel.find({ product: productId }).populate("user", "name")
    )
      .sort({ createdAt: -1 })
      .lean();

    let totalRating = 0;

    for (const review of reviews) {
      totalRating += review.rating;
    }

    const averageRating =
      reviews.length === 0
        ? 0
        : Number((totalRating / reviews.length).toFixed(1));

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews,
      averageRating,
      totalReviews: reviews.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get reviews",
      error: err.message,
    });
  }
}

async function updateReview(req, res) {
  const { reviewId } = req.params;
  const { title, rating, comment } = req.body;

  try {
    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own reviews",
      });
    }
    if (title === undefined && rating === undefined && comment === undefined) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }
    if (title !== undefined) {
      if (typeof title !== "string") {
        return res.status(400).json({
          success: false,
          message: "Title must be a string",
        });
      }
      const trimmedTitle = title.trim();
      if (trimmedTitle.length === 0 || trimmedTitle.length > 50) {
        return res.status(400).json({
          success: false,
          message: "Title must be between 1 and 50 characters",
        });
      }

      review.title = trimmedTitle;
    }

    if (rating !== undefined) {
      if (typeof rating !== "number") {
        return res.status(400).json({
          success: false,
          message: "Rating must be a number",
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }

      review.rating = rating;
    }

    if (comment !== undefined) {
      if (typeof comment !== "string") {
        return res.status(400).json({
          success: false,
          message: "Comment must be a string",
        });
      }

      const trimmedComment = comment.trim();

      if (trimmedComment.length === 0 || trimmedComment.length > 200) {
        return res.status(400).json({
          success: false,
          message: "Comment must be between 1 and 200 characters",
        });
      }

      review.comment = trimmedComment;
    }

    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update review",
      error: err.message,
    });
  }
}

async function deleteReview(req, res) {
  const { reviewId } = req.params;

  try {
    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    await review.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: err.message,
    });
  }
}

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
