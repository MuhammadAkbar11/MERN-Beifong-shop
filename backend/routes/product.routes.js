import express from "express";
import asyncHandler from "express-async-handler";

import ProductModel from "../models/productModel.js";

const router = express.Router();

// @desc Fetch All Products
// @route GET /api/products
// @access Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find({});
    return res.json({
      status: true,
      products,
    });
  })
);

// @desc Fetch Single Product
// @route GET /api/product/:id
// @access Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id);

    if (product) {
      return res.json({
        status: true,
        product,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
  })
);

export default router;
