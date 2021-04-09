import asyncHandler from "express-async-handler";
import ProductModel from "../models/productModel.js";

// @desc Fetch All Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({});
  return res.json({
    status: true,
    products,
  });
});

// @desc Fetch Single Product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (product) {
      res.json({
        status: true,
        product,
      });
    } else {
      res.status(404);
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    console.log(err);
    const errorObj = new Error();
    errorObj.statusCode = 500;
    errorObj.message = "Something went wrong";

    if (err.kind === "ObjectId" || err.statusCode) {
      errorObj.statusCode = 404;
      errorObj.message = "Product not found";
    }
    throw errorObj;
  }
});

export { getProducts, getProductById };
