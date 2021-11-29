import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrdertoDelivered,
  updateOrdertoPaid,
} from "../controllers/order.controller.js";
import { adminProtect, protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.get("/", protect, adminProtect, getOrders);
router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/details/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrdertoPaid);
router.put("/:id/deliver", protect, adminProtect, updateOrdertoDelivered);

export default router;
