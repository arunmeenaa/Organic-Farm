const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const auth = require("../middleware/auth.middleware");
const authtorize = require("../middleware/auth.middleware");
const validate = require("../middleware/validateId.middleware");

router.post("/", auth, authorize("buyer"), validate("Product"), createReview);
router.get("/:productId", auth, validate("Product"), getReviewsByProduct);
router.put("/:reviewId", auth, validate("Review"), updateReview);
router.delete("/:reviewId", auth, validate("Review"), deleteReview);

module.exports = router;
