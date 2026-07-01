const express = require("express");
const router = express.Router();
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validateId.middleware");

router.post("/", auth, authorize("buyer"), validate("Product"), createReview);
router.get("/:productId", auth, validate("Product"), getProductReviews);
router.put("/:reviewId", auth, validate("Review"), updateReview);
router.delete("/:reviewId", auth, validate("Review"), deleteReview);

module.exports = router;
