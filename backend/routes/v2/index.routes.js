import { PREFIX_VERSION } from "../../configs/constants.js";
import { handleRefreshToken } from "../../controllers/v2/auth.controller.js";
import UserRoutes from "./user.routes.js";

function AppRoutesV2(app) {
  app.get(`${PREFIX_VERSION}`, (req, res) => {
    res.json({ status: true, message: "Welcome to beifong shop Api V2" });
  });

  app.get(`${PREFIX_VERSION}/refresh`, handleRefreshToken);

  // user Routes
  UserRoutes(app, `${PREFIX_VERSION}/users`);
}

export default AppRoutesV2;
