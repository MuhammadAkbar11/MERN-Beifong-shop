import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middlerware.js";
import loginValidation from "../middleware/validations/login.validation.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", [loginValidation], authUser);
router.get("/profile", protect, getUserProfile);

export default router;
