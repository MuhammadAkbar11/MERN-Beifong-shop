import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import { adminProtect, protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminProtect, deleteProduct);

export default router;
