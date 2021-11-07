import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrdertoPaid,
} from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/details/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrdertoPaid);

export default router;
