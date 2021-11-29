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

// @desc  Get orders
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
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

// @desc  Get order by Id
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
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

// @desc  Update order to paid
// @route   GET /api/order/:id/pay
// @access  Private
const updateOrdertoPaid = asyncHandler(async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.status(201).json({
        message: "Payment successfully",
        updatedOrder,
      });
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

// @desc  Get logged in user orders
// @route   GET /api/ordeer/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await OrderModel.find({ user: userId });

    res.json({
      status: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500);
    throw new ResponseError(
      error.statusCode,
      error.statusCode === 400 ? error.message : "Something went wrong",
      error.errors
    );
  }
});

// @desc  Get  orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.json({
      status: true,
      orders,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(
      error.statusCode,
      error.statusCode === 400 ? error.message : "Something went wrong",
      error.errors
    );
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  getMyOrders,
  getOrders,
};
