import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryByID,
  updateCategory,
} from "../controllers/category.controller.js";
import { adminProtect, protect } from "../middleware/auth.middlerware.js";
import { isBadValidation } from "../middleware/error.middleware.js";
import categoryValidation from "../middleware/validations/category.validation.js";

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(
    protect,
    adminProtect,
    [categoryValidation],
    isBadValidation,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryByID)
  .delete(protect, adminProtect, deleteCategory)
  .put(
    protect,
    adminProtect,
    [categoryValidation],
    isBadValidation,
    updateCategory
  );

export default router;
