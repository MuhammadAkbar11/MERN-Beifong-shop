import { PREFIX_VERSION } from "../../configs/constants.js";
import { getSession } from "../../controllers/auth.controller.js";
import { getPaypalId } from "../../controllers/config.controller.js";
import OrderRoutes from "./order.routes.js";
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

  // user Routes
  UserRoutes(app, `${PREFIX_VERSION}/users`);

  // Order Routes
  OrderRoutes(app, `${PREFIX_VERSION}/orders`);
}

export default AppRoutesV2;
