import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrdertoPaid);

export default router;
