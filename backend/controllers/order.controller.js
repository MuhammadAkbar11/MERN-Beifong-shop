import asyncHandler from "express-async-handler";
import OrderModel from "../models/orderModel.js";
import ResponseError from "../utils/responseError.js";
import convertRupiah from "../utils/convertRupiah.js";

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

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new ResponseError(400, "No order Items");
    } else {
      const orderData = {
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: {
          num: itemsPrice,
          rupiah: convertRupiah(itemsPrice),
        },
        taxPrice: {
          num: taxPrice,
          rupiah: convertRupiah(taxPrice),
        },
        shippingPrice: {
          num: shippingPrice,
          rupiah: convertRupiah(shippingPrice),
        },
        totalPrice: {
          num: totalPrice,
          rupiah: convertRupiah(totalPrice),
        },
      };

      const order = new OrderModel(orderData);

      const createdOrder = await order.save();
      return res.status(201).json({
        status: true,
        message: "Order created",
        order: createdOrder,
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(
      error.statusCode,
      error.statusCode === 400
        ? error.message
        : "Order failed please try again",
      error.errors
    );
  }
});

// @desc c  Get order by Id
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    console.log("hayy");
    const order = await OrderModel.findById(req.params.id).populate(
      "users",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(400);
      throw new ResponseError(400, "Order no found");
    }
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(
      error.statusCode,
      error.statusCode === 400 ? error.message : "Something went wrong",
      error.errors
    );
  }
});

export { addOrderItems, getOrderById };
