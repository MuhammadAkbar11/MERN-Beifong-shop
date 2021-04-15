import asyncHandler from "express-async-handler";
import OrderModel from "../models/orderModel.js";
import ResponseError from "../utils/responseError.js";

// @desc c  Create a new orders
// @route   GET /api/products
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new ResponseError(400, "No order Items");
  } else {
    const order = new OrderModel({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    return res.status(201).json({
      status: true,
      message: "Order created",
      order: createdOrder,
    });
  }
});

export { addOrderItems };
