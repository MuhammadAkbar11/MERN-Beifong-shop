import {
  getUserProfile,
  updateUserProfile,
} from "../../controllers/user.controller.js";
import {
  postLogin,
  postLogout,
  postRegister,
} from "../../controllers/v2/auth.controller.js";
import { protect } from "../../middleware/v2/auth.middleware.js";
import loginValidation from "../../middleware/validations/login.validation.js";
import registerValidation from "../../middleware/validations/register.validation.js";

function UserRoutes(app, prefix) {
  app.route(`${prefix}/login`).post([loginValidation], postLogin);
  app.route(`${prefix}/register`).post([registerValidation], postRegister);
  app.route(`${prefix}/logout`).post(postLogout);
  app
    .route(`${prefix}/profile`)
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
}

export default UserRoutes;
