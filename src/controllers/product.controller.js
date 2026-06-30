const productModel = require("../models/product.model");
const mongoose = require("mongoose")

async function createProduct(req, res) {
  const { name, description, images, price, quantity, category, unit } =
    req.body;
  try {
    if (
      !name ||
      !description ||
      price == null ||
      quantity == null ||
      !category
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "At least one product image is required",
      });
    }
    const product = await productModel.create({
      name,
      description,
      images,
      price,
      quantity,
      category,
      unit,
      farmer: req.user._id,
    });
    res.status(201).json({
      message: "Product Created:",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed product creation: " + err.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await productModel
      .find({ status: "active" })
      .populate("farmer", "name location profileImage")
      .sort({ createdAt: -1 })
      .lean();
    return res.status(200).json({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await productModel
      .findOne({ _id: id, status: "active" })
      .populate("farmer", "name location profileImage")
      .lean();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = { createProduct, getAllProducts, getProductById };
