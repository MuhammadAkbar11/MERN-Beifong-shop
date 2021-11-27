import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { sampleGenerateProduct } from "../data/products.js";
import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import convertRupiah from "../utils/convertRupiah.js";
import errMessageValidation from "../utils/errMessagesValidation.js";
import ResponseError from "../utils/responseError.js";

// @desc Fetch All Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({}).populate(
    "category",
    "name slug icon"
  );
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
    const product = await ProductModel.findById(id).populate(
      "category",
      "name slug icon"
    );
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

// @desc Fetch Single Product
// @route GET /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    if (product) {
      await product.remove();
      res.json({
        status: true,
        message: "Product has been deleted",
      });
    } else {
      res.status(404);
      throw new ResponseError(400, "Product not found");
    }
  } catch (err) {
    const errorObj = {
      statusCode: 500,
      message: "Something went wrong",
    };

    if (err.kind === "ObjectId" || err.statusCode) {
      errorObj.statusCode = 404;
      errorObj.message = "Product not found";
    }

    throw new ResponseError(errorObj);
  }
});

// @desc create a Product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, description } = sampleGenerateProduct;

  const categoriesCount = await CategoryModel.countDocuments();

  const random = Math.floor(Math.random() * categoriesCount);
  const category = await CategoryModel.findOne().skip(random).exec();

  try {
    const product = new ProductModel({
      name: name,
      price: {
        num: +price,
        rupiah: convertRupiah(+price),
      },
      user: req.user._id,
      image: "/uploads/images/sample-box.jpg",
      brand,
      category: category._id,
      rating: 0,
      numReviews: 9,
      countInStock: 0,
      description,
      reviews: [],
    });
    const createdProduct = await product.save();
    res.status(201).json({
      status: true,
      product: createdProduct,
      message: "successfully create product",
    });
  } catch (err) {
    const errorObj = {
      statusCode: err?.statusCode || 500,
      message: "Something went wrong",
      errors: err.errors,
    };

    throw new ResponseError(errorObj);
  }
});

// @desc edit Product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, description, countInStock, image } =
    req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Bad validation", { validation: errorMsg });
  }

  try {
    const product = await ProductModel.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = {
        num: +price,
        rupiah: convertRupiah(+price),
      };
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.countInStock = countInStock || 0;
      product.image = image || product.image;

      const updateProduct = await product.save();
      res.status(201).json({
        status: true,
        product: updateProduct,
        message: "successfully update product",
      });
    } else {
      res.status(404);
      throw new ResponseError(400, "Product not found");
    }
  } catch (err) {
    console.log(err);
    const errorObj = {
      statusCode: err?.statusCode || 500,
      message: "Something went wrong",
      errors: err.errors,
    };

    throw new ResponseError(errorObj);
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
