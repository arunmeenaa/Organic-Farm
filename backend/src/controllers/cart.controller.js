const mongoose = require("mongoose");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

async function addToCart(req, res) {
  const { product, quantity } = req.body;

  try {
    if (!product || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product and quantity are required",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const dbProduct = await productModel.findById(product);

    if (!dbProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (dbProduct.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Product is not available",
      });
    }

    if (dbProduct.farmer.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot add your own product to the cart",
      });
    }

    if (quantity > dbProduct.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${dbProduct.quantity} item(s) available`,
      });
    }

    let cart = await cartModel.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      cart = new cartModel({
        buyer: req.user._id,
        items: [
          {
            product,
            quantity,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product,
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > dbProduct.quantity) {
          return res.status(400).json({
            success: false,
            message: `Only ${dbProduct.quantity} item(s) available`,
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          product,
          quantity,
        });
      }
    }

    await cart.save();

    const populatedCart = await cart.populate({
      path: "items.product",
      select: "name price images quantity farmer",
    });

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      totalItems: populatedCart.items.length,
      cart: populatedCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: err.message,
    });
  }
}

async function getCart(req, res) {
  try {
    const cart = await cartModel
      .findOne({
        buyer: req.user._id,
      })
      .populate({
        path: "items.product",
        select: "name price images quantity status farmer",
        populate: {
          path: "farmer",
          select: "name location profileImage",
        },
      });

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        totalItems: 0,
        subtotal: 0,
        cart: {
          buyer: req.user._id,
          items: [],
        },
      });
    }

    let subtotal = 0;
    let totalItems = 0;

    for (const item of cart.items) {
      if (!item.product) continue;

      subtotal += item.product.price * item.quantity;
      totalItems += item.quantity;
    }

    return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      totalItems,
      subtotal,
      cart,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve cart",
      error: err.message,
    });
  }
}

async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const cart = await cartModel.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find((item) => item.product.toString() === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const product = await productModel.findById(id);

    if (!product || product.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Product is unavailable",
      });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} item(s) available`,
      });
    }

    item.quantity = quantity;

    await cart.save();

    const populatedCart = await cart.populate({
      path: "items.product",
      select: "name price images quantity farmer",
      populate: {
        path: "farmer",
        select: "name location profileImage",
      },
    });
    let subtotal = 0;
    let totalItems = 0;

    for (const item of populatedCart.items) {
      subtotal += item.product.price * item.quantity;
      totalItems += item.quantity;
    }

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      totalItems,
      subtotal,
      cart: populatedCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: err.message,
    });
  }
}

async function removeCartItem(req, res) {
  const { id } = req.params;

  try {
    const cart = await cartModel.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === id,
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== id);

    await cart.save();

    if (cart.items.length === 0) {
      await cart.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Product removed successfully. Cart is now empty.",
        totalItems: 0,
        subtotal: 0,
        cart: {
          buyer: req.user._id,
          items: [],
        },
      });
    }

    const populatedCart = await cart.populate({
      path: "items.product",
      select: "name price images quantity farmer",
      populate: {
        path: "farmer",
        select: "name location profileImage",
      },
    });

    let subtotal = 0;
    let totalItems = 0;

    for (const item of populatedCart.items) {
      subtotal += item.product.price * item.quantity;
      totalItems += item.quantity;
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      totalItems,
      subtotal,
      cart: populatedCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
      error: err.message,
    });
  }
}

async function clearCart(req, res) {
  try {
    const cart = await cartModel.findOne({
      buyer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    await cart.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      totalItems: 0,
      subtotal: 0,
      cart: {
        buyer: req.user._id,
        items: [],
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: err.message,
    });
  }
}

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
