import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../configs/constants.js";
import ResponseError from "./responseError.js";

// sign jwt
export function signJWT(payload, privateKey, expiresIn) {
  return jwt.sign(payload, privateKey, { expiresIn });
}

export const signJWTAccessToken = payload => {
  return signJWT(payload, ACCESS_TOKEN_SECRET, "30s");
};

export const signJWTRefreshToken = payload => {
  return signJWT(payload, REFRESH_TOKEN_SECRET, "7d");
};

// verify jwt
export function verifyJWT(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
}
