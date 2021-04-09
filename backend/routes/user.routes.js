import express from "express";
import { authUser, getUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
