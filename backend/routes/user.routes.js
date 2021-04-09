import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
