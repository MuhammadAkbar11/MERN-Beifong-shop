import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../../models/userModel.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../../configs/constants.js";
import { signJWTAccessToken, verifyJWT } from "../../utils/jwt.utils.js";
import SessionModel from "../../models/sessionModel.js";
import ResponseError from "../../utils/responseError.js";

export const protect = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new ResponseError(401, "Not Authorized", {
      notAuth: true,
    });
  }
  return next();
});

export const deserializeUser = asyncHandler(async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken, ACCESS_TOKEN_SECRET);

  // For a valid access token
  if (payload) {
    // @ts-ignore

    const user = await UserModel.findById(payload.userId).select(
      "_id name email cart isAdmin createdAt updatedAt"
    );
    const currentUser = {
      isAdmin: user.isAdmin,
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user?.image || "/uploads/images/sample-user.png",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      session: payload,
    };

    req.user = currentUser;
    return next();
  }

  // expired but valid access token

  const { payload: refresh } =
    expired && refreshToken
      ? verifyJWT(refreshToken, REFRESH_TOKEN_SECRET)
      : { payload: null };

  if (!refresh) {
    return next();
  }

  const session = await SessionModel.findById(refresh.sessionId);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWTAccessToken({
    email: session.email,
    userId: session.userId,
    sessionId: session._id,
  });

  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  const decoded = verifyJWT(newAccessToken, ACCESS_TOKEN_SECRET).payload;
  const user = await UserModel.findById(decoded.userId).select(
    "_id name email cart isAdmin createdAt updatedAt"
  );

  const currentUser = {
    isAdmin: user.isAdmin,
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user?.image || "/uploads/images/sample-user.png",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    session: decoded,
  };

  req.user = currentUser;
  return next();
});
