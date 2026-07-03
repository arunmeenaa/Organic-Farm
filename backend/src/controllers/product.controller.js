const productModel = require("../models/product.model");
const { uploadImage } = require("../utils/imagekit");
const mongoose = require("mongoose");

async function createProduct(req, res) {
  try {
    const { name, description, price, quantity, category, unit } = req.body;

    if (!name || !description || !price || !quantity || !category) {
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
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one product image is required",
      });
    }

    const imageUrls = [];

    for (const file of req.files) {
      const url = await uploadImage(file);
      imageUrls.push(url);
    }

    const product = await productModel.create({
      name,
      description,
      images: imageUrls,
      price,
      quantity,
      category,
      unit,
      farmer: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be greater than 0",
      });
    }
    if (
      !Number.isInteger(pageNumber) ||
      !Number.isInteger(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers",
      });
    }

    const filter = {
      status: "active",
    };
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    if (
      (minPrice && Number.isNaN(Number(minPrice))) ||
      (maxPrice && Number.isNaN(Number(maxPrice)))
    ) {
      return res.status(400).json({
        success: false,
        message: "Price filters must be valid numbers",
      });
    }
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const totalProducts = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNumber);

    const products = await productModel
      .find(filter)
      .populate("farmer", "name location profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .lean();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      currentPage: pageNumber,
      totalPages,
      totalProducts,
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

async function getMyProducts(req, res) {
  try {
    const products = await productModel
      .find({ farmer: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "My products fetched successfully",
      count: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product is no longer available",
      });
    }
    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You don't have permission to update this product",
      });
    }
    const {
      name,
      description,
      images,
      price,
      quantity,
      category,
      unit,
      status,
    } = req.body;
    if (price !== undefined && price < 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (images !== undefined) product.images = images;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (category !== undefined) product.category = category;
    if (unit !== undefined) product.unit = unit;
    if (status !== undefined) product.status = status;

    await product.save();
    res.status(200).json({
      message: "Product updated Succesfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function changeProductStatus(req, res) {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product is no longer available",
      });
    }
    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You don't have permission to update status of product",
      });
    }
    product.status = product.status === "active" ? "inactive" : "active";

    await product.save();
    res.status(200).json({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update Status of Product",
      error: err.message,
    });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  changeProductStatus,
};
