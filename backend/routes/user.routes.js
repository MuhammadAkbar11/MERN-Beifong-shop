import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  isAuthUser,
  registerUser,
  updateUser,
  updateUserProfile,
  userPostCart,
  userRemoveCart,
} from "../controllers/user.controller.js";
import { adminProtect, protect } from "../middleware/auth.middlerware.js";
import loginValidation from "../middleware/validations/login.validation.js";
import registerValidation from "../middleware/validations/register.validation.js";
import userUpdateValidation from "../middleware/validations/user.validation.js";

const router = express.Router();

router.route("/").get(protect, adminProtect, getUsers);
router.route("/register").post([registerValidation], registerUser);
router.route("/login").post([loginValidation], authUser);
router.route("/is-auth").get(protect, isAuthUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/cart").post(protect, userPostCart);
router.route("/cart/delete").post(protect, userRemoveCart);
router
  .route("/:id")
  .delete(protect, adminProtect, deleteUser)
  .get(protect, adminProtect, getUserById)
  .put(protect, adminProtect, [userUpdateValidation], updateUser);

export default router;
