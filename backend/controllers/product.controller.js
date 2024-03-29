import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { sampleGenerateProduct } from "../data/products.js";
import CategoryModel from "../models/categoryModel.js";
import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import convertRupiah from "../utils/convertRupiah.js";
import errMessageValidation from "../utils/errMessagesValidation.js";
import { deleteFile } from "../utils/file.js";
import ResponseError from "../utils/responseError.js";

const rgx = pattern => new RegExp(`.*${pattern}.*`);

// @desc Fetch All Products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const { keyword, pageNumber, result, orderBy } = req.query;
  // console.log(keyword);

  const sortBy = orderBy ?? "name";
  const searchRgx = rgx(keyword);

  const pageSize = Number(result) || 2;
  const page = Number(pageNumber) || 1;
  const query = keyword
    ? {
        $or: [
          { name: { $regex: searchRgx, $options: "i" } },
          { description: { $regex: searchRgx, $options: "i" } },
        ],
      }
    : {};

  const sorting = {
    latest: "-1",
    name: {
      name: 1,
    },
  };
  console.log(sorting, sortBy, sorting[sortBy]);
  const count = await ProductModel.countDocuments({ ...query });

  const products = await ProductModel.find({ ...query })
    .populate("category", "name slug icon")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sorting[sortBy]);

  return res.json({
    status: true,
    page,
    pages: Math.ceil(count / pageSize),
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
      const getSoldOutCount = await OrderModel.countDocuments({
        isPaid: true,
        orderItems: { $elemMatch: { product: product._id } },
      });

      res.json({
        status: true,
        product: { ...product._doc, soldOut: getSoldOutCount },
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
      createdAt: new Date().toISOString(),
      updatedAt: null,
    });
    const createdProduct = await product.save();
    res.status(201).json({
      status: true,
      product: createdProduct,
      message: "Successfully create product",
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
  const {
    uploading,
    oldImage,
    name,
    price,
    brand,
    category,
    description,
    countInStock,
    image,
  } = req.body;

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
      product.updatedAt = new Date().toISOString();

      const updateProduct = await product.save();

      const isOldImageLocal = oldImage.includes("product");

      if (isOldImageLocal) {
        if (uploading) {
          deleteFile(oldImage);
        } else {
          if (image !== oldImage) {
            deleteFile(oldImage);
          }
        }
      }

      res.status(201).json({
        status: true,
        product: updateProduct,
        message: "Successfully update product",
      });
    } else {
      res.status(404);
      throw new ResponseError(400, "Product not found");
    }
  } catch (err) {
    const errorObj = {
      statusCode: err?.statusCode || 500,
      message: "Something went wrong",
      errors: err.errors,
    };

    throw new ResponseError(errorObj);
  }
});

// @desc Create new Review
// @route PUT /api/products/:id/reviews
// @access Private/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await ProductModel.findById(req.params.id);
    const user = req.user;
    if (product) {
      const productReviews = product.reviews;

      const alreadyReviewed = productReviews.find(
        r => r.user.toString() === user._id.toString()
      );

      const review = {
        name: user.name,
        rating: Number(rating),
        comment,
        user: user._id,
      };

      if (alreadyReviewed) {
        const reviewIndex = productReviews.findIndex(x => {
          return x.user.toString() === user._id.toString();
        });
        productReviews[reviewIndex] = review;
        const ratingResult =
          productReviews.reduce((acc, item) => item.rating + acc, 0) /
          productReviews.length;

        product.rating = ratingResult.toFixed(1);
        product.numReviews = productReviews.length;
        await product.save();
        return res.status(201).json({
          status: true,
          message: "Review updated!",
        });
      }

      productReviews.push(review);
      const ratingResult =
        productReviews.reduce((acc, item) => item.rating + acc, 0) /
        productReviews.length;

      product.rating = ratingResult.toFixed(1);
      product.numReviews = productReviews.length;

      await product.save();
      res.status(201).json({
        status: true,
        message: "Review added!",
      });
    } else {
      res.status(404);
      throw new ResponseError(400, "Product not found");
    }
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Get Top Reted Products
// @route GET /api/product/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 3;
  try {
    const getTopProducts = await ProductModel.find({})
      .populate("category", "name slug icon")
      .sort({ rating: -1 })
      .limit(Number(limit));

    res.json({ products: getTopProducts });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Get Product by Category
// @route GET /api/product/top
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug;

  const { pageNumber, limit } = req.query;

  const pageSize = Number(limit) || 10;
  const page = Number(pageNumber) || 1;

  try {
    const category = await CategoryModel.findOne({ slug });

    if (category) {
      const count = await ProductModel.countDocuments({
        category: category._id,
      });

      const products = await ProductModel.find({ category: category._id })
        .populate("category", "name slug icon")
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      return res.json({
        status: true,
        page,
        totalProducts: count,
        category,
        pages: Math.ceil(count / pageSize),
        products,
      });
    } else {
      res.status(404);
      throw new ResponseError(400, `can't find Category with "${slug}"`);
    }
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Get Related Products
// @route GET /api/products/:id/related
// @access Public
const getRelatedProducts = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { limit } = req.query;

  try {
    const product = await ProductModel.findById(id);
    if (product) {
      const query = {
        $or: [
          { sample: { $regex: rgx(product.brand), $options: "i" } },
          { category: product.category },
        ],
      };

      const products = await ProductModel.find({ ...query })
        .populate("category", "name slug icon")
        .limit(Number(limit));

      return res.json({
        status: true,
        products,
      });
    } else {
      res.status(404);
      throw new ResponseError(400, `No related Products`);
    }
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export {
  getProducts,
  getProductById,
  getTopProducts,
  getProductsByCategory,
  getRelatedProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
