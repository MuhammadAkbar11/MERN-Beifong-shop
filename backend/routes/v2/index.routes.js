import { PREFIX_VERSION } from "../../configs/constants.js";
import UserRoutes from "./user.routes.js";

function AppRoutesV1(app) {
  app.get(`${PREFIX_VERSION}`, (req, res) => {
    res.json({ status: true, message: "Welcome to beifong shop Api V1" });
  });

  // auth Routes
  UserRoutes(app, `${PREFIX_VERSION}/users`);
}

export default AppRoutesV1;
