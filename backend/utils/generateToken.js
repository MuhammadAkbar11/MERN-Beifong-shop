import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../configs/constants.js";

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const generateAccessToken = userInfo => {
  return jwt.sign(
    {
      UserInfo: {
        username: userInfo.name,
        // roles: roles,
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
};

export const generateRefreshToken = userInfo => {
  return jwt.sign(
    { username: userInfo.name, id: userInfo._id },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default generateToken;
