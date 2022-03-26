import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../../models/userModel.js";
import { ACCESS_TOKEN_SECRET } from "../../configs/constants.js";

export const protectV2 = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];

      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

      const user = await UserModel.findById(decoded.UserInfo.id).select(
        "_id name email cart isAdmin createdAt updatedAt"
      );
      console.log("protect v2", user);
      if (!user) {
        const errorObj = new Error();
        errorObj.statusCode = 401;
        errorObj.message = "Not Authorized, no token failed";
        errorObj.errors = {
          notAuth: true,
        };
        throw errorObj;
      }

      req.user = user;
      return next();
    } catch (error) {
      const errorObj = new Error();
      errorObj.statusCode = 401;
      errorObj.message = "Not Authorized, no token failed";
      errorObj.errors = {
        notAuth: true,
      };
      throw errorObj;
    }
  }

  if (!token) {
    res.status(401);
    const errorObj = new Error();
    errorObj.statusCode = 401;
    errorObj.message = "Not Authorized, no token";
    errorObj.errors = {
      notAuth: true,
    };
    throw errorObj;
  }

  next();
});
