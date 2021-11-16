import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import UserModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";
import errMessageValidation from "../utils/errMessagesValidation.js";
import generateToken from "../utils/generateToken.js";
import ResponseError from "../utils/responseError.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Bad validation", { validation: errorMsg });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const doMatchPw = await user.matchPassword(password);
      if (doMatchPw) {
        const userCart = await user
          .populate({
            path: "cart.items.product",
            select: "name image countInStock price",
          })
          .execPopulate();

        return res.status(200).json({
          status: true,
          message: "Login success",
          request: {
            email,
            password,
          },
          user: {
            isAdmin: user.isAdmin,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            cart: userCart.cart,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
      } else {
        res.status(400);
        console.log("not match");
        throw new ResponseError(400, "Wrong password");
      }
    } else {
      res.status(401);
      throw new ResponseError(400, "User not found");
    }
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Register a new user
// @route POST /api/users/register
// @access Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Validation failed", { validation: errorMsg });
  }

  try {
    const getUser = await UserModel.findOne({ email });

    if (getUser) {
      res.status(400);
      throw new ResponseError(400, "User already exists");
    }

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        status: true,
        message: "Register success",
        user: {
          isAdmin: user.isAdmin,
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          token: generateToken(user._id),
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(400);
      throw new ResponseError(400, "Failed to create new user");
    }
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc is user auth
// @route POST /api/users/is-auth
// @access Private
const isAuthUser = asyncHandler(async (req, res) => {
  try {
    res.json({
      user: req.user,
    });
  } catch (error) {
    throw new ResponseError(
      error.statusCode,
      error.message,
      error?.errors || {}
    );
  }
});

// @desc Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select(
      "-__v -password"
    );

    if (user) {
      return res.status(200).json({
        status: true,
        message: "user is found",
        user: user,
      });
    } else {
      res.status(404);
      throw new ResponseError(404, "User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const oldEmail = user.email;
    if (user) {
      user.name = req.body.name || user.name;
      if (req.body.email && req.body.email !== oldEmail) {
        const getUser = await UserModel.findOne({ email: req.body.email });
        if (getUser) {
          res.status(400);
          throw new ResponseError(400, "Email already exits");
        }
        user.email = req.body.email;
      } else {
        user.email = oldEmail;
      }

      if (req.body.oldPassword) {
        const doMatchPw = await user.matchPassword(req.body.oldPassword);
        if (!doMatchPw) {
          res.status(400);
          throw new ResponseError(400, "Current password is wrong");
        } else {
          user.password = req.body.newPassword;
        }
      }

      const setUpdatedUser = await user.save();

      const updatedUser = {
        isAdmin: setUpdatedUser.isAdmin,
        _id: setUpdatedUser._id,
        name: setUpdatedUser.name,
        email: setUpdatedUser.email,
        createdAt: setUpdatedUser.createdAt,
        updatedAt: setUpdatedUser.updatedAt,
      };

      return res.status(200).json({
        status: true,
        message: req.body.oldPassword
          ? "Changen password successfully"
          : "Updated profile success",
        user: updatedUser,
      });
    } else {
      res.status(400);
      throw new ResponseError(400, "Update failed");
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

const userPostCart = asyncHandler(async (req, res, next) => {
  const cartItems = req.body.cartItems;
  const productId = req.query.product;
  const qty = req.query.qty;

  if (cartItems.length !== 0 && !productId) {
    try {
      // let products;
      let userCart;

      console.log(req.user.cart.items.length);
      if (req.user.cart.items.length !== 0) {
        const products = await ProductModel.find({
          _id: {
            $in: cartItems.map(x => x.product),
          },
        });
        userCart = await req.user.updateCart(cartItems, products);
      } else {
        userCart = await req.user.insertUserCart(cartItems);
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

    return;
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

const userRemoveCart = asyncHandler(async (req, res, next) => {
  const productId = req.body.product;
  console.log(productId);
  try {
    const removeItem = await req.user.removeCartItem(productId);

    const updatedCart = await removeItem
      .populate({
        path: "cart.items.product",
        select: "name image countInStock price",
      })
      .execPopulate();

    res.status(201).json({
      status: true,
      message: "1 item removed",
      cart: updatedCart.cart,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc get all users
// @route POST /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.json({
      status: true,
      users,
    });
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc delete user
// @route DELET /api/users
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (user) {
      await user.remove();
      return res.json({
        status: true,
        message: "User has been deleted",
      });
    } else {
      throw new ResponseError(404, "User not Found", null);
    }
  } catch (error) {
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc get user by Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (user) {
      return res.json({
        status: true,
        user,
      });
    } else {
      throw new ResponseError(404, "User not Found", null);
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const oldEmail = user.email;
    if (user) {
      user.name = req.body.name || user.name;
      user.isAdmin = req.body.isAdmin;
      if (req.body.email && req.body.email !== oldEmail) {
        const getUser = await UserModel.findOne({ email: req.body.email });
        if (getUser) {
          res.status(400);
          throw new ResponseError(400, "Email already exits");
        }
        user.email = req.body.email;
      } else {
        user.email = oldEmail;
      }

      const setUpdatedUser = await user.save();

      const updatedUser = {
        isAdmin: setUpdatedUser.isAdmin,
        _id: setUpdatedUser._id,
        name: setUpdatedUser.name,
        email: setUpdatedUser.email,
        createdAt: setUpdatedUser.createdAt,
        updatedAt: setUpdatedUser.updatedAt,
      };

      return res.status(200).json({
        status: true,
        message: "Updated user success",
        user: updatedUser,
      });
    } else {
      res.status(400);
      throw new ResponseError(400, "Failed to update users");
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  isAuthUser,
  updateUserProfile,
  userPostCart,
  userRemoveCart,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
