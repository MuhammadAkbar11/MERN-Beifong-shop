import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findById(decoded.id).select(
        "_id name email cart isAdmin createdAt updatedAt"
      );
      console.log(user);
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

const adminProtect = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    const errorObj = new Error();
    errorObj.statusCode = 401;
    errorObj.message = "Not authorized as admin";
    errorObj.errors = {};
    throw errorObj;
  }
};

export { protect, adminProtect };
