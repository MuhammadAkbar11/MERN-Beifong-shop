import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  getRelatedProducts,
  getTopProducts,
  updateProduct,
} from "../../controllers/product.controller.js";
import { adminProtect, protect } from "../../middleware/v2/auth.middleware.js";
import productsValidation from "../../middleware/validations/products.validation.js";

function ProductRoutes(app, prefix) {
  app.route(prefix).get(getProducts).post(protect, adminProtect, createProduct);
  app.route(prefix + "/top").get(getTopProducts);
  app.route(prefix + "/:id/reviews").post(protect, createProductReview);
  app.route(prefix + "/:id/related").get(getRelatedProducts);
  app.route(prefix + "/category/:slug").get(getProductsByCategory);
  app
    .route(prefix + "/:id")
    .get(getProductById)
    .delete(protect, adminProtect, deleteProduct)
    .put(protect, adminProtect, [productsValidation], updateProduct);
}

export default ProductRoutes;
