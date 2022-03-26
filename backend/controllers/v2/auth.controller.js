import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../../models/userModel.js";
import ProductModel from "../../models/productModel.js";
import errMessageValidation from "../../utils/errMessagesValidation.js";
import generateToken from "../../utils/generateToken.js";
import ResponseError from "../../utils/responseError.js";
import { checkIsGuestFoto, deleteFile } from "../../utils/file.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import { REFRESH_TOKEN_SECRET } from "../../configs/constants.js";

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
        // const userCart = await user
        //   .populate({
        //     path: "cart.items.product",
        //     select: "name image countInStock price",
        //   })
        //   .execPopulate();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        }); //secure: true,
        return res.status(200).json({
          status: true,
          message: "Login success",
          accessToken,
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
      throw new ResponseError(400, "User already exists");
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      image: "/uploads/images/sample-guest.png",
    });

    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      user.refreshToken = refreshToken;
      await user.save();

      const oneWeek = 7 * 24 * 3600 * 1000;

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // maxAge: 24 * 60 * 60 * 1000,
        maxAge: new Date(Date.now() + oneWeek),
      }); //secure: true,
      return res.status(200).json({
        status: true,
        message: "Sign up success",
        accessToken,
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

// @desc Refresh token
// @route POST /api/v2/refresh
// @access Public
export const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) {
      res.status(400);
      throw new ResponseError(400, "Failed to get your access token");
    }
    const refreshToken = cookies.jwt;

    const user = await UserModel.findOne({ refreshToken }).exec();
    if (!user) {
      res.status(403);
      throw new ResponseError(400, "User not found");
    }
    // evaluate jwt
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || user._id.toString().trim() !== decoded.id) {
        res.status(403);
        throw new ResponseError(
          403,
          "Forbidden : Failed to refresh your token"
        );
      }
      // const roles = Object.values(user.roles);

      const accessToken = generateAccessToken(user);
      res.json({ message: "successed get your access token", accessToken });
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) {
      res.status(400);
      throw new ResponseError(400, "Failed to logout");
    }
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      throw new ResponseError(400, "Refresh token not found");
    }

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "logout successfully" });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
