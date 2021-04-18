import express from "express";
import { getCart, postCart } from "../controllers/cart.controller.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middlerware.js";
import loginValidation from "../middleware/validations/login.validation.js";
import registerValidation from "../middleware/validations/register.validation.js";

const router = express.Router();

router.post("/register", [registerValidation], registerUser);
router.post("/login", [loginValidation], authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.get("/cart", protect, getCart);
router.post("/cart", protect, postCart);

export default router;
