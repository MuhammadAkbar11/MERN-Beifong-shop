import asyncHandler from "express-async-handler";
import CategoryModel from "../models/categoryModel.js";
import ResponseError from "../utils/responseError.js";

// @desc Fetch All Categories
// @route GET /api/categories
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    return res.json({
      status: true,
      categories,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Fetch a Category By Id
// @route GET /api/categories/:id
// @access Public
export const getCategoryByID = asyncHandler(async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (category) {
      res.json({
        status: true,
        category,
      });
    } else {
      res.status(404);
      throw new ResponseError(404, "Category not found", {});
    }

    return res.json({
      status: true,
      category,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Delete a Category
// @route DELET /api/categories/:id
// @access Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (category) {
      await category.remove();
      res.json({
        status: true,
        message: "Category has been delete!",
      });
    } else {
      res.status(404);
      throw new ResponseError(404, "Category not found", {});
    }

    return res.json({
      status: true,
      category,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc create a Category
// @route POST /api/categories
// @access Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, icon } = req.body;

  try {
    const category = new CategoryModel({ name, slug, icon });
    const createdCategory = await category.save();
    res.status(201).json({
      status: true,
      category: createdCategory,
      message: "successfully create a new category",
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Update a Category
// @route PUT /api/categories/:id
// @access Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, slug, icon } = req.body;

  try {
    const category = await CategoryModel.findById(req.params.id);

    if (category) {
      category.name = name;
      category.slug = slug;
      category.icon = icon;

      const updatedCategory = await category.save();
      res.json({
        status: true,
        message: "successfully update category",
        category: updatedCategory,
      });
    } else {
      res.status(404);
      throw new ResponseError(404, "Category not found", {});
    }

    return res.json({
      status: true,
      category,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
