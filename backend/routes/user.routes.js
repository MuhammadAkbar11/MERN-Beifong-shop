import express from "express";
import {
  authUser,
  deleteUser,
  getUserProfile,
  getUsers,
  isAuthUser,
  registerUser,
  updateUserProfile,
  userPostCart,
  userRemoveCart,
} from "../controllers/user.controller.js";
import { adminProtect, protect } from "../middleware/auth.middlerware.js";
import loginValidation from "../middleware/validations/login.validation.js";
import registerValidation from "../middleware/validations/register.validation.js";

const router = express.Router();

router.get("/", protect, adminProtect, getUsers);
router.delete("/:id", protect, adminProtect, deleteUser);
router.post("/register", [registerValidation], registerUser);
router.post("/login", [loginValidation], authUser);
router.get("/is-auth", protect, isAuthUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/cart", protect, userPostCart);
router.post("/cart/delete", protect, userRemoveCart);

export default router;
