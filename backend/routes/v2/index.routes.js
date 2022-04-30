import { PREFIX_VERSION } from "../../configs/constants.js";
import { getSession } from "../../controllers/auth.controller.js";
import {
  getConvertCurrency,
  getPaypalId,
} from "../../controllers/config.controller.js";
import CategoryRoutes from "./category.routes.js";
import OrderRoutes from "./order.routes.js";
import ProductRoutes from "./product.routes.js";
import UploadRoutes from "./upload.routes.js";
import UserRoutes from "./user.routes.js";

function AppRoutesV2(app) {
  app.get(`${PREFIX_VERSION}`, (req, res) => {
    res.json({
      status: true,
      user: req.user,
      message: "Welcome to beifong shop Api V2",
    });
  });

  app.get(`${PREFIX_VERSION}/session`, getSession);
  app.get(`${PREFIX_VERSION}/config/paypal`, getPaypalId);
  app.get(`${PREFIX_VERSION}/config/currency`, getConvertCurrency);

  // user Routes
  UserRoutes(app, `${PREFIX_VERSION}/users`);

  // Products Routes
  ProductRoutes(app, `${PREFIX_VERSION}/products`);

  // Categories Routes
  CategoryRoutes(app, `${PREFIX_VERSION}/categories`);

  // Order Routes
  OrderRoutes(app, `${PREFIX_VERSION}/orders`);

  // Upload Routes
  UploadRoutes(app, `${PREFIX_VERSION}/upload`);
}

export default AppRoutesV2;
