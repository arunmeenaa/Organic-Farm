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
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/",
  auth,
  authorize("farmer"),
  upload.array("images", 5),
  createProduct,
);
router.get("/", getAllProducts);
router.get("/me", auth, authorize("farmer"), getMyProducts);
router.get("/:id", validateId("product"), getProductById);

router.patch(
  "/:id",
  auth,
  authorize("farmer"),
  upload.array("images", 5),
  validateId("product"),
  updateProduct,
);

router.patch(
  "/:id/status",
  auth,
  authorize("farmer"),
  validateId("product"),
  changeProductStatus,
);
module.exports = router;
