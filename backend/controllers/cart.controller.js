import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";
import ResponseError from "../utils/responseError.js";

// @desc Add a cart Item or Update all Cart
// @route POST /api/users/cart
// @access Private

export const postCart = asyncHandler(async (req, res, next) => {
  const cartItems = req.body.cartItems;
  const productId = req.query.product;
  const qty = req.query.qty;

  // if multiple cartItems
  if (cartItems) {
    try {
      // let products;
      let userCart;
      if (req.user.cart?.items.length !== 0) {
        const products = await ProductModel.find({
          _id: {
            $in: cartItems.map(x => x.product),
          },
        });
        userCart = await req.user.updateCart(cartItems, products);
      } else {
        userCart = await req.user.updateCart(cartItems, null);
      }

      const updatedCart = await userCart
        .populate({
          path: "cart.items.product",
          select: "name image countInStock price",
        })
        .execPopulate();

      res.status(200).json({
        status: true,
        message: "success",
        cart: updatedCart.cart,
      });
    } catch (error) {
      console.log(error);
      throw new ResponseError(error.statusCode, error.message, error.errors);
    }
  } else {
    if (!productId) {
      throw new ResponseError(400, "Failed add to cart", null);
    }
    try {
      const product = await ProductModel.findById(productId);

      if (!product) {
        throw new ResponseError(404, "Product not Found", null);
      }
      const userCart = await req.user.addToCart(product, qty);

      const updatedCart = await userCart
        .populate({
          path: "cart.items.product",
          select: "name image countInStock price",
        })
        .execPopulate();

      res.status(200).json({
        status: true,
        message: "success",
        cart: updatedCart.cart,
      });
    } catch (error) {
      console.log(error);
      throw new ResponseError(error.statusCode, error.message, error.errors);
    }
  }
});

export const getCart = asyncHandler(async (req, res, next) => {
  try {
    const userCart = await req.user
      .populate({
        path: "cart.items.product",
        select: "name image countInStock price",
      })
      .execPopulate();

    res.status(200).json({
      status: true,
      message: "success",
      cart: userCart.cart,
    });
  } catch (error) {
    res.status(500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
