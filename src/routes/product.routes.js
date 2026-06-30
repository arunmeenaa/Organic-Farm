const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const router = express.Router();

router.post("/create-product", auth, authorize("farmer"), createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

module.exports = router;
