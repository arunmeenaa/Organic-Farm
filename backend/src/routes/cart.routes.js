const express = require("express");

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");

const validateId = require("../middleware/validateId.middleware");

const router = express.Router();

router.use(auth);
router.use(authorize("buyer"));

router.post("/", auth, authorize("buyer"), addToCart);

router.get("/", auth, authorize("buyer"), getCart);

router.patch(
  "/:id",
  auth,
  authorize("buyer"),
  validateId("product"),
  updateCartItem,
);

router.delete(
  "/:id",
  auth,
  authorize("buyer"),
  validateId("product"),
  removeCartItem,
);

router.delete("/", auth, authorize("buyer"), clearCart);

module.exports = router;
