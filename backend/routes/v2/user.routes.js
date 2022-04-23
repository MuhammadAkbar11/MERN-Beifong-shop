import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  uploadPhotoUser,
  userPostCart,
  userRemoveCart,
} from "../../controllers/user.controller.js";
import {
  postLogin,
  postLogout,
  postRegister,
} from "../../controllers/auth.controller.js";
import { adminProtect, protect } from "../../middleware/v2/auth.middleware.js";
import loginValidation from "../../middleware/validations/login.validation.js";
import registerValidation from "../../middleware/validations/register.validation.js";
import userUpdateValidation from "../../middleware/validations/user.validation.js";

function UserRoutes(app, prefix) {
  app.route(`${prefix}`).get(protect, adminProtect, getUsers);
  app.route(`${prefix}/login`).post([loginValidation], postLogin);
  app.route(`${prefix}/register`).post([registerValidation], postRegister);
  app.route(`${prefix}/logout`).post(protect, postLogout);
  app.route(`${prefix}/upload-photo/:id`).post(protect, uploadPhotoUser);
  app
    .route(`${prefix}/profile`)
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

  app.route(`${prefix}/cart`).post(protect, userPostCart);
  app.route(`${prefix}/cart/delete`).post(protect, userRemoveCart);

  app
    .route(`${prefix}/:id`)
    .get(protect, adminProtect, getUserById)
    .delete(protect, adminProtect, deleteUser)
    .put(protect, adminProtect, [userUpdateValidation], updateUser);
}

export default UserRoutes;
