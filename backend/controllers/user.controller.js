import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import UserModel from "../models/userModel.js";
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
        message: "User exits",
        user: user,
      });
    } else {
      const errorObj = new Error();
      errorObj.statusCode = 404;
      errorObj.message = "User not found";
      throw errorObj;
    }
  } catch (error) {
    const errorObj = new Error();
    errorObj.statusCode = error.statusCode || 500;
    errorObj.message = error.message;

    throw errorObj;
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.status(200).json({
        status: true,
        message: "Updated profile success",
        user: updatedUser,
      });
    } else {
      const errorObj = new Error();
      errorObj.statusCode = 404;
      errorObj.message = "Update failed";
      throw errorObj;
    }
  } catch (error) {
    const errorObj = new Error();
    errorObj.statusCode = error.statusCode || 500;
    errorObj.message = error.message;

    throw errorObj;
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
