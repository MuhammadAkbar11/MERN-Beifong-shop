import express from "express";
import {
  addOrderItems,
  getOrderById,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);

export default router;
