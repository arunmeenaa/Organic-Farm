const express = require("express");
const router = express.Router();
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getMyReview
} = require("../controllers/review.controller");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validateId.middleware");

router.get(
  "/my/:id",
  auth,
  authorize("buyer"),
  validate("Product"),
  getMyReview
);
router.post("/", auth, authorize("buyer"), createReview);
router.get("/product/:id", validate("Product"), getProductReviews);
router.patch(
  "/:id",
  auth,
  authorize("buyer"),
  validate("Review"),
  updateReview,
);
router.delete(
  "/:id",
  auth,
  authorize("buyer"),
  validate("Review"),
  deleteReview,
);

module.exports = router;
