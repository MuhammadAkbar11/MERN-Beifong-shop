import {
  postLogin,
  postRegister,
} from "../../controllers/v1/auth.controller.js";
import loginValidation from "../../middleware/validations/login.validation.js";
import registerValidation from "../../middleware/validations/register.validation.js";

function UserRoutes(app, prefix) {
  app.route(`${prefix}/login`).post([loginValidation], postLogin);
  app.route(`${prefix}/register`).post([registerValidation], postRegister);
}

export default UserRoutes;
