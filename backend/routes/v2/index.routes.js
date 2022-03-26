import { PREFIX_VERSION } from "../../configs/constants.js";
import UserRoutes from "./user.routes.js";

function AppRoutesV2(app) {
  app.get(`${PREFIX_VERSION}`, (req, res) => {
    res.json({ status: true, message: "Welcome to beifong shop Api V2" });
  });

  // auth Routes
  UserRoutes(app, `${PREFIX_VERSION}/users`);
}

export default AppRoutesV2;
