import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryByID,
  updateCategory,
} from "../../controllers/category.controller.js";
import { isBadValidation } from "../../middleware/error.middleware.js";
import { adminProtect, protect } from "../../middleware/v2/auth.middleware.js";
import categoryValidation from "../../middleware/validations/category.validation.js";

function CategoryRoutes(app, prefix) {
  app
    .route(prefix + "/")
    .get(getCategories)
    .post(
      protect,
      adminProtect,
      [categoryValidation],
      isBadValidation,
      createCategory
    );
  app
    .route(prefix + "/:id")
    .get(getCategoryByID)
    .delete(protect, adminProtect, deleteCategory)
    .put(
      protect,
      adminProtect,
      [categoryValidation],
      isBadValidation,
      updateCategory
    );
}

export default CategoryRoutes;
