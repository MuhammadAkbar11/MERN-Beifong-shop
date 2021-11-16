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

const router = express.Router();

router.get("/", protect, adminProtect, getUsers);
router.get("/:id", protect, adminProtect, getUserById);
router.delete("/:id", protect, adminProtect, deleteUser);
router.put("/:id", protect, adminProtect, updateUser);
router.post("/register", [registerValidation], registerUser);
router.post("/login", [loginValidation], authUser);
router.get("/is-auth", protect, isAuthUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/cart", protect, userPostCart);
router.post("/cart/delete", protect, userRemoveCart);

export default router;
