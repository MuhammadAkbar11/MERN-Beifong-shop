import express from "express";
import { addOrderItems } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);

export default router;
