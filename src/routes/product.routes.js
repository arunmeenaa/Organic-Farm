const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  changeProductStatus,
} = require("../controllers/product.controller");
const validateProductId = require("../middleware/product.validation.middleware");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const router = express.Router();

router.post("/products", auth, authorize("farmer"), createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", validateProductId, getProductById);
router.get("/products/me", auth, authorize("farmer"), getMyProducts);
router.patch(
  "/products/:id",
  auth,
  authorize("farmer"),
  validateProductId,
  updateProduct,
);
router.patch(
  "/products/:id/status",
  auth,
  authorize("farmer"),
  validateProductId,
  changeProductStatus,
);
module.exports = router;
