import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import UserModel from "../models/userModel.js";
import errMessageValidation from "../utils/errMessagesValidation.js";

import ResponseError from "../utils/responseError.js";
import { signJWTAccessToken, signJWTRefreshToken } from "../utils/jwt.utils.js";
import SessionModel from "../models/sessionModel.js";

// @desc Login user to get access token
// @route POST /api/v2/users/login
// @access Public
export const postLogin = asyncHandler(async (req, res) => {
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

        const session = await SessionModel.create({
          email: user.email,
          userId: user._id,
        });

        const accessToken = signJWTAccessToken({
          email: user.email,
          userId: user._id,
          sessionId: session._id,
        });

        const refreshToken = signJWTRefreshToken({
          email: user.email,
          userId: user._id,
          sessionId: session._id,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 6.048e8,
        });

        res.cookie("accessToken", accessToken, {
          maxAge: 300000, // 5 minutes
          httpOnly: true,
        });

        return res.status(200).json({
          status: true,
          message: "Login success",
          user: {
            isAdmin: user.isAdmin,
            _id: user._id,
            name: user.name,
            email: user.email,
            cart: userCart.cart,
            image: user?.image || "/uploads/images/sample-user.png",
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            session: session._id,
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
// @route POST /api/v2/users/register
// @access Private
export const postRegister = asyncHandler(async (req, res) => {
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
      throw new ResponseError(
        400,
        `User with email "${email}" is already exists, please try another email`
      );
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      image: "/uploads/images/sample-guest.png",
    });

    if (user) {
      res.status(200).json({
        status: true,
        message: "Registration has been successful, please login",
      });
    } else {
      res.status(400);
      throw new ResponseError(400, "Registration failed, please try again");
    }
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getSession = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.json({
        status: false,
        message: "there is no session ",
        user: null,
      });
    }
    // console.log(req.user);
    const user = await UserModel.findOne({ email: req.user.email });
    const userCart = await user
      .populate({
        path: "cart.items.product",
        select: "name image countInStock price",
      })
      .execPopulate();

    return res.json({
      status: true,
      message: "success to get session",
      user: { ...req.user, cart: userCart.cart },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "there is no session ",
      user: null,
    });
  }
});

// @desc Logout
// @route POST /api/v2/users/logout
// @access Public
export const postLogout = asyncHandler(async (req, res) => {
  const { session: sessionId } = req.body;

  try {
    const session = await SessionModel.findOne({ _id: sessionId });

    if (!session) {
      res.status(400);
      throw new ResponseError(400, "Failed to logout");
    }

    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
    });
    await SessionModel.findOneAndDelete({ id: sessionId });
    res.json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
