const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  changeProductStatus,
} = require("../controllers/product.controller");
const validateId = require("../middleware/validateId.middleware.js");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const router = express.Router();

router.post("/products", auth, authorize("farmer"), createProduct);
router.get("/products", getAllProducts);
router.get("/products/me", auth, authorize("farmer"), getMyProducts);
router.get("/products/:id", validateId("Product"), getProductById);
router.patch(
  "/products/:id",
  auth,
  authorize("farmer"),
  validateId("Product"),
  updateProduct,
);
router.patch(
  "/products/:id/status",
  auth,
  authorize("farmer"),
  validateId("Product"),
  changeProductStatus,
);
module.exports = router;
