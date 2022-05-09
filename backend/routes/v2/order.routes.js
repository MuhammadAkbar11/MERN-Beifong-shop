import { adminProtect, protect } from "../../middleware/v2/auth.middleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrdertoDelivered,
  updateOrdertoPaid,
} from "../../controllers/order.controller.js";

function OrderRoutes(app, prefix) {
  app.get(`${prefix}/`, protect, adminProtect, getOrders);
  app.post(`${prefix}/`, protect, addOrderItems);
  app.get(`${prefix}/myorders`, protect, getMyOrders);
  app.get(`${prefix}/details/:id`, protect, getOrderById);
  app.put(`${prefix}/:id/pay`, protect, updateOrdertoPaid);
  app.put(
    `${prefix}/:id/deliver`,
    protect,
    adminProtect,
    updateOrdertoDelivered
  );
}

export default OrderRoutes;
