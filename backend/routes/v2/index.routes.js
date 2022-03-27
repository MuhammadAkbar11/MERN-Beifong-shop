import { PREFIX_VERSION } from "../../configs/constants.js";
import { getSession } from "../../controllers/v2/auth.controller.js";
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

  // user Routes
  UserRoutes(app, `${PREFIX_VERSION}/users`);
}

export default AppRoutesV2;
