import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminProtect, protect } from "../middleware/auth.middlerware.js";
import productsValidation from "../middleware/validations/products.validation.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, adminProtect, [productsValidation], createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminProtect, deleteProduct)
  .put(protect, adminProtect, [productsValidation], updateProduct);

export default router;
